import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;      // cursor position in the blob's local space
uniform float uMouseAmt;
varying float vH;
varying vec3 vViewPos;
${NOISE}
void main(){
  float t = uTime * 0.12;
  // mostly low-frequency noise -> big smooth lobes
  float n = snoise(position * 0.8 + t) * 0.86 + snoise(position * 1.7 - t) * 0.14;
  vH = n;
  vec3 displaced = position + normalize(position) * n * 0.46;

  // cursor bulge
  float d = distance(position, uMouse);
  displaced += normalize(position) * exp(-d * d * 1.4) * 0.38 * uMouseAmt;

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;

// Darker body, soft cream rim lit from the lower-left, thin contour lines
const fragmentShader = `
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vH;
varying vec3 vViewPos;
void main(){
  vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(vec3(-0.55, -0.45, 0.85));
  float diff = max(dot(N, L), 0.0);
  float fres = pow(1.0 - abs(dot(N, V)), 2.0);

  float f = fract(vH * 4.5);
  float d = min(f, 1.0 - f);
  float line = 1.0 - smoothstep(0.0, 0.04, d);

  vec3 col = uBase;
  col = mix(col, uAccent, clamp(fres * (0.65 + 0.5 * diff), 0.0, 1.0));
  col += uAccent * diff * 0.05;
  col = mix(col, uAccent, line * (0.2 + diff * 0.3));
  gl_FragColor = vec4(col, 1.0);
}`;

// Chromatic aberration (RGB split) post-process
const RGBShift = {
  uniforms: { tDiffuse: { value: null }, amount: { value: 0.0008 }, angle: { value: 0.6 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float amount; uniform float angle; varying vec2 vUv;
    void main(){
      vec2 off = amount * vec2(cos(angle), sin(angle));
      vec4 cr = texture2D(tDiffuse, vUv + off);
      vec4 cg = texture2D(tDiffuse, vUv);
      vec4 cb = texture2D(tDiffuse, vUv - off);
      float a = max(max(cr.a, cg.a), cb.a);
      gl_FragColor = vec4(cr.r, cg.g, cb.b, a);
    }`,
};

const THEMES = {
  dark: { base: '#080807', accent: '#efe9df', star: '#ffffff' },
  light: { base: '#ececee', accent: '#0b0b0d', star: '#000000' },
};

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** `progress` is an optional framer-motion MotionValue (0 → 1) driven by hero scroll. */
export default function Blob3D({ progress }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 6;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(9, 9, 9) },
        uMouseAmt: { value: 0 },
        uBase: { value: new THREE.Color(THEMES.dark.base) },
        uAccent: { value: new THREE.Color(THEMES.dark.accent) },
      },
    });
    const geometry = new THREE.IcosahedronGeometry(1.25, 64);
    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // Stars
    const COUNT = 420;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.022, color: '#ffffff', transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Post-processing — multisampled target keeps edges crisp
    const rt = new THREE.WebGLRenderTarget(1, 1, { samples: 4, type: THREE.HalfFloatType });
    const composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    const shiftPass = new ShaderPass(RGBShift);
    composer.addPass(shiftPass);

    const applyTheme = () => {
      const t = document.documentElement.getAttribute('data-theme') === 'light' ? THEMES.light : THEMES.dark;
      material.uniforms.uBase.value.set(t.base);
      material.uniforms.uAccent.value.set(t.accent);
      starMat.color.set(t.star);
    };
    applyTheme();
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Layout — anchored to the 1200px content column so the gaps stay proportional
    const base = { x: 0, y: 0, s: 1 };
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const unitPerPx = visH / h;
      const wide = camera.aspect > 1.2;

      if (wide) {
        const Wc = Math.min(1200, w - 48);              // content column width
        const diaPx = Math.min(0.396 * Wc, 0.72 * h);   // blob diameter in px
        base.s = (diaPx * unitPerPx) / 3.0;
        base.x = 0.004 * Wc * unitPerPx;                // centred between name and photo
        base.y = 0.01;
      } else {
        base.x = 0;
        base.y = 0.9;
        base.s = Math.max(0.55, camera.aspect * 1.05);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, vel: 0, inside: 0 };
    const last = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.vel = Math.min(1, mouse.vel + Math.hypot(e.clientX - last.x, e.clientY - last.y) / 120);
      last.x = e.clientX;
      last.y = e.clientY;
      mouse.inside = 1;
    };
    window.addEventListener('mousemove', onMove);

    // reduced-motion users get a slower blob instead of a frozen one
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduce ? 0.3 : 1;

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();
    const ray = new THREE.Vector3();
    let raf;
    let amtSmooth = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const elapsed = clock.getElapsedTime();
      const t = elapsed * speed;
      const p = progress ? Math.min(1, Math.max(0, progress.get())) : 0;

      // intro: blob grows in
      const intro = Math.min(1, elapsed / 2);
      const ease = 1 - Math.pow(1 - intro, 3);

      // smooth pointer
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      mouse.vel *= 0.92;
      amtSmooth += ((mouse.inside ? 1 : 0) - amtSmooth) * 0.06;

      // scroll zoom: the blob swallows the screen
      const zoom = 1 + p * p * 3.4;
      blob.scale.setScalar(base.s * ease * zoom);
      blob.position.set(base.x * (1 - p), base.y * (1 - p), 0);
      blob.rotation.y += (mouse.x * 0.5 + t * 0.05 + p * 2.2 - blob.rotation.y) * 0.05;
      blob.rotation.x += (-mouse.y * 0.3 + p * 0.8 - blob.rotation.x) * 0.05;
      blob.updateMatrixWorld();

      // cursor in blob-local space
      ray.set(mouse.x * 2.2, mouse.y * 1.4, 1.4);
      material.uniforms.uMouse.value.copy(blob.worldToLocal(ray));
      material.uniforms.uMouseAmt.value = amtSmooth * (1 - p);

      material.uniforms.uTime.value = t + p * 3;

      stars.rotation.y = t * 0.01 + mouse.x * 0.03;
      stars.rotation.x = mouse.y * 0.02;

      // subtle RGB split at rest; grows strongly with scroll
      shiftPass.uniforms.amount.value =
        0.0008 + p * 0.028 + mouse.vel * 0.0012 + (1 - ease) * 0.004;
      shiftPass.uniforms.angle.value = 0.6 + mouse.x * 0.6 + p;

      // fade the blob out as About takes over
      mount.style.opacity = String(1 - smooth(0.78, 1, p));

      composer.render();
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      geometry.dispose();
      material.dispose();
      starGeo.dispose();
      starMat.dispose();
      rt.dispose();
      composer.dispose?.();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [progress]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />;
}
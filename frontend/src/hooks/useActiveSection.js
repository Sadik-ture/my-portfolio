import { useEffect, useState } from 'react';

export const NAV = [
  { id: 'home', name: 'Home', label: '01. Story & Hero' },
  { id: 'about', name: 'About', label: '02. Core Principles' },
  { id: 'experience', name: 'Experience', label: '03. Work Experience' },
  { id: 'skills', name: 'Skills', label: '04. Integrated Capabilities' },
  { id: 'projects', name: 'Projects', label: '05. Projects' },
  { id: 'contact', name: 'Contact', label: '06. Contact' },
];

export const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
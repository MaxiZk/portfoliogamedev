const ITEMS = [
  ['#about', 'About Me'],
  ['#skills', 'Skills'],
  ['#projects', 'Projects'],
  ['#experience', 'Experience'],
  ['#achievements', 'Achievements'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  return (
    <nav className="menu">
      {ITEMS.map(([href, label]) => (
        <a key={href} href={href} className="menu-item">
          {label}
        </a>
      ))}
    </nav>
  );
}

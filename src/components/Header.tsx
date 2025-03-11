import { Activity, Menu } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Tracking', href: '#tracking' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-2"
          >
            <Activity className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">FitTrack</span>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
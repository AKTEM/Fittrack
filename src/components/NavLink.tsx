interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
    >
      {children}
    </a>
  );
}
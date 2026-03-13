import { ReactNode } from 'react';

interface ModuleCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

function ModuleCard({ children, className = '', onClick, active = false }: ModuleCardProps) {
  const classes = [
    'glass-card',
    onClick ? 'clickable' : '',
    active ? 'active-card' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  );
}

export default ModuleCard;

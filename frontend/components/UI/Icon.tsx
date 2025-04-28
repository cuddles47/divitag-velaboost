import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Icon component using PrimeIcons
 * @param name - Icon name from PrimeIcons (pi-*), e.g. 'pi-mobile', 'pi-desktop'
 * @param size - Icon size in pixels (default: 24)
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 22,
  className = '',
  style = {},
}) => {
  // Ensure 'pi-' prefix is included
  const iconClass = name.startsWith('pi-') ? `pi ${name}` : `pi pi-${name}`;

  // For debugging
  console.log('Icon name:', name, 'Icon class:', iconClass);

  return (
    <i
      className={`${iconClass} ${className}`}
      style={{ fontSize: `${size}px`, ...style }}
    />
  );
};

export default Icon;
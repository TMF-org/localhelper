import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
  tagName?: string;
  type?: string;
  className?: string;
  size?: string;
  modifier?: string;
  onClick?: () => void;
  href?: string;
  rounded?: boolean;
  children?: ReactNode;
  disabled?: boolean;

  indirectLink?: boolean;
}

export const Button = ({
  href,
  tagName = 'button',
  size = 'small',
  type = 'primary',
  rounded,
  disabled,

  modifier,
  className,
  children,
  onClick,

  indirectLink,
}: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (href && indirectLink) {
      router.push(href);
    }
    onClick?.();
  };

  const getClassName = () => {
    const roundedClass = rounded ? '-rounded' : '';
    return `button-${type}--${size}${getModifier(
      modifier,
    )}${roundedClass} ${className}`;
  };

  const link = (
    <button
      type={tagName === 'button' && !href ? 'submit' : undefined}
      className={getClassName()}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

  if (href && !indirectLink) {
    return <Link href={href}>{link}</Link>;
  }
  return <>{link}</>;
};

Button.defaultProps = {
  type: 'primary',
  className: '',
  size: 'small',
  modifier: '',
  onClick: () => {},
  href: null,
  target: null,
  rounded: false,
};

const getModifier = (modifier?: string) => {
  if (!modifier) return '';
  return '--' + modifier.split('|').join('--');
};

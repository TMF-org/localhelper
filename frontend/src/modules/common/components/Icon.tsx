import clsx from 'clsx';

interface Props {
  name: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  className?: string;
  size?: string;
}

export const Icon = ({
  name,
  className,
  onClick,
  onMouseOver,
  onMouseOut,
  size = 'medium',
}: Props) => {
  return (
    <svg
      className={clsx(className, `icon-${size}`)}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <use xlinkHref={`#SVG${name}`} />
    </svg>
  );
};

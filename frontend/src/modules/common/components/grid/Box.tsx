import { ReactNode } from 'react';

interface Props {
  className?: string;
  tagName?: string;
  size?: string;
  breaks?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Box = ({
  tagName = 'div',
  size,
  breaks,
  onClick,
  className,
  children,
}: Props) => {
  const Tag: any = tagName;

  return (
    <Tag
      data-box={size}
      data-breaks-on={breaks}
      className={className}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

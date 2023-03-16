import { ReactNode } from 'react';

interface Props {
  className?: string;
  tagName?: string;
  option?: string;
  children: ReactNode;
}

export const Row = ({
  tagName = 'div',
  option = '',
  className,
  children,
}: Props) => {
  const Tag: any = tagName;

  return (
    <Tag data-row={option} className={className}>
      {children}
    </Tag>
  );
};

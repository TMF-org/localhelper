import clsx from 'clsx';
import { ReactNode } from 'react';
import { Icon } from '../Icon';

interface Props {
  className?: string;
  children?: ReactNode;

  headline: string;
  subHeadline: string;
  text: string;
}

export const SplashSuccess = ({
  headline,
  subHeadline,
  text,
  className,
  children,
}: Props) => {
  return (
    <div className={clsx('section splash', className)}>
      <h2 className="section-headline">
        <Icon name="success" />
        <strong>{headline}</strong>
        <small>{subHeadline}</small>
      </h2>
      <p>{text}</p>
      {children}
    </div>
  );
};

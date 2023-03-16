import { Icon } from '@/modules/common/components/Icon';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  headline?: string;
  colorClass?: string;
  children?: ReactNode;
}

export const ScreenHeader = ({ headline, colorClass, children }: Props) => {
  const getLogo = () => {
    if (!!headline) {
      return (
        <span className="headline">
          <h2>{headline}</h2>
        </span>
      );
    }
    return (
      <Link href="/" className="logo">
        <Icon name="lokalhelfer" />
      </Link>
    );
  };

  return (
    <header className={`header${colorClass}`}>
      <div className="inner">
        {getLogo()}
        {children}
      </div>
    </header>
  );
};

import { Icon } from '@/modules/common/components/Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const goHome = () => router.push('/');
  return (
    <header>
      <Icon name="logo-full" className="logo" onClick={goHome} />
    </header>
  );
};

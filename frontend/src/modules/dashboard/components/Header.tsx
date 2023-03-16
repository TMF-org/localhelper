import { useMeHelper } from '@/modules/api/helper/queries';
import { Icon } from '@/modules/common/components/Icon';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import logo from '../../../../public/image/lokalhelfer_dashboard_logo.png';

export const DashboardHeader = () => {
  return (
    <header>
      <Link href="/" className="logo">
        <Image src={logo} alt="Lokalhelfer" height={25} />
      </Link>
      <DashboardMenu />
    </header>
  );
};

export const DashboardMenu = () => {
  const { data: session } = useSession();
  const { data } = useMeHelper();
  const helper = data?.data;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setIsMenuOpen(false),
  });
  const icon = isMenuOpen ? 'arrow-up' : 'arrow-down';

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const menu = (
    <ul className="profile-menu">
      <li>
        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
          <span>Hilfegesuche</span>
        </Link>
      </li>

      <li>
        <Link href="/dashboard/profile" onClick={() => setIsMenuOpen(false)}>
          <span>Dein Profil</span>
        </Link>
      </li>

      <li onClick={() => signOut({ callbackUrl: '/' })}>
        <span>Logout</span>
      </li>
    </ul>
  );

  return (
    <div className="main-right-menu">
      <div className="wrapper" ref={ref}>
        <div className="profile">
          <div className="trigger" onClick={toggleMenu}>
            <div className="profile-image-container not-on-mobile">
              <Icon name="customer" />
            </div>
            <h4 className="not-on-mobile">
              <strong>{helper?.attributes.name}</strong>
              <small>{session?.user.email}</small>
            </h4>
            <div className="menu-icon only-on-mobile">
              <Icon name="menu" />
            </div>
            <span className="open-indicator not-on-mobile">
              <Icon name={icon} />
            </span>
          </div>
          {isMenuOpen && menu}
        </div>
      </div>
    </div>
  );
};

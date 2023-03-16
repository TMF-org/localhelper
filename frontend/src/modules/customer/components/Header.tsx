import { Button } from '@/modules/common/components/Button';
import { Icon } from '@/modules/common/components/Icon';
import { Responsive } from '@/modules/common/components/Responsive';
import Link from 'next/link';
import { useScreenStore } from '../stores/screen';
import { Screen } from './screen/Screen';

interface Props {
  headline?: string;
  isLogoClickable?: boolean;
}

export const Header = ({ isLogoClickable = true, headline }: Props) => {
  const showScreen = useScreenStore((store) => store.showScreen);

  const openMenu = () => {
    showScreen('menu');
  };
  const getLogo = () => {
    if (!!headline) {
      return (
        <span className="logo">
          <h2>{headline}</h2>
        </span>
      );
    }

    if (!isLogoClickable) {
      return (
        <span className="logo">
          <Icon name="lokalhelfer" />
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
    <header className="header-primary">
      <div
        className="inner"
        itemScope
        itemType="http://schema.org/Organization"
      >
        {getLogo()}

        <Responsive mobile>
          <div className="menu" onClick={openMenu}>
            <Icon name="menu" size="big" />
          </div>
        </Responsive>

        <Responsive tablet desktop>
          <ul className="menu">
            <li>
              <Link href="/help">Hilfe</Link>
            </li>
            <li>
              <Link href="/join">Mitmachen</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </Responsive>
      </div>

      <Screen name="menu" className="primary" animationName="round-open">
        <MobileMenu />
      </Screen>
    </header>
  );
};

const MobileMenu = () => {
  return (
    <section className="main-menu">
      <nav className="big-list">
        <ul>
          <li>
            <Link href="/">
              <Icon name="services" size="menu" />
              <strong>Alle Services</strong>
            </Link>
          </li>

          <li>
            <Link href="/help">
              <Icon name="question" size="menu" />
              <strong>Hilfe-Center</strong>
            </Link>
          </li>

          <li>
            <Link href="/dashboard">
              <Icon name="lokaldashboard" size="menu" />
              <strong>Dashboard</strong>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="field space">
        <Button type="primary-dark" indirectLink href="/join" size="default">
          <strong>Jetzt als Helfer anmelden</strong>
        </Button>
      </div>
    </section>
  );
};

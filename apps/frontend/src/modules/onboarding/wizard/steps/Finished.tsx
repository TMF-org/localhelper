import Link from 'next/link';
import { FinishIcon } from '@/modules/common/components/icons/finish';

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

export const FinishedStep = () => {
  return (
    <>
      <div className="description-full box-centered bgc-white pdg-25">
        <span className="step-icon not-on-mobile">
          <FinishIcon />
        </span>

        <h2 className="h2-normalize">Geschafft!</h2>
        <br />
        <p>
          Deine Anmeldung wird nun von uns geprüft. Sobald dein Zugang
          freigeschaltet wurde, wirst du von uns per Mail informiert.
          <br />
          Anschließend kannst du dich mit deinen Zugangsdaten online im{' '}
          <Link href="/dashboard">Dashboard</Link> anmelden kannst.
        </p>

        <br />
        <p>Bis bald, wir freuen uns auf dich!</p>
        <br />
        <p>
          Hast du noch Fragen? Du kannst dich jederzeit über{' '}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a> bei uns melden.
        </p>
      </div>
    </>
  );
};

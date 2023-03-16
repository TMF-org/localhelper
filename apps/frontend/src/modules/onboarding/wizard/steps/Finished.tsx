import Link from 'next/link';
import { FinishIcon } from '../../components/icons/finish';

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
          Du erhältst eine Bestätigungs-Mail mit den Zugangsdaten, mit denen du
          dich online im <Link href="/dashboard">Dashboard</Link> anmelden
          kannst.
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

import Image from 'next/image';
import dashboardLogo from '../../../../public/image/lokalhelfer_dashboard_logo.png';
import { AuthLayout } from '../layout';

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

export const LoadingSkeleton = () => {
  return (
    <AuthLayout>
      <form className="login" onSubmit={(e) => e.preventDefault()}>
        <legend>
          <Image src={dashboardLogo} alt="lokalhelfer-dashboard-logo" />
        </legend>

        <fieldset>
          <div className="field space">Wird geladen...</div>
        </fieldset>

        <p className="info">
          Wende dich an unseren <a href={`mailto:${supportEmail}`}>Support</a>,
          wenn Probleme beim Anmelden auftreten sollten.
        </p>
      </form>
    </AuthLayout>
  );
};

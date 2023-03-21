import { AuthLayout } from '@/modules/auth/layout';
import { Button } from '@/modules/common/components/Button';
import { Input } from '@/modules/common/components/form/Input';
import { Notice } from '@/modules/common/components/Notice';
import { prefetchSession } from '@/services/api';
import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import dashboardLogo from '../../../public/image/lokalhelfer_dashboard_logo.png';
import { NextPageWithLayout } from '../_app';

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type SigninForm = z.infer<typeof signinSchema>;

const Signin: NextPageWithLayout = () => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const [error, setError] = useState<string>();

  const { handleSubmit, register } = useForm<SigninForm>();

  const onSubmit = async (values: SigninForm) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (!result || !result?.ok) {
      if (result?.status === 401) {
        setError('Die Zugangsdaten sind nicht korrekt.');
      } else {
        setError(
          'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
        );
      }
      return;
    }
    if (callbackUrl) {
      router.push(callbackUrl as string);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <legend>
        <Image src={dashboardLogo} alt="lokalhelfer-dashboard-logo" />
      </legend>

      <fieldset>
        {error && (
          <div className="pdg-lft-15 pdg-rgt-15 pdg-btm-15">
            <Notice type="error" message={error} noIcon />
          </div>
        )}

        <Input
          id="email"
          type="email"
          label="E-Mail Adresse"
          className="space"
          autoComplete="email"
          {...register('email')}
        />

        <Input
          id="password"
          type="password"
          label="Passwort"
          className="space"
          autoComplete="current-password"
          {...register('password')}
        />

        <div className="field space">
          <Button size="default">Anmelden</Button>
        </div>
        <div className="field space">
          <Link href="/">Zurück zur Startseite</Link>
        </div>
      </fieldset>

      <p className="info">
        Wende dich an unseren <a href={`mailto:${supportEmail}`}>Support</a>,
        wenn Probleme beim Anmelden auftreten sollten.
      </p>
    </form>
  );
};

Signin.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
Signin.enableAuth = true;

export default Signin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { session } = await prefetchSession(context);

  // if already loggedin, redirect to dashboard
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

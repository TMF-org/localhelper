import { createHelpTicket } from '@/modules/api/ticket/mutations';
import { Helper } from '@/modules/api/helper/types';
import { Button } from '@/modules/common/components/Button';
import { SplashSuccess } from '@/modules/common/components/splash/SplashSuccess';
import { StrapiData } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '../../common/components/form/Checkbox';
import { Input } from '../../common/components/form/Input';
import { HelperName } from '../components/helper/Name';
import { ServiceSelector } from '../components/search/Service';
import { useScreenStore } from '../stores/screen';
import { useSearchStore } from '../stores/search';

const schema = z.object({
  name: z.string().nonempty({ message: 'Bitte gib deinen Namen an' }),
  email: z
    .string()
    .email({ message: 'Bitte gib eine gültige E-Mail-Adresse an' }),
  phone: z.string().optional(),
  about: z.string().optional(),
  agb: z
    .boolean({ required_error: 'Bitte akzeptiere die Bedingungen' })
    .refine((value) => value, { message: 'Bitte akzeptiere die Bedingungen' }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  helper: StrapiData<Helper>;
}

export const HelpRequestForm = ({ helper }: Props) => {
  const mutation = useMutation(createHelpTicket);
  const hideScreen = useScreenStore((store) => store.hideScreen);
  const service = useSearchStore((store) => store.search.service);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    if (!service) return;
    mutation.mutate({
      service: service.id,
      helper: helper.id,
      customer: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        about: values.about,
        agb: values.agb,
      },
    });
  };

  const onClose = () => {
    hideScreen(helper.attributes.name, { delay: 400 });
  };

  if (mutation.isSuccess) {
    return (
      <SplashSuccess
        headline="Perfekt!"
        subHeadline="Anfrage versendet"
        text="Du erhältst nun eine E-Mail mit einem Link zum aktuellen Stand deiner Anfrage. Bei Fragen oder Problemen mit deiner Anfrage, kannst du dich jederzeit an uns wenden."
      >
        <div className="field space">
          <Button size="default" onClick={onClose}>
            <strong>Schließen</strong>
          </Button>
        </div>
      </SplashSuccess>
    );
  }

  return (
    <form className="appointment" onSubmit={handleSubmit(onSubmit)}>
      <section className="name-price">
        <HelperName name={helper.attributes.name} />
      </section>

      <section className="service-selection">
        <h3 className="question">Wobei brauchst du Hilfe?</h3>
        <div className="selection">
          <div className="field space">
            <ServiceSelector />
          </div>
        </div>
      </section>

      <fieldset className="personal">
        <h3 className="question">Wie kann der Lokalhelfer dich erreichen?</h3>
      </fieldset>

      <Input
        {...register('name')}
        placeholder="Dein Name"
        error={errors.name}
      />
      <Input
        {...register('email')}
        placeholder="Deine E-Mail-Adresse"
        error={errors.email}
      />
      <Input
        {...register('phone')}
        placeholder="Deine Telefonnummer"
        error={errors.phone}
      />
      <Input
        {...register('about')}
        placeholder="Mehr über dich"
        error={errors.about}
      />

      <div className="sms">
        <Checkbox
          label={
            <>
              Ich akzeptiere die{' '}
              <Link href="/terms" target="_blank">
                Nutzungsbedingungen
              </Link>{' '}
              und die{' '}
              <Link href="/privacy" target="_blank">
                Datenschutz-Vereinbarungen
              </Link>
            </>
          }
          name="agb"
          control={control as any}
          error={errors.agb}
        />
      </div>

      <div className="field space">
        {service ? (
          <Button size="default">
            <strong>Hilfe jetzt anfragen</strong>
          </Button>
        ) : (
          <Button size="default" type="grey" disabled>
            <strong>Es wurde kein Service gewählt</strong>
          </Button>
        )}
      </div>
    </form>
  );
};

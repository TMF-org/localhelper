import { Input } from '@/modules/common/components/form/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackIcon } from '../../components/icons/back';
import { NextIcon } from '../../components/icons/next';
import { UserIcon } from '../../components/icons/user';
import { StepProps } from '../Wizard';

export const userSchema = z.object({
  name: z.string().trim().nonempty(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email(),
  password: z.string().min(6, {
    message: 'Das Passwort muss mindestens 6 Zeichen lang sein',
  }),
});

const schema = userSchema
  .merge(
    z.object({
      confirmPassword: z.string().nonempty(),
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Die Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export const UserStep = ({
  updateAndNext,
  updateAndBack,
  defaultValues,
}: StepProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(updateAndNext)}>
      <div className="description-small not-on-mobile box-centered bgc-white pdg-25">
        <div className="info">
          <UserIcon />

          <p>
            In diesem Abschnitt erstellst du dir deinen persönlichen Zugang und
            verrätst uns erste Informationen über dich. Deine
            Kontaktinformationen sind nicht öffentlich einsehbar. Du erhältst
            Benachrichtigungen per Mail, wenn Nutzer dir Hilfegesuche senden.
            Deine Kontaktinformationen werden nur an Nutzer übermittelt, wenn du
            das Hilfegesuch annimmst. .
          </p>
        </div>
      </div>

      <div className="frm box-centered">
        <div className="grd-1 pdg-top-20">
          <div className="grd-1 bgc-white bgc-transparent-on-mobile pdg-20">
            <h3 className="pdg-btm-35 fsi-26 pdg-top-20">Deine Zugangsdaten</h3>
            <div className="bgc-white-on-mobile ">
              <Input
                {...register('name')}
                autoComplete="username"
                label="Dein Name"
                placeholder="Max Mustermann"
                error={errors.name}
              />
            </div>
            <div className="bgc-white-on-mobile ">
              <Input
                {...register('phone')}
                autoComplete="phone"
                label="Deine Telefonnummer"
                placeholder="+49..."
                error={errors.phone}
              />
            </div>
            <div className="bgc-white-on-mobile ">
              <Input
                {...register('email')}
                autoComplete="email"
                label="Deine E-Mail Adresse"
                placeholder="helfer@lokalhelfer.de"
                error={errors.email}
              />
            </div>
            <div className="bgc-white-on-mobile ">
              <Input
                {...register('password')}
                autoComplete="password"
                type="password"
                label="Wähle dein Passwort"
                error={errors.password}
              />
            </div>
            <div className="bgc-white-on-mobile ">
              <Input
                {...register('confirmPassword')}
                autoComplete="password"
                type="password"
                label="Bestätige dein Passwort"
                error={errors.confirmPassword}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="frm not-on-mobile box-centered pdg-top-20">
        <button
          className="flt-lft button secondary"
          onClick={handleSubmit(updateAndBack)}
        >
          <span>Vorheriger Schritt</span>
        </button>

        <button type="submit" className="flt-rgt button">
          <span>Nächster Schritt!</span>
          <NextIcon />
        </button>
      </div>

      <div className="frm box-centered only-on-mobile box-centered flx-btns">
        <button
          className="left-flx-btn button secondary"
          onClick={handleSubmit(updateAndBack)}
        >
          <BackIcon className="mobile-back" />
        </button>

        <button className="right-flx-btn button">
          <div>
            <span>Nächster Schritt!</span>
          </div>
        </button>
      </div>
    </form>
  );
};

import { Textarea } from '@/modules/common/components/form/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackIcon } from '../../components/icons/back';
import { NextIcon } from '../../components/icons/next';
import { UserIcon } from '../../components/icons/user';
import { StepProps } from '../Wizard';

const message =
  'Fast geschafft, bitte noch schnell die beiden Felder ausfüllen.';
export const detailsSchema = z.object({
  summary: z.string().trim().nonempty({ message }),
  about: z.string().trim().nonempty({ message }),
});

type FormValues = z.infer<typeof detailsSchema>;

export const DetailsStep = ({
  updateAndNext,
  updateAndBack,
  defaultValues,
}: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(detailsSchema),
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
            das Hilfegesuch annimmst.
          </p>
        </div>
      </div>

      <div className="frm box-centered">
        <div className="grd-1 pdg-top-20 mobile-pdg-rgt-20 mobile-pdg-lft-20">
          <div className="grd-1 bgc-white bgc-transparent-on-mobile pdg-btm-20">
            <div className="pdg-top-20">
              <h3 className="pdg-btm-35 fsi-26 pdg-top-20">Wer bist du ?</h3>
              <div className="bgc-white-on-mobile">
                <Textarea
                  {...register('summary')}
                  rows={3}
                  maxLength={160}
                  autoComplete="summary"
                  label="Steckbrief: Erzähl uns über dein Alter, deine Lebenssituation, Beschäftigung und Interessen (max. 160 Zeichen)"
                  error={errors.summary}
                />
              </div>
              <div className="bgc-white-on-mobile">
                <Textarea
                  {...register('about')}
                  rows={6}
                  autoComplete="about"
                  label="Dein Helfer*innenherz: Was motiviert dich mitzumachen?"
                  error={errors.about}
                />
              </div>
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

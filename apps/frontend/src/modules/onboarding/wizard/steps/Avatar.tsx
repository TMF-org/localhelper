import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackIcon } from '../../components/icons/back';
import { CameraIcon } from '../../components/icons/camera';
import { NextIcon } from '../../components/icons/next';
import { UserIcon } from '../../components/icons/user';
import { StepProps } from '../Wizard';

export const avatarSchema = z.object({
  avatar: z.custom<File>((v) => v instanceof File).optional(),
});

type FormValues = z.infer<typeof avatarSchema>;

export const AvatarStep = ({
  updateAndNext,
  updateAndBack,
  defaultValues,
}: StepProps) => {
  const { handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(avatarSchema),
  });

  const avatar = watch('avatar');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.[0]) return;
    setValue('avatar', files[0]);
  };

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
            <div className="flex column centered pdg-btm-20 pdg-top-20">
              <h3 className="pdg-btm-35 fsi-26 pdg-top-20">Dein Profilbild</h3>
              <label
                className={`box hidden-input ${!avatar ? 'visible-icon' : ''}`}
              >
                {!avatar && (
                  <CameraIcon className="only-on-mobile camera-icon" />
                )}
                <div className="field space loading">
                  {/* <h1>Lädt...</h1> */}
                  <input name="image" type="file" onChange={handleFileUpload} />
                  {avatar && (
                    <img
                      className="image-preview"
                      src={URL.createObjectURL(avatar)}
                      alt="image-preview"
                    />
                  )}
                </div>
                {!avatar && (
                  <div className="not-on-mobile upload-profile-image-text">
                    Profilbild auswählen
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="frm not-on-mobile box-centered pdg-top-20">
        <button
          type="button"
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
          type="button"
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

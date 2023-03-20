import { useUpdateMeMutation } from '@/modules/api/helper/mutations';
import { useMeHelper } from '@/modules/api/helper/queries';
import { MeHelper } from '@/modules/api/helper/types';
import { Button } from '@/modules/common/components/Button';
import { ImageUpload } from '@/modules/common/components/form/ImageUpload';
import { Input } from '@/modules/common/components/form/Input';
import { Textarea } from '@/modules/common/components/form/Textarea';
import { StrapiData } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

interface FormProps {
  helper: StrapiData<MeHelper>;
  onSave: (data: Partial<MeHelper> & { media?: File | null }) => void;
}

const contactInfoSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Bitte ausfüllen' }),
  phone: z.string().trim().optional(),
  summary: z.string().trim().nonempty({ message: 'Bitte ausfüllen' }),
  about: z.string().trim().nonempty({ message: 'Bitte ausfüllen' }),
});
type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;

const ContactInformationForm = ({ helper, onSave }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoFormValues>({
    defaultValues: helper.attributes,
    resolver: zodResolver(contactInfoSchema),
  });

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSave)}>
      <div className="form-container">
        <h1>Kontaktinformationen</h1>
        <div className="description">
          Diese Daten sind sehr wichtig. Hierüber kontaktiert Lokalhelfer dich
          über neue Anfragen.
          <br />
          <br />
          Hinweis: Wenn du dein Passwort ändern möchtest, verwende bitte die{' '}
          <Link href="/auth/forgot-password">Passwort vergessen</Link>-Funktion.
        </div>
        <Input {...register('name')} autoComplete="name" label="Dein Name" />
        <Input
          {...register('phone')}
          autoComplete="phone"
          label="Deine Telefonnnummer"
          error={errors.phone}
        />

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
      <Button className="profile-form-button">Speichern</Button>
    </form>
  );
};

const AvatarForm = ({
  helper,
  onSave,
}: {
  helper: FormProps['helper'];
  onSave: ({ media }: { media?: File | null }) => void;
}) => {
  const currentMedia = helper.attributes.media?.data?.[0];
  const currentMediaUrl = currentMedia
    ? process.env.NEXT_PUBLIC_STRAPI_URL + currentMedia.attributes.url
    : null;

  const [file, setFile] = useState<File | null>();

  const saveImage = async () => {
    if (file === undefined) return;
    onSave({ media: file });
  };

  return (
    <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-container space">
        <h1>Profilbild ändern</h1>

        <ImageUpload
          image={
            file !== undefined
              ? file
                ? URL.createObjectURL(file)
                : undefined
              : currentMediaUrl
          }
          onFileSelected={setFile}
        />
      </div>
      <Button
        className="profile-form-button"
        type={file === undefined ? 'grey' : undefined}
        onClick={saveImage}
        disabled={file === undefined}
      >
        Speichern
      </Button>
    </form>
  );
};

// TODO: change location, avatar & services

export const YourProfile = () => {
  const { data } = useMeHelper();
  const { mutate } = useUpdateMeMutation();

  const helper = data?.data;

  const handleSave = async (
    data: Partial<Omit<MeHelper, 'media'>> & { media?: File | null },
  ) => {
    mutate(
      { ...data, services: data.services?.data.map((service) => service.id) },
      {
        onSuccess: () => {
          toast('Deine Daten wurden gespeichert');
        },
        onError: (error) => {
          console.error(error);
          toast('Beim Speichern ist ein Fehler aufgetreten');
        },
      },
    );
  };

  return (
    <section className="profile-overview">
      <h1>Dein Profil</h1>
      {helper && (
        <>
          <ContactInformationForm helper={helper} onSave={handleSave} />
          <AvatarForm helper={helper} onSave={handleSave} />
        </>
      )}
    </section>
  );
};

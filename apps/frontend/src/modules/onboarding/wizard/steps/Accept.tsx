import { onboardHelper } from '@/modules/api/helper/mutations';
import { Checkbox } from '@/modules/common/components/form/Checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AcceptIcon } from '@/modules/common/components/icons/accept';
import { BackIcon } from '@/modules/common/components/icons/back';
import { NextIcon } from '@/modules/common/components/icons/next';
import { onboardingSchema, StepProps } from '../Wizard';

export const acceptSchema = z.object({
  acceptedTerms: z
    .boolean({
      required_error: 'Du musst die Nutzungsbedingungen akzeptieren',
    })
    .refine((value) => value, {
      message: 'Du musst die Nutzungsbedingungen akzeptieren',
    }),
  acceptedPrivacy: z
    .boolean({
      required_error: 'Du musst die Datenschutzbestimmungen akzeptieren',
    })
    .refine((value) => value, {
      message: 'Du musst die Datenschutzbestimmungen akzeptieren',
    }),
});
type FormValues = z.infer<typeof acceptSchema>;

const errorMap = {
  generic:
    'Es ist ein Fehler beim Versenden aufgetreten. Bitte noch einmal probieren!',
  'validation-error': 'Es wurden noch nicht alle Felder ausgefüllt',
  'duplicate-email': 'Diese E-Mail-Adresse ist bereits vergeben',
  'duplicate-name': 'Einen Helfer mit deinem Namen gibt es bereits',
} as Record<string, string>;

export const AcceptStep = ({
  updateAndNext,
  updateAndBack,
  defaultValues,
}: StepProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(acceptSchema),
  });

  const { mutateAsync, isError, error } = useMutation(onboardHelper);
  const [hasValidationError, setHasValidationError] = useState(false);

  const onSubmit = async (values: FormValues) => {
    const mergedData = { ...defaultValues, ...values };
    const result = onboardingSchema.safeParse(mergedData);

    if (!result.success) {
      setHasValidationError(true);
      return;
    }
    setHasValidationError(false);
    const data = result.data;

    await mutateAsync({
      name: data.name,
      about: data.about,
      address: data.address,
      email: data.email,
      phone: data.phone,
      geo: data.geo,
      password: data.password,
      services: data.services,
      summary: data.summary,
      media: data.media,
    }).then(() => {
      updateAndNext();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="frm description-full box-centered bgc-white bgc-transparent-on-mobile pdg-25">
        {(isError || hasValidationError) && (
          <div
            style={{
              backgroundColor: '#C94a30',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            <strong style={{ color: 'white', fontSize: '14px' }}>
              {hasValidationError
                ? errorMap['validation-error']
                : errorMap[(error as any)?.cause?.message] ??
                  errorMap['generic']}
            </strong>
          </div>
        )}
        <span className="step-icon not-on-mobile">
          <AcceptIcon />
        </span>

        <h2 className="h2-normalize">Fast geschafft!</h2>

        <p>
          Bitte bestätige zuletzt noch unsere Datenschutzbestimmungen und unsere
          Nutzungsbedingungen.
        </p>

        <div className="accept-group">
          <div className="accept pdg-10">
            <Checkbox
              name="acceptedPrivacy"
              control={control}
              error={errors.acceptedPrivacy}
              label={
                <strong>
                  Hiermit akzeptiere ich die <br />
                  <Link href="/privacy" target="_blank">
                    Datenschutz&shy;bestimmungen
                  </Link>
                </strong>
              }
              noFieldWrap
            />
          </div>

          <div className="accept pdg-10">
            <Checkbox
              name="acceptedTerms"
              control={control}
              error={errors.acceptedTerms}
              label={
                <strong>
                  Hiermit akzeptiere ich die <br />
                  <Link href="/terms" target="_blank">
                    Nutzungsbedingungen
                  </Link>
                </strong>
              }
              noFieldWrap
            />
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

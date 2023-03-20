import { RawCheckbox } from '@/modules/common/components/form/Checkbox';
import { FormFieldError } from '@/modules/common/components/form/Error';
import { useServices } from '@/modules/common/hooks/useServices';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {
  ErrorOption,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { BackIcon } from '@/modules/common/components/icons/back';
import { NextIcon } from '@/modules/common/components/icons/next';
import { ServicesIcon } from '@/modules/common/components/icons/services';
import { StepProps } from '../Wizard';

const message = 'Es muss mindestens eine Option ausgewählt werden.';
export const servicesSchema = z.object({
  services: z
    .array(z.number(), { required_error: message })
    .min(1, { message }),
});

type FormValues = z.infer<typeof servicesSchema>;

export const ServicesStep = ({
  updateAndNext: onSubmit,
  updateAndBack: onSubmitAndBack,
  defaultValues,
}: StepProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(servicesSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="description-small not-on-mobile box-centered bgc-white pdg-25">
        <div className="info">
          <ServicesIcon />

          <p>
            Wähle die Unterstützung aus, die du hilfebedürftigen Menschen
            anbieten möchtest. Diese Informationen kannst du auch jederzeit nach
            Registrierung ändern.
          </p>
        </div>
      </div>

      <div className="frm box-centered">
        <div className="grd-1 pdg-top-20 mobile-pdg-lft-20 mobile-pdg-rgt-20">
          <div className="grd-1 pdg-25 bgc-white">
            <h3 className="pdg-btm-35 fsi-26 pdg-top-20">
              Wobei kannst du helfen?
            </h3>

            <ServicesCheckList
              name="services"
              control={control}
              error={errors.services}
            />
          </div>
        </div>
      </div>

      <div className="frm not-on-mobile box-centered pdg-top-20">
        <button
          type="button"
          className="flt-lft button secondary"
          onClick={handleSubmit(onSubmitAndBack)}
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
          onClick={handleSubmit(onSubmitAndBack)}
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

interface ServicesCheckListProps extends UseControllerProps<any> {
  error?: ErrorOption;
}

const ServicesCheckList = (props: ServicesCheckListProps) => {
  const { error, ...controllerProps } = props;
  const { data, isLoading } = useServices();
  const services = data?.data;

  const { field } = useController(controllerProps);

  return (
    <div className="list-wrapper">
      {isLoading ? (
        <p>Lädt...</p>
      ) : (
        <ul>
          {services?.map((service, index) => {
            const isActive = field.value?.includes(service.id);
            return (
              <li key={service.id} className={clsx({ active: isActive })}>
                <RawCheckbox
                  checked={field.value?.includes(service.id)}
                  onChange={(checked) => {
                    if (!checked) {
                      field.onChange(
                        field.value?.filter((id: any) => id !== service.id),
                      );
                    } else if (!field.value?.includes(service.id)) {
                      field.onChange([...(field.value ?? []), service.id]);
                    }
                  }}
                  label={service.attributes.name}
                />
              </li>
            );
          })}
        </ul>
      )}
      <FormFieldError error={error} />
    </div>
  );
};

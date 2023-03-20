import { RawCheckbox } from '@/modules/common/components/form/Checkbox';
import { FormFieldError } from '@/modules/common/components/form/Error';
import { useServices } from '@/modules/common/hooks/useServices';
import clsx from 'clsx';
import {
  ErrorOption,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface ServicesCheckListProps extends UseControllerProps<any> {
  error?: ErrorOption;
}
export const ServicesCheckList = (props: ServicesCheckListProps) => {
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

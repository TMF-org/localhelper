import { Notice } from '@/modules/common/components/Notice';
import { ErrorOption, FieldError } from 'react-hook-form';

interface Props {
  error?: ErrorOption;
}

export const FormFieldError = ({ error }: Props) => {
  if (!error) {
    return null;
  }
  return <Notice type="error" message={error.message} />;
};

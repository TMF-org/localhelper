import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { FormFieldError } from './Error';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { error, label, type = 'text', ...inputProps } = props;

  let className = clsx('field space', {
    error: error,
  });

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input {...inputProps} type={type} ref={ref} />
      <FormFieldError error={error} />
    </div>
  );
});
Input.displayName = 'Input';

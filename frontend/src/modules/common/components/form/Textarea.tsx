import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { FormFieldError } from './Error';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  label?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { error, label, ...textareaProps } = props;

  let className = clsx('field space', {
    error: error,
  });

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <textarea {...textareaProps} ref={ref} />
      <FormFieldError error={error} />
    </div>
  );
});
Textarea.displayName = 'Textarea';

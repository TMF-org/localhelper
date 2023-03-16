import { Icon } from '@/modules/common/components/Icon';
import clsx from 'clsx';
import { Fragment, ReactNode } from 'react';
import { FieldError, useController, UseControllerProps } from 'react-hook-form';
import { FormFieldError } from './Error';

interface Props extends UseControllerProps<any> {
  error?: FieldError;
  label?: ReactNode;
  noFieldWrap?: boolean;

  size?: string;
  disabled?: boolean;
}

export const Checkbox = (props: Props) => {
  const { error, label, size, disabled, noFieldWrap, ...controllerProps } =
    props;
  const { field } = useController(controllerProps);

  return (
    <RawCheckbox
      checked={field.value}
      onChange={field.onChange}
      error={error}
      label={label}
      size={size}
      disabled={disabled}
      noFieldWrap={noFieldWrap}
    />
  );
};

interface UncontrolledProps {
  error?: FieldError;
  label?: ReactNode;
  noFieldWrap?: boolean;

  size?: string;
  disabled?: boolean;

  checked?: boolean;
  onChange?: (value: boolean) => void;
}

export const RawCheckbox = (props: UncontrolledProps) => {
  const {
    error,
    label,
    size = 'medium',
    disabled,
    checked,
    onChange,
    noFieldWrap,
  } = props;

  const getClassName = () => {
    let isActive = checked ? '-active' : '';
    let isDisabled = disabled ? '-disabled' : '';
    return `checkbox--${size}${isActive}${isDisabled}`;
  };

  const toggle = () => {
    onChange?.(!checked);
  };

  const checkboxGroup = (
    <>
      <div className="checkb-group">
        <span className={getClassName()} onClick={toggle}>
          {checked && <Icon name="check" size="small" />}
        </span>

        {label && <label onClick={toggle}>{label}</label>}
      </div>
      <FormFieldError error={error} />
    </>
  );

  if (noFieldWrap) return checkboxGroup;

  const wrapperClasses = clsx('field space', { error });
  return <div className={wrapperClasses}>{checkboxGroup}</div>;
};

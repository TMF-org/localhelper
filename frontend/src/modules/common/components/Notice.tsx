import clsx from 'clsx';
import { Icon } from './Icon';

interface Props {
  size?: string;
  classes?: string;
  type?: keyof typeof iconList;
  icon?: string;
  translation?: string;
  message?: string;
  noIcon?: boolean;
}

const iconList = {
  success: 'check',
  error: 'error',
  info: 'info',
  warning: 'hourglass',
} as const;

export const Notice = (props: Props) => {
  const {
    size = 'default',
    type = 'success',
    message,
    classes,
    icon: iconProp,
    noIcon,
  } = props;

  const className = clsx(`notice-${type}`, classes);

  const getIcon = () => {
    if (noIcon) return;
    let icon = iconProp;
    if (!icon) {
      icon = iconList[type];
    }

    return (
      <span>
        <i>
          <Icon name={icon} size={size} />
        </i>
      </span>
    );
  };

  return (
    <div className={className}>
      {getIcon()}
      <p>{message}</p>
    </div>
  );
};

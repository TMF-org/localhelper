import { Icon } from '@/modules/common/components/Icon';
import { ReactNode } from 'react';
import { useScreenStore } from '../../stores/screen';
import { ScreenHeader } from './Header';

interface Props {
  name: string;
  headline?: string;
  className?: string;
  colorClass?: string;
  animationName?: string;
  closeButton?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Screen = ({
  name,
  headline,
  className,
  colorClass,
  closeButton = true,
  onClose,
  animationName = 'default',
  children,
}: Props) => {
  const { isActive, isScreenLast, hideScreen, getLastScreen, animate } =
    useScreenStore();

  const closeScreen = () => {
    const lastScreen = getLastScreen();
    if (lastScreen) {
      hideScreen(lastScreen, { delay: 400 });
    }
    history.back();
    onClose?.();
  };

  if (!isActive(name)) {
    return null;
  }

  const getClassName = () => {
    let animateClassName =
      animate && isScreenLast(name) ? ' close-animation' : '';

    if (!!animationName) {
      animateClassName += ' animation-' + animationName;
    }
    return `screen ${className} ${animateClassName}`;
  };

  const getCloseButton = () => {
    if (!closeButton) {
      return null;
    }

    return (
      <span className="close">
        <Icon name="close" size="medium" onClick={closeScreen} />
      </span>
    );
  };

  return (
    <div className={getClassName()}>
      <ScreenHeader
        headline={headline}
        colorClass={colorClass ? `-${colorClass}` : ''}
      >
        {getCloseButton()}
      </ScreenHeader>

      <div className="wrapper scroll">{children}</div>
    </div>
  );
};

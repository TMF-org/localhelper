import { Icon } from '@/modules/common/components/Icon';
import { ReactNode } from 'react';
import { Search } from '../../stores/search';

interface Props {
  search: Search;
  showOnSuccess?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export const Location = ({
  search,
  showOnSuccess,
  onClick,
  children,
}: Props) => {
  const getIcon = () => {
    if (showOnSuccess && !search.city) {
      return children;
    }

    return (
      <span className="circles">
        <i />
        <span>
          <Icon name="location" size="medium" />
        </span>
      </span>
    );
  };

  const getLocation = () => {
    if (!search.city) return null;
    return (
      <h3>
        <strong>{search.city}</strong>
        <small>
          {search.detectType === 'auto'
            ? 'mittels Adresse'
            : 'mittels Standort-Ermittlung'}
        </small>
      </h3>
    );
  };

  const className = search.city
    ? 'location-indicator medium'
    : 'location-indicator big';

  return (
    <div className={className} onClick={onClick}>
      {getIcon()}
      {getLocation()}
    </div>
  );
};

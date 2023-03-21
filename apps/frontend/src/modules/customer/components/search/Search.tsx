import { Button } from '@/modules/common/components/Button';
import { useScreenStore } from '../../stores/screen';
import { ServiceSelector } from './Service';
import { AddressSearch } from './AddressSearch';
import { Screen } from '../screen/Screen';
import { Geo } from './Geo';
import { useIsHydrated } from '@/modules/common/hooks/useIsHydrated';

export const Search = () => {
  const isHydrated = useIsHydrated();
  const showScreen = useScreenStore((store) => store.showScreen);
  if (!isHydrated) return null;
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <ServiceSelector />
      <AddressSearch />
      <Button
        type="white"
        size="default"
        rounded
        onClick={() => showScreen('geo')}
      >
        <strong>Helfer*innen finden</strong>
      </Button>

      <Screen headline="Ort Ermittlung" name="geo" className="dark">
        <Geo />
      </Screen>
    </form>
  );
};

import { Button } from '@/modules/common/components/Button';
import { useScreenStore } from '../../stores/screen';
import { ServiceSelector } from './Service';
import { ZipCode } from './ZipCode';
import { Screen } from '../screen/Screen';
import { Geo } from './Geo';

export const Search = () => {
  const showScreen = useScreenStore((store) => store.showScreen);
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <ServiceSelector />
      <ZipCode />
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

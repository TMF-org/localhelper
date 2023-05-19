import { Helper } from '@/modules/api/helper/types';
import { Button } from '@/modules/common/components/Button';
import { Box } from '@/modules/common/components/grid/Box';
import { Row } from '@/modules/common/components/grid/Row';
import { Icon } from '@/modules/common/components/Icon';
import { Responsive } from '@/modules/common/components/Responsive';
import { StrapiData } from '@/services/api';
import { formatDistance } from '../../formatters';
import { HelpRequestForm } from '../../forms/HelpRequestForm';
import { useScreenStore } from '../../stores/screen';
import { Screen } from '../screen/Screen';
import { HelperImage } from './HelperImage';
import { HelperName } from './Name';

interface Props {
  helper: StrapiData<Helper>;
}

export const HelperCard = ({ helper }: Props) => {
  const showScreen = useScreenStore((store) => store.showScreen);

  const showHelpRequestForm = () => {
    showScreen(helper.attributes.name);
  };

  const helperLink = `/helper/${helper.attributes.url}`;

  return (
    <article className="store">
      <HelperImage
        storeLink={helperLink}
        media={helper.attributes.media?.data}
      />

      <div className="store-info">
        <header>
          {typeof helper.attributes.distance === 'number' && (
            <Distance distance={helper.attributes.distance} />
          )}
        </header>

        <section className="name-price">
          <HelperName {...helper.attributes} />
        </section>

        <p className="summary">{helper.attributes.summary}</p>

        <Row tagName="footer" className="request">
          <Box size="1of2" className="appointment-button">
            <Button
              href={helperLink}
              type="blue"
              size="default"
              className="schedule"
              rounded
            >
              <strong>Profil ansehen</strong>
            </Button>
          </Box>

          <Box size="1of2" className="appointment-button">
            <Button
              size="default"
              type="reverse"
              className="schedule"
              onClick={showHelpRequestForm}
              rounded
            >
              <strong>Hilfe anfragen</strong>
            </Button>
          </Box>
        </Row>
      </div>

      <Screen
        colorClass="primary"
        headline="Hilfe anfragen"
        name={helper.attributes.name}
      >
        <HelpRequestForm helper={helper} />
      </Screen>

      <Responsive mobile={true}>
        <div className="divider">
          <img src="/image/svg/divider-store.svg" />
        </div>
      </Responsive>
    </article>
  );
};

const Distance = ({ distance }: { distance: number }) => {
  let text = `${formatDistance(distance)} entfernt`;
  return (
    <span className="distance">
      <Icon name="location" />
      <small>{text}</small>
    </span>
  );
};

import Markdown from 'react-markdown';
import { Button } from '@/modules/common/components/Button';
import { StrapiData } from '@/services/api';
import { Breadcrumbs } from '../../Breadcrumbs';
import { useScreenStore } from '../../stores/screen';
import { HelperImage } from './HelperImage';
import { HelperName } from './Name';
import { useRouter } from 'next/router';
import { ServiceList } from '../service/ServiceList';
import { Screen } from '../screen/Screen';
import { HelpRequestForm } from '../../forms/HelpRequestForm';
import { HelperWithDetails } from '@/modules/api/helper/types';

interface Props {
  helper: StrapiData<HelperWithDetails>;
}

export const HelperDetails = ({ helper }: Props) => {
  const router = useRouter();
  const showScreen = useScreenStore((store) => store.showScreen);

  const getButton = (fullwidth = false) => {
    return fullwidth ? (
      <Button type="info" size="default" onClick={() => router.push('/join')}>
        <strong>Als Helfer*in mitmachen</strong>
      </Button>
    ) : (
      <Button
        type="primary"
        size="default"
        className="button-small-centered"
        onClick={() => showScreen('help-request')}
      >
        <strong>Hilfe anfragen</strong>
      </Button>
    );
  };
  return (
    <>
      <Breadcrumbs page={helper.attributes.name} />

      <section className="store">
        <div className="store-info">
          <section className="name-price">
            <HelperName name={helper.attributes.name} tagName="h1" />
          </section>
          <div className="summary">
            <p>{helper.attributes.summary}</p>
          </div>
        </div>

        <HelperImage media={helper.attributes.media?.data} />

        {getButton()}

        <br />
        <br />

        <section className="field space article">
          <Markdown>{helper.attributes.about ?? ''}</Markdown>
        </section>

        <br />
        <br />

        <ServiceList
          services={helper.attributes.services.data ?? []}
          headline="Services des Helfers"
          headlineSize="small"
        />

        <br />
        <br />
        <br />

        {getButton(true)}

        <Screen
          colorClass="primary"
          headline="Nach Hilfe fragen"
          name="help-request"
        >
          <HelpRequestForm helper={helper} />
        </Screen>
      </section>
    </>
  );
};

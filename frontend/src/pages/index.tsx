import { Button } from '@/modules/common/components/Button';
import { Icon } from '@/modules/common/components/Icon';
import { Responsive } from '@/modules/common/components/Responsive';
import { Steps } from '@/modules/common/components/Steps';
import { fetchServiceCategories } from '@/modules/common/hooks/useServiceCategories';
import { fetchServices, useServices } from '@/modules/common/hooks/useServices';
import { Search } from '@/modules/customer/components/search/Search';
import { ServiceList } from '@/modules/customer/components/service/ServiceList';
import { CustomerLayout } from '@/modules/customer/layout';
import { prefetchQueries } from '@/services/api';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { data } = useServices();
  const services = data?.data ?? [];

  return (
    <>
      <section className="mood-primary">
        <h1>
          Vor Ort finden und verbinden
          <br />
          <br />
          <small>Ich brauche Unterstützung bei</small>
        </h1>
        <h3 className="invader">Kostenlos Hilfe suchen und anbieten</h3>
        <Search />
      </section>
      <Responsive tablet desktop>
        <section className="section howto">
          <h2 className="section-headline">
            <strong>So funktioniert&apos;s!</strong>
            <small>In 3 Schritten erklärt</small>
          </h2>

          <div className="step">
            <Icon name="pointer" size="big" />
            <h3>Wähle die Unterstützung</h3>
            <p>
              Egal ob Einkauf, Haushalt oder ein nettes Gespräch. Wähle aus,
              wobei du Unterstützung benötigst.
            </p>
          </div>

          <div className="step">
            <Icon name="betreuung" size="big" />
            <h3>Finde deine Lokalhelfer</h3>
            <p>
              Sobald du die Suche ausführst, suchen wir für dich passende und
              nahe Lokalhelfer*innen aus, die dir weiterhelfen können.
            </p>
          </div>

          <div className="step">
            <Icon name="touch" size="big" />
            <h3>Erfrage Unterstützung</h3>
            <p>
              Such dir aus der Liste den oder die passende Lokalhelfer*in aus
              und sende eine Anfrage. Du wirst per Mail benachrichtigt, sobald
              darauf reagiert wurde.
            </p>
          </div>
        </section>
      </Responsive>
      <Responsive mobile>
        <Steps>
          <div className="step">
            <Icon name="pointer" size="big" />
            <h3>Wähle die Unterstützung</h3>
            <p>
              Egal ob Einkauf, Haushalt oder ein nettes Gespräch. Wähle aus,
              wobei du Unterstützung benötigst.
            </p>
          </div>
          <div className="step">
            <Icon name="betreuung" size="big" />
            <h3>Finde deine Lokalhelfer</h3>
            <p>
              Sobald du die Suche ausführst, suchen wir für dich passende und
              nahe Lokalhelfer*innen aus, die dir weiterhelfen können.
            </p>
          </div>
          <div className="step">
            <Icon name="touch" size="big" />
            <h3>Erfrage Unterstützung</h3>
            <p>
              Such dir aus der Liste den oder die passende Lokalhelfer*in aus
              und sende eine Anfrage. Du wirst per Mail benachrichtigt, sobald
              darauf reagiert wurde.
            </p>
          </div>
        </Steps>
      </Responsive>
      <section className="section" id="NoRefresh">
        <Responsive mobile tablet desktop>
          <h2 className="section-headline">
            <strong>Alle Helfer*innen auf einen Blick</strong>
          </h2>
          {/* TODO: add map */}
          {/* <HelpersMap helpers={this.props.response.helpers} /> */}
        </Responsive>
      </section>
      <section className="section">
        <Responsive tablet desktop>
          <div className="box-max-round contact">
            <img src="/image/svg/divider-store.svg" />
            <br />
            <br />
            <br />
          </div>
        </Responsive>

        <h2 className="section-headline-no-space">
          <img
            src="/image/placeholder_640x431.svg"
            alt="Hilfe Anbieten"
            className={'image-width-500'}
          />
          <strong>Mach mit!&nbsp;</strong>
          <br />
          <small>Wir freuen uns auf dich</small>
          <br />
          <br />
        </h2>

        <div className="box-max-round contact">
          <p>
            Sei als Lokalhelfer*in dabei und biete Menschen in deiner Umgebung
            deine Hilfe an.
          </p>
          <br />
          <br />
          <Button type="primary" size="default" href="/join" indirectLink>
            <strong>Als Helfer mitmachen</strong>
          </Button>

          <br />
          <br />
          <br />
        </div>
      </section>
      <div className="box-max-round contact">
        <img src="/image/svg/divider-store.svg" />
        <br />
        <br />
        <br />
      </div>

      <ServiceList
        headline="Beliebte Unterstützung"
        subHeadline="Finde Unterstützung in deiner Umgebung
"
        showOnlyPopular
        services={services}
      />

      <div className="box-max-round contact">
        <img src="/image/svg/divider-store.svg" />
      </div>
      <section className="section">
        <h2 className="section-headline-no-space">
          <strong>In Kooperation mit:</strong>
        </h2>

        <ul className="known-from">
          <li className="pos-1-2" title="Toyota Mobility Foundation">
            <span>
              <i>Toyota Mobility Foundation</i>
            </span>
          </li>
        </ul>
      </section>
      <div className="box-max-round contact">
        <img src="/image/svg/divider-store.svg" />
      </div>
      <section className="section article">
        <div className="box-max-round">
          <h3 className="section-headline">
            <strong>Finde Unterstützung in deiner Umgebung</strong>
          </h3>

          <p className="pdg-10 center">
            Mit Lokalhelfer findest du einfach und bequem Unterstützung in
            deiner Umgebung. Ob Hilfe im Haushalt, bei der Kinderbetreuung oder
            wenn einfach nur ein offenes Ohr gesucht wird - Lokalhelfer
            verbindet Menschen, die Unterstützung suchen mit Helfer*innen, die
            sich gerne ehrenamtlich einbringen möchten. Zusammen stehen und
            unkompliziert nachbarschaftliche Unterstützung annehmen und geben -
            mit und von Menschen aus deiner Umgebung. Das ist Lokalhelfer.
          </p>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

Home.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { dehydratedState } = await prefetchQueries([
    { queryKey: ['services'], queryFn: fetchServices },
    { queryKey: ['service-categories'], queryFn: fetchServiceCategories },
  ]);
  return { props: { dehydratedState } };
};

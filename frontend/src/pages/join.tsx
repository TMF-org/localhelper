import { Button } from '@/modules/common/components/Button';
import { Icon } from '@/modules/common/components/Icon';
import { CustomerLayout } from '@/modules/customer/layout';
import { NextPageWithLayout } from './_app';

const Join: NextPageWithLayout = () => {
  return (
    <>
      <section id="join" className="join">
        <div className="inner">
          <header>
            <h2>Werde Lokalhelfer!</h2>

            <p>&nbsp;</p>

            <img src="/icons/logo.svg" className="bird" />

            <img src="/image/svg/join-bottom.svg" className="join-bottom" />
          </header>

          <h3>
            <span>Hilfe von nebenan</span>
          </h3>

          <ul className="benefits">
            <li>
              <Icon name="check" />
              <span>Biete Unterstützung in deiner Nachbarschaft an</span>
            </li>
            <li>
              <Icon name="check" />
              <span>Ausschließlich nicht-kommerzielle Angebote</span>
            </li>
            <li>
              <Icon name="check" />
              <span>Digitalisiertes Ehrenamt einfach gemacht</span>
            </li>
            <li>
              <Icon name="check" />
              <span>Kostenlose Anmeldung und direkte Nutzung</span>
            </li>
            <li>
              <Icon name="check" />
              <span>Entscheide selbst, welche Gesuche du annimmst</span>
            </li>
          </ul>

          <div className="field space">
            <Button size="default" href="/onboarding">
              <strong>Jetzt Lokalhelfer werden</strong>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

Join.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Join;

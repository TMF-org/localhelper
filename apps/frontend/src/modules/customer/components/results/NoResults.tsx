import { Button } from '@/modules/common/components/Button';

export const NoResults = () => {
  return (
    <div className="no-results">
      <h2>
        <strong>Keine Helfer</strong>
      </h2>

      <p>Zu diesen Kriterien haben wir leider noch keine Helfer</p>
      <br />
      <br />
      <br />
      <br />
      <div className="box-max-round contact">
        <img src="/image/svg/divider-store.svg" />
        <br />
        <br />
        <br />
      </div>

      <h2>
        <strong>Bist du ein Helfer?</strong>
      </h2>

      <div className="field space">
        <Button type="primary" href="/onboarding" size="default">
          <strong>Jetzt als Helfer anmelden</strong>
        </Button>
      </div>
    </div>
  );
};

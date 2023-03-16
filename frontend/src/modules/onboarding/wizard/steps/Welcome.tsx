import { MountainIcon } from '../../components/icons/mountain';
import { NextIcon } from '../../components/icons/next';
import { StepProps } from '../Wizard';

export const WelcomeStep = ({ updateAndNext }: StepProps) => {
  return (
    <>
      <div className="description-full box-centered bgc-white pdg-25">
        <span className="step-icon not-on-mobile">
          <MountainIcon />
        </span>

        <h2>Herzlich Willkommen</h2>
        <p>
          Wir freuen uns darüber, dass du über Lokalhelfer.de deine Hilfe zur
          Verfügung stellst.
        </p>
        <p>
          Wir führen dich Schritt für Schritt durch unsere Anmeldung.
          <br />
          Bereit? Dann klick unten auf "Los geht&apos;s"
        </p>
      </div>

      <div className="frm box-centered pdg-30">
        <button onClick={() => updateAndNext()} className="button">
          <span>Los gehts!</span>
          <NextIcon />
        </button>
      </div>
    </>
  );
};

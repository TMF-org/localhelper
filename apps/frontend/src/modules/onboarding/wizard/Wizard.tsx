import { Icon } from '@/modules/common/components/Icon';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { AcceptIcon } from '../components/icons/accept';
import { DetailsIcon } from '../components/icons/details';
import { FinishIcon } from '../components/icons/finish';
import { LocationIcon } from '../components/icons/location';
import { MountainIcon } from '../components/icons/mountain';
import { ServicesIcon } from '../components/icons/services';
import { UserIcon } from '../components/icons/user';
import { acceptSchema, AcceptStep } from './steps/Accept';
import { avatarSchema, AvatarStep } from './steps/Avatar';
import { detailsSchema, DetailsStep } from './steps/Details';
import { FinishedStep } from './steps/Finished';
import { locationSchema, LocationStep } from './steps/Location';
import { servicesSchema, ServicesStep } from './steps/Services';
import { userSchema, UserStep } from './steps/User';
import { WelcomeStep } from './steps/Welcome';

export const onboardingSchema = userSchema
  .merge(locationSchema)
  .merge(avatarSchema)
  .merge(detailsSchema)
  .merge(servicesSchema)
  .merge(acceptSchema);

type OnboardingState = z.infer<typeof onboardingSchema>;

export interface StepProps {
  defaultValues: Partial<OnboardingState>;
  updateAndNext: (patch?: Partial<OnboardingState>) => void;
  updateAndBack: (patch: Partial<OnboardingState>) => void;
}

export const Wizard = ({ step }: { step: number }) => {
  const router = useRouter();
  const [onboardingState, setOnboardingState] = useState<
    Partial<OnboardingState>
  >({});

  const updateState =
    (goBack: boolean) => (patch?: Partial<OnboardingState>) => {
      setOnboardingState((state) => ({ ...state, ...patch }));
      if (goBack) {
        router.push('/onboarding/' + (step - 1));
      } else {
        router.push('/onboarding/' + (step + 1));
      }
    };

  const stepProps: StepProps = {
    defaultValues: onboardingState,
    updateAndNext: updateState(false),
    updateAndBack: updateState(true),
  };
  const getStep = (step: number) => {
    switch (step) {
      case 1:
        return <WelcomeStep {...stepProps} />;
      case 2:
        return <UserStep {...stepProps} />;
      case 3:
        return <LocationStep {...stepProps} />;
      case 4:
        return <AvatarStep {...stepProps} />;
      case 5:
        return <DetailsStep {...stepProps} />;
      case 6:
        return <ServicesStep {...stepProps} />;
      case 7:
        return <AcceptStep {...stepProps} />;
      case 8:
        return <FinishedStep />;
      default:
        return <div>404</div>;
    }
  };
  return (
    <>
      <Steps step={step >= 5 ? step - 1 : step} />
      {getStep(step)}
    </>
  );
};

const Steps = ({ step: stepNumber }: { step: number }) => {
  const steps = useRef([
    { icon: <MountainIcon /> },
    { icon: <UserIcon /> },
    { icon: <LocationIcon /> },
    { icon: <DetailsIcon /> },
    { icon: <ServicesIcon /> },
    { icon: <AcceptIcon /> },
    { icon: <FinishIcon /> },
  ]);

  const getSteps = (width: string) => {
    return steps.current.map((step, index) => {
      const className = clsx({
        active: stepNumber - 1 >= index,
        current: stepNumber - 1 === index,
      });

      return (
        <li key={index} className={className} style={{ width }}>
          <span className="picto">{step.icon}</span>
        </li>
      );
    });
  };

  const width = 100 / steps.current.length;
  const progressBarWidth = width * stepNumber > 100 ? 100 : width * stepNumber;
  const mobileWidth = 60;
  const mobileTranslate = stepNumber * mobileWidth - mobileWidth;
  const transform = { transform: `translateX(-${mobileTranslate}%)` };

  const percent = (str: string | number) => `${str}%`;

  return (
    <>
      <ul className="steps mobile-only" style={transform}>
        {getSteps(percent(mobileWidth))}
      </ul>

      <ul className="steps not-on-mobile is-table">
        {getSteps(percent(width * 0.8))}
      </ul>

      <div className="progress">
        <i style={{ width: percent(progressBarWidth) }} />
      </div>
    </>
  );
};

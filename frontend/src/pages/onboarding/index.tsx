import { OnboardingLayout } from '@/modules/onboarding/layout';
import { Wizard } from '@/modules/onboarding/wizard/Wizard';
import { NextPageWithLayout } from '../_app';

const Onboarding: NextPageWithLayout = () => {
  return <Wizard step={1} />;
};

Onboarding.getLayout = (page) => <OnboardingLayout>{page}</OnboardingLayout>;

export default Onboarding;

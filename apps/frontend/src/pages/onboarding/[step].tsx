import { OnboardingLayout } from '@/modules/onboarding/layout';
import { Wizard } from '@/modules/onboarding/wizard/Wizard';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';

const Step: NextPageWithLayout = () => {
  const { step } = useRouter().query;
  return <Wizard step={Number(step)} />;
};

Step.getLayout = (page) => <OnboardingLayout>{page}</OnboardingLayout>;

export default Step;

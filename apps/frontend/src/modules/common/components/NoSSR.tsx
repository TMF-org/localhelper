import dynamic from 'next/dynamic';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const NoSSR = ({ children }: Props) => <>{children}</>;

/**
 * This component is used to prevent SSR for components that can't be rendered on the server
 * or that would render differently on the server and the client and cause a hydration mismatch.
 */
const DynamicNoSSR = dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});

export { DynamicNoSSR as NoSSR };

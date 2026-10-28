'use client';
import dynamic from 'next/dynamic';

const TwoStepBookingFlow = dynamic(() => import('@/components/TwoStepBookingFlow'), {
  ssr: false,
});

export default function ClientBookingWrapper(props) {
  return <TwoStepBookingFlow {...props} />;
}

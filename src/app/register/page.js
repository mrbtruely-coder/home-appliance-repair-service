import RegisterForm from '@/components/RegisterForm';
export const metadata = { title: 'Create a Customer Account', description: 'Create a Doorstep customer account to manage home appliance service enquiries and booking updates in Hyderabad.', robots: { index: false, follow: true }, alternates: { canonical: '/register/' } };
export default function Page() { return <RegisterForm />; }

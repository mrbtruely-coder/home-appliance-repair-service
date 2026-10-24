import LoginForm from '@/components/LoginForm';
export const metadata = { title: 'Customer Login', description: 'Sign in to manage Doorstep home appliance service requests and account notifications in Hyderabad.', robots: { index: false, follow: true }, alternates: { canonical: '/login/' } };
export default function Page() { return <LoginForm />; }

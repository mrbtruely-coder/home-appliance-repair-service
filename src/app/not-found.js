import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <section className="not-found container"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>This page isn’t here.</h1><p>The page may have moved, or the address may be incorrect.</p><Link className="button button-primary" href="/"><ArrowLeft size={16}/> Back to home</Link></section>;
}

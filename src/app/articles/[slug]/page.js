import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import { ARTICLES } from '@/lib/articles';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
export function generateStaticParams(){return ARTICLES.map(article=>({slug:article.slug}));}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) return {};
  return pageMetadata({
    title: `${article.title} | Doorstep Service`,
    description: article.description,
    path: `/articles/${article.slug}/`,
    keywords: [
      article.title,
      `${article.category} repair Hyderabad`,
      `${article.category.toLowerCase()} troubleshooting`,
      'home appliance repair Hyderabad',
      'appliance maintenance tips',
      `${article.category.toLowerCase()} fix guide`,
      'DIY appliance diagnosis',
      'doorstep technician Hyderabad',
      'how to fix appliance problem',
      'certified appliance engineer advice',
    ],
  });
}
export default async function ArticleDetail({params}){const {slug}=await params;const article=ARTICLES.find(item=>item.slug===slug);if(!article)notFound();const jsonLd={'@context':'https://schema.org','@type':'BlogPosting','headline':article.title,'description':article.description,'datePublished':article.date,'dateModified':article.date,'author':{'@type':'Organization','name':SITE_NAME,'url':SITE_URL},'publisher':{'@type':'Organization','name':SITE_NAME,'url':SITE_URL},'mainEntityOfPage':`${SITE_URL}/articles/${article.slug}/`};return <><StructuredData data={jsonLd}/><section className="article-detail-hero"><div className="container"><Link href="/articles/" className="article-back"><ArrowLeft size={15}/> All articles</Link><span className="eyebrow">{article.category}</span><h1>{article.title}</h1><p>{article.description}</p><div className="article-meta article-detail-meta"><span><Clock3 size={14}/> {article.readTime}</span><span>Doorstep Editorial</span></div></div></section><section className="section article-body-section"><div className="container article-reading-layout"><article className="article-content"><p className="article-intro">{article.intro}</p>{article.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</section>)}<div className="article-disclaimer">This guide is general information, not a substitute for the appliance manual or a qualified technician’s diagnosis. Do not open appliances or work on electrical, gas, water-heating or refrigerant components yourself.</div><Link className="button button-primary" href="/booking/">Enquire about a service <ArrowUpRight size={16}/></Link></article><aside className="article-sidebar"><span className="eyebrow">RELATED</span><h3>Explore appliance services</h3><p>Need professional help? Check service details and enquire for your locality.</p><Link href="/services/">View all services <ArrowUpRight size={14}/></Link><Link href="/help-center/">Visit Help Center <ArrowUpRight size={14}/></Link><Link href="/faqs/">Read FAQs <ArrowUpRight size={14}/></Link></aside></div></section></>}

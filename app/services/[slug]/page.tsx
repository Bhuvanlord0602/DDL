import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const services = {
  'design-cad': { title: 'Design & CAD', eyebrow: '01 / Core capability', description: 'Create, modify and optimize detailed 3D CAD models for practical engineering and manufacturing applications.', tags: ['3D CAD Modelling', 'Product Design', 'Design Optimization'] },
  'engineering-drawings': { title: 'Engineering Drawings', eyebrow: '02 / Core capability', description: 'Detailed engineering documentation for manufacturing, fabrication and assembly.', tags: ['Manufacturing Drawings', 'Assembly Drawings', 'GD&T'] },
  machining: { title: 'Machining', eyebrow: '03 / Core capability', description: 'Engineering designs brought closer to physical production through machining processes.', tags: ['Milling', 'Turning', 'Drilling', 'Grinding'] },
  'rapid-prototyping': { title: 'Rapid Prototyping', eyebrow: '04 / Core capability', description: 'Rapid prototyping and functional 3D printing for faster design iteration and physical validation.', tags: ['FDM', 'SLA', 'SLS'] },
} as const

export function generateStaticParams() { return Object.keys(services).map((slug) => ({ slug })) }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services[slug as keyof typeof services]
  if (!service) return null
  return <main className="min-h-screen bg-[#090b0c] px-6 py-10 text-[#eef2f3] lg:px-10">
    <div className="mx-auto max-w-5xl">
      <Link href="/#capabilities" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-200 hover:text-white"><ArrowLeft className="size-3" /> Back to capabilities</Link>
      <div className="mt-24 max-w-3xl border-t border-white/15 pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-cyan-300">{service.eyebrow}</p>
        <h1 className="mt-6 text-6xl font-semibold leading-none tracking-[-.07em] sm:text-8xl">{service.title}<span className="text-cyan-300">.</span></h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-white/55">{service.description}</p>
        <div className="mt-10 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/55">{tag}</span>)}</div>
        <Link href="/#contact" className="mt-12 inline-flex items-center gap-2 bg-cyan-300 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-black hover:bg-white">Discuss this capability <ArrowUpRight className="size-3" /></Link>
      </div>
    </div>
  </main>
}

const serviceMetadata = {
  'design-cad': { title: 'DDL CAD Design & 3D Modelling | Engineering Solutions', description: 'DDL provides 3D CAD modelling, engineering design, design optimization and design modification services for practical engineering applications.' },
  'engineering-drawings': { title: 'DDL Engineering Drawings | Manufacturing Documentation', description: 'DDL creates engineering, manufacturing and assembly drawings with practical documentation for fabrication and production.' },
  machining: { title: 'DDL Manufacturing & Machining | Milling, Turning, Drilling & Grinding', description: 'Explore DDL machining capabilities including milling, turning, drilling and grinding for engineering and manufacturing requirements.' },
  'rapid-prototyping': { title: 'DDL 3D Printing & Rapid Prototyping | FDM, SLA & SLS', description: 'DDL provides rapid prototyping and functional 3D printing using FDM, SLA and SLS technologies.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const details = serviceMetadata[slug as keyof typeof serviceMetadata]
  return {
    title: details?.title || 'Service | DDL Engineering',
    description: details?.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: details ? { title: details.title, description: details.description, type: 'website' as const } : undefined,
  }
} 

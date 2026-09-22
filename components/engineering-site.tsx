'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Html, Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ArrowUpRight, Check, ChevronRight, Menu, Minus, Monitor, Moon, Plus, ScanLine, Send, Sun, X, Zap } from 'lucide-react'

const WA = 'https://wa.me/919380586479'

function Part({ wire = false, exploded = false }: { wire?: boolean; exploded?: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.16 })
  const steel = { color: '#87949d', metalness: 0.96, roughness: 0.16, wireframe: wire }
  const darkSteel = { color: '#26323a', metalness: 0.9, roughness: 0.2, wireframe: wire }
  return <group ref={group} rotation={[0.22, -0.42, 0.08]}>
    <mesh position={[0, exploded ? 0.68 : 0, 0]} castShadow>
      <boxGeometry args={[2.55, 0.42, 1.62]} /><meshStandardMaterial {...steel} />
    </mesh>
    <mesh position={[0, exploded ? -0.68 : 0, 0]} castShadow>
      <boxGeometry args={[1.62, 0.78, 1.06]} /><meshStandardMaterial {...darkSteel} />
    </mesh>
    <mesh position={[0, exploded ? -0.32 : 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.48, 0.48, 0.22, 48]} /><meshStandardMaterial {...steel} />
    </mesh>
    <mesh position={[0, exploded ? -0.18 : 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.25, 0.25, 0.28, 48]} /><meshStandardMaterial {...darkSteel} />
    </mesh>
    {[[-0.78, 0, 0.52], [0.78, 0, 0.52], [-0.78, 0, -0.52], [0.78, 0, -0.52]].map(([x, y, z]) => <mesh key={`${x}-${z}`} position={[x, exploded ? y + 0.68 : y, z]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.12, 0.12, 0.22, 24]} /><meshStandardMaterial color="#d5e0e4" metalness={1} roughness={0.12} wireframe={wire} /></mesh>)}
    <mesh position={[0, exploded ? 0.92 : 0.22, 0]}><boxGeometry args={[1.65, 0.06, 0.72]} /><meshStandardMaterial color="#c4d0d4" metalness={1} roughness={0.12} wireframe={wire} /></mesh>
  </group>
}

function EngineeringModel({ wire = false, exploded = false, dimensions = false, light = false }: { wire?: boolean; exploded?: boolean; dimensions?: boolean; light?: boolean }) {
  return <div className="h-full min-h-[360px] w-full">
    <Canvas camera={{ position: [3.3, 2.3, 4.4], fov: 35 }} shadows>
      <color attach="background" args={[light ? '#e8eef0' : '#101417']} /><ambientLight intensity={1.1} /><directionalLight position={[3, 5, 2]} intensity={3} castShadow />
      <pointLight position={[-3, 1, 2]} color="#52d7ff" intensity={5} distance={7} /><Environment preset="studio" />
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}><Part wire={wire} exploded={exploded} /></Float>
      {dimensions && <group rotation={[0.22, -0.42, 0.08]}>
        <Line points={[[-1.45, 0.9, 0.9], [1.45, 0.9, 0.9]]} color="#52d7ff" lineWidth={1.5} />
        <Line points={[[-1.45, 0.78, 0.9], [-1.45, 1.02, 0.9]]} color="#52d7ff" lineWidth={1.5} />
        <Line points={[[1.45, 0.78, 0.9], [1.45, 1.02, 0.9]]} color="#52d7ff" lineWidth={1.5} />
        <Line points={[[1.65, -0.8, 0.7], [1.65, 0.8, 0.7]]} color="#52d7ff" lineWidth={1.5} />
        <Line points={[[1.53, -0.8, 0.7], [1.77, -0.8, 0.7]]} color="#52d7ff" lineWidth={1.5} />
        <Line points={[[1.53, 0.8, 0.7], [1.77, 0.8, 0.7]]} color="#52d7ff" lineWidth={1.5} />
        <Html position={[0, 1.08, 0.9]} center distanceFactor={5} transform>
          <span className="whitespace-nowrap border border-cyan-300/60 bg-[#071014]/90 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-cyan-200">W 2.55 mm</span>
        </Html>
        <Html position={[1.88, 0, 0.7]} center distanceFactor={5} transform>
          <span className="whitespace-nowrap border border-cyan-300/60 bg-[#071014]/90 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-cyan-200">H 1.62 mm</span>
        </Html>
        <Html position={[0, 0.5, 0.4]} center distanceFactor={5} transform>
          <span className="whitespace-nowrap border border-white/25 bg-[#071014]/90 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-white/75">Ø 0.96 mm</span>
        </Html>
      </group>}
      <OrbitControls enablePan={false} minDistance={3} maxDistance={7} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  </div>
}

const services = [
  { no: '01', slug: 'design-cad', title: 'Design & CAD', text: 'Create, modify and optimize detailed 3D CAD models for practical engineering and manufacturing applications.', tags: ['3D CAD Modelling', 'Product Design', 'Design Optimization'] },
  { no: '02', slug: 'engineering-drawings', title: 'Engineering Drawings', text: 'Detailed engineering documentation for manufacturing, fabrication and assembly.', tags: ['Manufacturing Drawings', 'Assembly Drawings', 'GD&T'] },
  { no: '03', slug: 'machining', title: 'Machining', text: 'Engineering designs brought closer to physical production through machining processes.', tags: ['Milling', 'Turning', 'Drilling', 'Grinding'] },
  { no: '04', slug: 'rapid-prototyping', title: 'Rapid Prototyping', text: 'Rapid prototyping and functional 3D printing for faster design iteration and physical validation.', tags: ['FDM', 'SLA', 'SLS'] },
]

function TechnicalGrid() { return <div className="pointer-events-none absolute inset-0 technical-grid opacity-60" /> }
function Label({ children }: { children: React.ReactNode }) { return <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">{children}</span> }

export function EngineeringSite() {
  const [menu, setMenu] = useState(false)
  const [wire, setWire] = useState(false)
  const [exploded, setExploded] = useState(false)
  const [dimensions, setDimensions] = useState(false)
  const [process, setProcess] = useState('Milling')
  const [print, setPrint] = useState('FDM')
  const [sent, setSent] = useState(false)
  const [mode, setMode] = useState<'system' | 'light' | 'dark'>('system')
  const [systemDark, setSystemDark] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemDark(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const isLight = mode === 'light' || (mode === 'system' && !systemDark)
  const themeLabel = mode === 'system' ? 'System theme' : mode === 'light' ? 'Light theme' : 'Dark theme'

  return <main className={`engineering-site overflow-hidden bg-[#090b0c] text-[#eef2f3] ${isLight ? 'site-light' : ''}`}>
    <nav className="fixed z-50 w-full border-b border-white/10 bg-[#090b0c]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="text-2xl font-bold tracking-[-0.1em]">DDL<span className="text-cyan-300">.</span></a>
        <div className="hidden items-center gap-7 md:flex">{['Capabilities', 'Process', 'About', 'Contact'].map(x => <a key={x} href={`#${x.toLowerCase()}`} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 transition hover:text-cyan-300">{x}</a>)}<div className="flex items-center border border-white/15 p-1" aria-label="Color theme"><button type="button" onClick={() => setMode('system')} aria-label="Use system theme" aria-pressed={mode === 'system'} className={`p-1.5 ${mode === 'system' ? 'bg-cyan-300 text-black' : 'text-white/45 hover:text-white'}`}><Monitor className="size-3" /></button><button type="button" onClick={() => setMode('light')} aria-label="Use light theme" aria-pressed={mode === 'light'} className={`p-1.5 ${mode === 'light' ? 'bg-cyan-300 text-black' : 'text-white/45 hover:text-white'}`}><Sun className="size-3" /></button><button type="button" onClick={() => setMode('dark')} aria-label="Use dark theme" aria-pressed={mode === 'dark'} className={`p-1.5 ${mode === 'dark' ? 'bg-cyan-300 text-black' : 'text-white/45 hover:text-white'}`}><Moon className="size-3" /></button><span className="sr-only">{themeLabel}</span></div><a href="#contact" className="border border-cyan-300/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-200 transition hover:bg-cyan-300 hover:text-black">Start a project <ArrowUpRight className="ml-2 inline size-3" /></a></div>
        <button aria-label="Toggle menu" onClick={() => setMenu(!menu)} className="md:hidden">{menu ? <X /> : <Menu />}</button>
      </div>
      {menu && <div className="flex flex-col gap-6 border-t border-white/10 bg-[#090b0c] px-6 py-8 md:hidden">{['Capabilities', 'Process', 'About', 'Contact'].map(x => <a onClick={() => setMenu(false)} key={x} href={`#${x.toLowerCase()}`} className="font-mono text-xs uppercase tracking-widest text-white/70">{x}</a>)}</div>}
    </nav>

    <section id="top" className="relative min-h-screen border-b border-white/10 pt-20">
      <TechnicalGrid /><div className="absolute left-[6%] top-36 font-mono text-[9px] tracking-[0.3em] text-white/25 [writing-mode:vertical-rl]">COORDINATE SYSTEM // X  Y  Z</div>
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-8 px-6 py-20 lg:grid-cols-[1fr_1.05fr] lg:px-10 lg:py-24">
        <div className="max-w-xl"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><Label>DDL / Engineering & Manufacturing</Label><h1 className="mt-6 text-6xl font-semibold leading-[0.93] tracking-[-0.065em] sm:text-8xl">Engineering<br /><span className="text-white/35">ideas</span><br />into reality<span className="text-cyan-300">.</span></h1><p className="mt-8 max-w-md text-base leading-7 text-white/55">Precision CAD design, engineering documentation, machining, rapid prototyping, 3D printing and reverse engineering for real-world manufacturing.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#contact" className="bg-cyan-300 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition hover:bg-white">Start a project <ArrowUpRight className="ml-2 inline size-3" /></a><a href="#capabilities" className="border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:border-cyan-300/60 hover:text-white">Explore capabilities</a></div><a href={WA} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-200"><Zap className="size-3" /> Prefer a quick conversation? Chat on WhatsApp</a></motion.div></div>
        <div className="relative h-[440px] lg:h-[560px]"><EngineeringModel light={isLight} /><div className="absolute left-3 top-10 font-mono text-[9px] text-white/35">Ø42.00 mm<br />R3.50<br />TOL ±0.05</div><div className="absolute bottom-9 right-0 w-44 border border-white/15 bg-black/30 p-4 backdrop-blur"><Label>Model / 042</Label><div className="mt-3 flex justify-between font-mono text-[9px] text-white/60"><span>STATUS</span><span className="text-cyan-200">MFG READY</span></div><div className="mt-2 flex justify-between font-mono text-[9px] text-white/60"><span>REVISION</span><span>03</span></div></div><div className="absolute bottom-0 left-0 font-mono text-[9px] tracking-widest text-white/25">INTERACTIVE MODEL / ORBIT TO INSPECT</div></div>
      </div>
    </section>

    <div className="border-b border-white/10 bg-[#111516] py-4"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-6 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 lg:justify-between lg:px-10">{['01 / CAD DESIGN', '02 / ENGINEERING DRAWINGS', '03 / MACHINING', '04 / PROTOTYPING', '05 / REVERSE ENGINEERING'].map(x => <span key={x}>{x}</span>)}</div></div>

    <section id="capabilities" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"><div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]"><div><Label>01 / Core capabilities</Label><h2 className="mt-5 max-w-md text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl">From concept to manufacturable reality<span className="text-cyan-300">.</span></h2><p className="mt-7 max-w-sm text-sm leading-6 text-white/45">DDL brings together engineering design, technical documentation, machining, rapid prototyping and reverse engineering to transform concepts and physical components into practical solutions.</p></div><div className="grid gap-0 border-t border-white/15">{services.map((s, i) => <motion.a href={`/services/${s.slug}`} key={s.no} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="group grid gap-5 border-b border-white/15 py-8 transition-colors hover:bg-white/[0.025] sm:grid-cols-[70px_1fr_auto] sm:items-start"><span className="font-mono text-xs text-cyan-300">{s.no}</span><div><h3 className="text-2xl tracking-tight">{s.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/45">{s.text}</p><div className="mt-4 flex flex-wrap gap-2">{s.tags.map(t => <span key={t} className="border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/45">{t}</span>)}</div></div><ChevronRight className="hidden size-5 text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300 sm:block" /></motion.a>)}</div></div></section>

    <section className="border-y border-white/10 bg-[#111516]"><div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_.95fr]"><div className="min-h-[460px] border-b border-white/10 lg:border-b-0 lg:border-r"><EngineeringModel wire={wire} exploded={exploded} dimensions={dimensions} light={isLight} /></div><div className="p-8 sm:p-14"><Label>02 / Interactive CAD viewer</Label><h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">Explore the engineering<span className="text-cyan-300">.</span></h2><p className="mt-5 max-w-sm text-sm leading-6 text-white/45">Inspect a procedural mechanical component. Orbit, zoom and switch between solid and wireframe views to see the structure behind the surface.</p><div className="mt-10 grid grid-cols-2 gap-2"><button onClick={() => setWire(false)} className={`border px-3 py-3 text-left font-mono text-[10px] uppercase tracking-widest ${!wire ? 'border-cyan-300 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-white/45'}`}>Solid view</button><button onClick={() => setWire(true)} className={`border px-3 py-3 text-left font-mono text-[10px] uppercase tracking-widest ${wire ? 'border-cyan-300 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-white/45'}`}>Wireframe</button><button onClick={() => setExploded(!exploded)} className="border border-white/10 px-3 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-white/45 hover:border-cyan-300/60">{exploded ? 'Collapse' : 'Explode'} assembly</button><button type="button" onClick={() => setDimensions(!dimensions)} aria-pressed={dimensions} className={`flex items-center gap-2 border px-3 py-3 text-left font-mono text-[10px] uppercase tracking-widest transition ${dimensions ? 'border-cyan-300 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-white/35 hover:border-cyan-300/60 hover:text-white/70'}`}><ScanLine className="size-3" /> {dimensions ? 'Hide dimensions' : 'Dimensions'}</button></div><div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest"><div><span className="text-white/30">Geometry</span><br /><span className="mt-2 inline-block text-cyan-200">Solid / Mesh</span></div><div><span className="text-white/30">Revision</span><br /><span className="mt-2 inline-block text-white/75">03</span></div></div></div></div></section>

    <section id="process" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"><div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 sm:flex-row sm:items-end"><div><Label>03 / Process intelligence</Label><h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em]">Physical part.<br /><span className="text-white/35">Digital intelligence.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/45">Transform existing physical components into digital engineering models and updated designs.</p></div><div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{['Physical component', '3D scan', 'Point cloud', 'Mesh', 'CAD model'].map((x, i) => <div key={x} className="relative overflow-hidden border border-white/10 bg-[#111516] p-5"><span className="font-mono text-[10px] text-cyan-300">0{i + 1} / STEP</span><div className="relative my-8 flex h-24 items-center justify-center"><div className={`process-visual process-${i} ${i === 1 ? 'animate-pulse' : ''}`} aria-hidden="true">{i === 2 && Array.from({ length: 18 }).map((_, n) => <i key={n} style={{ transform: `rotate(${n * 20}deg) translateY(-26px)` }} />)}</div><span className="absolute bottom-0 right-0 font-mono text-[8px] text-white/25">X / Y / Z</span></div><p className="font-mono text-[10px] uppercase tracking-widest text-white/65">{x}</p>{i < 4 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden size-5 bg-[#090b0c] text-cyan-300 lg:block" />}</div>)}</div></section>

    <section className="border-y border-white/10 bg-[#111516]"><div className="mx-auto grid max-w-7xl lg:grid-cols-[.8fr_1.2fr]"><div className="border-b border-white/10 p-8 sm:p-14 lg:border-b-0 lg:border-r"><Label>04 / Manufacturing intelligence</Label><h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em]">Precision in motion<span className="text-cyan-300">.</span></h2><p className="mt-5 text-sm leading-6 text-white/45">A closer look at the processes that move engineering designs toward physical production.</p><div className="mt-10 flex flex-wrap gap-2">{['Milling', 'Turning', 'Drilling', 'Grinding'].map(x => <button key={x} onClick={() => setProcess(x)} className={`px-3 py-2 font-mono text-[10px] uppercase tracking-widest ${process === x ? 'bg-cyan-300 text-black' : 'border border-white/15 text-white/45'}`}>{x}</button>)}</div></div><div className="relative min-h-[420px] p-8 sm:p-14"><TechnicalGrid /><div className="relative flex h-full flex-col justify-between"><div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/30"><span>PROCESS / {process}</span><span>LIVE SIMULATION</span></div><div className="relative mx-auto flex size-56 items-center justify-center rounded-full border border-cyan-300/30"><div className="absolute size-40 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-white/25" /><div className={`machine-part machine-${process.toLowerCase()} size-28 rounded-full bg-gradient-to-br from-[#afbec7] to-[#313b42] shadow-[0_0_70px_rgba(82,215,255,.22)]`} /><div className="absolute -right-12 top-1/2 h-px w-12 bg-cyan-300/50" /><div className="absolute -right-16 top-[calc(50%-10px)] font-mono text-[8px] text-cyan-200">TOOLPATH</div></div><div className="grid grid-cols-3 gap-3 font-mono text-[9px] uppercase tracking-widest text-white/35"><span>Toolpath<br /><b className="text-cyan-200">ACTIVE</b></span><span>Material<br /><b className="text-white/70">REMOVAL</b></span><span>Mode<br /><b className="text-white/70">{process}</b></span></div></div></div></div></section>

    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"><div className="grid gap-16 lg:grid-cols-[.75fr_1.25fr]"><div><Label>05 / Rapid prototyping</Label><h2 className="mt-5 text-5xl font-semibold leading-[.95] tracking-[-0.06em]">Prototype faster.<br /><span className="text-white/35">Validate earlier.</span></h2><p className="mt-7 max-w-sm text-sm leading-6 text-white/45">Functional 3D printing for faster design iteration and physical validation. Choose a process to explore the workflow.</p></div><div><div className="flex border-b border-white/15">{['FDM', 'SLA', 'SLS'].map(x => <button key={x} onClick={() => setPrint(x)} className={`flex-1 border-b-2 py-4 font-mono text-xs tracking-widest ${print === x ? 'border-cyan-300 text-cyan-200' : 'border-transparent text-white/35'}`}>{x}</button>)}</div><div className="mt-8 grid gap-8 sm:grid-cols-[1fr_.8fr]"><div className="relative flex min-h-[300px] items-end justify-center overflow-hidden border border-white/10 bg-[#111516] pb-12"><TechnicalGrid /><div className="print-build relative h-40 w-44 border-x border-b border-cyan-300/60 bg-cyan-300/10"><div className="print-head absolute -top-20 left-1/2 h-20 w-px bg-cyan-300"><div className="absolute -left-2 top-0 size-4 rounded-full border-2 border-cyan-300 bg-[#111516]" /></div>{Array.from({ length: 10 }).map((_, i) => <div key={i} className="print-layer absolute inset-x-3 h-px bg-cyan-300/60" style={{ bottom: `${10 + i * 10}px`, opacity: .25 + i * .06 }} />)}</div><span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/30">LAYER 050 / BUILD SIMULATION</span></div><div><h3 className="text-2xl">{print === 'FDM' ? 'Fused Deposition Modeling' : print === 'SLA' ? 'Stereolithography' : 'Selective Laser Sintering'}</h3><p className="mt-4 text-sm leading-6 text-white/45">{print === 'FDM' ? 'Functional prototypes, rapid iteration and cost-effective development.' : print === 'SLA' ? 'High-detail prototypes, smooth surface finish and complex geometries.' : 'Functional parts, complex geometries and support-minimized printing.'}</p><div className="mt-8 flex flex-col gap-3">{['Layer-by-layer construction', 'Design validation', 'Rapid iteration'].map(x => <div key={x} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-white/60"><Check className="size-3 text-cyan-300" /> {x}</div>)}</div></div></div></div></div></section>

    <section id="about" className="border-y border-white/10 bg-cyan-300 px-6 py-24 text-black lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><span className="font-mono text-[10px] uppercase tracking-[.25em]">DDL / Engineering studio</span><h2 className="mt-6 max-w-3xl text-5xl font-semibold leading-[.92] tracking-[-.07em] sm:text-7xl">The right detail changes everything<span className="text-white">.</span></h2></div><div><p className="text-sm leading-6 text-black/65">DDL helps transform engineering ideas, drawings and physical components into precise digital and manufacturable solutions.</p><a href={WA} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border border-black/30 px-5 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white">Talk to DDL <ArrowUpRight className="size-3" /></a></div></div></section>

    <section id="contact" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"><div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]"><div><Label>06 / Start a project</Label><h2 className="mt-5 text-5xl font-semibold leading-none tracking-[-.07em]">Bring your next part to life<span className="text-cyan-300">.</span></h2><p className="mt-6 text-sm leading-6 text-white/45">Share a requirement, drawing or early idea. DDL will help define the next engineering step.</p><div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 font-mono text-xs text-white/60"><a href="tel:+919380586479" className="hover:text-cyan-300">+91 93805 86479</a><a href="mailto:dilipnaga9380@gmail.com" className="hover:text-cyan-300">dilipnaga9380@gmail.com</a><a href={WA} target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-white">WhatsApp direct →</a></div></div><form onSubmit={e => { e.preventDefault(); const form = e.currentTarget; const data = new FormData(form); const message = `New DDL requirement%0A%0AName: ${encodeURIComponent(String(data.get('name') || ''))}%0AEmail: ${encodeURIComponent(String(data.get('email') || ''))}%0ARequirement: ${encodeURIComponent(String(data.get('requirement') || ''))}`; window.open(`${WA}?text=${message}`, '_blank', 'noopener,noreferrer'); setSent(true) }} className="grid gap-5 border border-white/10 bg-[#111516] p-7 sm:p-10"><div className="grid gap-5 sm:grid-cols-2"><label className="font-mono text-[10px] uppercase tracking-widest text-white/45">Name<input name="name" required className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 font-sans text-sm outline-none focus:border-cyan-300" /></label><label className="font-mono text-[10px] uppercase tracking-widest text-white/45">Email<input name="email" type="email" required className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 font-sans text-sm outline-none focus:border-cyan-300" /></label></div><label className="font-mono text-[10px] uppercase tracking-widest text-white/45">How can DDL help?<textarea name="requirement" required rows={5} className="mt-3 w-full resize-none border-b border-white/20 bg-transparent pb-3 font-sans text-sm outline-none focus:border-cyan-300" /></label><label className="flex cursor-pointer items-center gap-3 border border-dashed border-white/15 p-4 font-mono text-[10px] uppercase tracking-widest text-white/35"><Plus className="size-4" /> Add drawings or CAD files<input type="file" className="sr-only" /></label><button className="mt-3 flex items-center justify-center gap-2 bg-cyan-300 px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-black hover:bg-white">{sent ? 'Requirement received' : 'Send requirement'} {sent ? <Check className="size-4" /> : <Send className="size-3" />}</button></form></div></section>

    <footer className="border-t border-white/10 px-6 py-8 pb-28 lg:px-10 lg:pb-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><div className="text-xl font-bold tracking-[-.1em]">DDL<span className="text-cyan-300">.</span></div><p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/30">Engineering ideas into reality.</p></div><div className="font-mono text-[9px] uppercase tracking-widest text-white/30">© {new Date().getFullYear()} DDL / All rights reserved</div></div></footer><div className="mobile-contact-bar" aria-label="Quick contact"><a href="tel:+919380586479" aria-label="Call DDL">Call</a><a href={WA} target="_blank" rel="noreferrer" aria-label="Chat with DDL on WhatsApp">WhatsApp</a><a href="#contact" aria-label="Start a project">Start project</a></div><a href={WA} target="_blank" rel="noreferrer" aria-label="Chat with DDL on WhatsApp" className="fixed bottom-24 right-4 z-40 flex size-14 items-center justify-center rounded-full border border-cyan-200/70 bg-cyan-300 text-black shadow-[0_0_32px_rgba(103,232,249,.35)] transition hover:scale-105 hover:bg-white lg:bottom-6 lg:right-6"><Zap className="size-5" /></a>
  </main>
}

export default EngineeringSite

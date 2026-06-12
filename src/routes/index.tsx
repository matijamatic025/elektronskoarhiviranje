import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import coloredLogo from "@/assets/colored-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elektronsko Arhiviranje — Profesionalna Digitalizacija Dokumenata | MeriDocs" },
      {
        name: "description",
        content:
          "Profesionalna usluga elektronskog arhiviranja i digitalizacije dokumenata. Usklađeno sa zakonima Republike Srbije i GDPR. Zatražite besplatnu ponudu.",
      },
      { property: "og:title", content: "Elektronsko Arhiviranje — Profesionalna Digitalizacija Dokumenata" },
      {
        property: "og:description",
        content: "Skeniranje, indeksiranje i DMS implementacija za preduzeća, javnu upravu i računovodstvene agencije.",
      },
      { property: "og:url", content: "https://elektronskoarhiviranje.rs" },
    ],
  }),
  component: ElektronskoArhiviranje,
});

/* ---------- Motion helpers ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Atoms ---------- */

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur ${
        light ? "border-white/20 bg-white/5 text-white/90" : "border-primary/20 bg-primary/5 text-primary"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
      {children}
    </span>
  );
}

/* ---------- Icons ---------- */

const Icon = {
  Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  Bolt: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
  Scale: <path d="M12 3v18M5 21h14M6 8l-3 7h6L6 8zm12 0l-3 7h6l-3-7z" />,
  Scan: <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10" />,
  Tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <circle cx="7" cy="7" r="1.5" />
    </>
  ),
  Layers: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  Users: (
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  ),
  Building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </>
  ),
  Calculator: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8" />
    </>
  ),
  Globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
    </>
  ),
  Lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </>
  ),
  Check: <path d="M20 6L9 17l-5-5" />,
  Doc: (
    <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </>
  ),
  Search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  Cloud: <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />,
  Phone: (
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  ),
  Mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  Building2: (
    <>
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z" />
      <path d="M6 12H4a2 2 0 00-2 2v8h4M18 9h2a2 2 0 012 2v11h-4M10 6h4M10 10h4M10 14h4M10 18h4" />
    </>
  ),
};

function IconBox({
  children,
  size = 22,
  className = "",
  strokeWidth = 2,
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

/* ---------- Page ---------- */

function ElektronskoArhiviranje() {
  return (
    <main className="bg-background text-foreground">
      <StickyNav />
      <Hero />
      <LogoBand />
      <WhyUs />
      <ServiceSplit />
      <AudienceTabs />
      <BenefitsZigzag />
      <ProcessTimeline />
      <PricingCallout />
      <FaqSection />
      <ContactForm />
      <Footer />
    </main>
  );
}

/* ---------- Sticky nav ---------- */

function StickyNav() {
  const links = [
    { href: "#zasto", label: "O NAMA" },
    { href: "#usluga", label: "USLUGA" },
    { href: "#klijenti", label: "KLIJENTI" },
    { href: "#proces", label: "PROCES" },
    { href: "#cena", label: "CENA" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center gap-2 text-sm font-semibold text-primary-deep">
          <img src={coloredLogo.url} alt="Meridocs" style={{ height: 32, width: "auto" }} />
          Meridocs
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium text-primary-deep transition-colors hover:opacity-70"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#kontakt"
          className="rounded-lg border border-white bg-primary px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Besplatna ponuda
        </a>
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const reduce = useReducedMotion();

  return (
    <header ref={ref} className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "var(--gradient-primary)", opacity: 0.5, y: reduce ? 0 : y2 }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{ background: "oklch(0.55 0.18 255 / 0.4)", y: reduce ? 0 : y1 }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-32">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <SectionLabel light>USLUGA ELEKTRONSKOG ARHIVIRANJA</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Elektronsko Arhiviranje —{" "}
            <span
              style={{
                background: "linear-gradient(120deg, oklch(0.85 0.12 255), oklch(0.95 0.04 250))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Zakonska Obaveza
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Pouzdano upravljanje dokumentarnim materijalom i arhivskom građom u elektronskom obliku — u skladu sa važećim zakonima i uredbama Republike Srbije, uz podršku Meridocs tima
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary-deep shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              Zatražite besplatnu ponudu
            </a>
            <a
              href="#proces"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Saznajte kako radimo →
            </a>
          </motion.div>
          <motion.dl variants={fadeUp} className="mt-12 flex flex-wrap items-start justify-start gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            {[
              ["Iskustvo", "7+ godina"],
              ["Zadovoljnih klijenata", "250+"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] uppercase tracking-wider text-white/60 whitespace-nowrap">{k}</dt>
                <dd className="mt-1 text-2xl font-bold text-white">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <HeroVisual />
      </div>
    </header>
  );
}

function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative hidden h-[460px] lg:block">
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-10 top-6 h-[320px] w-[230px] rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl"
      >
        <div className="h-2 w-1/2 rounded bg-white/30" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded bg-white/15" style={{ width: `${60 + ((i * 7) % 35)}%` }} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-32 top-16 h-[320px] w-[230px] rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded bg-white/40" />
          <div className="h-5 w-5 rounded bg-primary-glow/60" />
        </div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded bg-white/25" style={{ width: `${55 + ((i * 11) % 40)}%` }} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-4 top-24 h-[340px] w-[260px] rounded-2xl border border-white/30 bg-white p-6 text-primary-deep shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <IconBox size={16}>{Icon.Doc}</IconBox>
            </span>
            <span className="text-xs font-semibold">Faktura_2024_001.pdf</span>
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            ARHIVIRANO
          </span>
        </div>
        <div className="mt-5 space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded bg-muted-foreground/20"
              style={{ width: `${50 + ((i * 13) % 45)}%` }}
            />
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">STATUS ARHIVIRANJA</div>
          <div className="mt-1 flex items-center gap-2">
            <IconBox size={14} className="text-primary">
              {Icon.Check}
            </IconBox>
            <span className="text-xs font-medium">Datum arhiviranja: 15.01.2024</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Arhivirano · Meridocs sistem
        </div>
      </motion.div>

      {!reduce && (
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-44 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-glow/30 text-primary-glow">
            <IconBox size={12} strokeWidth={2.5}>
              {Icon.Lock}
            </IconBox>
          </span>
          AES-256 enkripcija
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Logo / trust band ---------- */

function LogoBand() {
  const items = [
    "Uredba o tehničko-tehnološkim zahtevima za čuvanje arhivske građe",
    "Zakon o arhivskoj građi i delatnosti",
    "Zakon o elektronskom dokumentu",
    "Zakon o računovodstvu",
    "Zakon o PDV-u",
    "Zakon o zaštiti podataka o ličnosti",
  ];
  return (
    <div className="bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Usklađeno sa:
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <IconBox size={18} className="shrink-0 text-primary">{Icon.Check}</IconBox>
              <span className="text-sm font-medium leading-snug text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- WHY US ---------- */

function WhyUs() {
  return (
    <section id="zasto" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <SectionLabel>O NAMA</SectionLabel>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Zašto izabrati naše usluge elektronskog arhiviranja?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Spajamo dugogodišnje iskustvo sa savremenim alatima i strogim bezbednosnim standardima.
        </p>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mt-14 grid gap-5 md:grid-cols-3 md:grid-rows-2"
      >
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl p-8 text-white md:col-span-2 md:row-span-2"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div aria-hidden className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
              <IconBox>{Icon.Users}</IconBox>
            </span>
            <h3 className="mt-6 text-2xl font-bold leading-tight md:text-3xl">
              Iskustvo i stručnost u upravljanju dokumentacijom
            </h3>
            <p className="mt-4 max-w-md text-white/80">
              Tim Meridocs ima višegodišnje iskustvo u radu i upravljanju složenim arhivama svih veličina, od malih preduzeća do nacionalnih institucija u elektronskom i papirnom obliku.
            </p>
            <blockquote className="mt-10 max-w-md border-l-2 border-white/40 pl-4 text-sm italic text-white/75">
              „Elektronsko arhiviranje više nije opcija — od 2024. godine je zakonska obaveza svakog privrednog subjekta u Srbiji."
            </blockquote>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-10 text-xs text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <IconBox size={14}>{Icon.Lock}</IconBox>
                Bezbedno čuvanje
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconBox size={14}>{Icon.Check}</IconBox>
                Zakonska usklađenost
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconBox size={14}>{Icon.Bolt}</IconBox>
                Brza implementacija
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
        >
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <IconBox>{Icon.Bolt}</IconBox>
          </span>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Stručno upravljanje dokumentarnim materijalom</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Tim Meridocs preuzima kompletan proces — od uspostavljanja i konfiguracije sistema do svakodnevnog upravljanja pouzdanim elektronskim čuvanjem vaše dokumentacije.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
        >
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <IconBox>{Icon.Scale}</IconBox>
          </span>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Usklađenost sa propisima Srbije</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Poslovi elektronskog arhiviranja dokumentarnog materijala i arhivske građe u skladu sa svim odredbama važećih zakona.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- SERVICE SPLIT ---------- */

function ServiceSplit() {
  const items = [
    {
      icon: Icon.Layers,
      title: "Integracija sistema za operativno elektronsko arhiviranje i evidentiranje dokumentacije",
      desc: "Postavljamo i konfigurišemo softversko rešenje koje omogućava svakodnevno evidentiranje, čuvanje i pretraživanje dokumentarnog materijala nastalog u elektronskom obliku.",
    },
    {
      icon: Icon.Tag,
      title: "Obrada i evidentiranje dokumentacije u elektronskim knjigama dokumenata",
      desc: "Sistematska obrada, klasifikacija i evidentiranje dokumentacije u elektronskim knjigama dokumenata — vaša celokupna arhiva dostupna i pretraživa za par sekundi.",
    },
    {
      icon: Icon.Globe,
      title: "Povezivanje sa ostalim sistemima i državnim portalima",
      desc: "Integracija sa državnim portalima, bankarskim sistemima i knjigovodstvenim programima — sve na jednom mestu.",
    },
  ];

  return (
    <section id="usluga" className="border-y border-border" style={{ background: "var(--gradient-subtle)" }}>
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:py-32 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <SectionLabel>Naša usluga</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Šta uključuje usluga elektronskog arhiviranja?
            </h2>
            <p className="mt-4 text-muted-foreground">
              U skladu sa zakonskom obavezom, od uspostavljanja sistema do klasifikacije i indeksiranja — Meridocs preuzima kompletan proces elektronskog arhiviranja vaše firme, stručno, sigurno i u potpunoj usklađenosti sa važećim propisima.
            </p>
          </Reveal>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative space-y-4"
        >
          {items.map((it, i) => (
            <motion.li
              key={it.title}
              variants={fadeUp}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex flex-col items-center">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <IconBox>{it.icon}</IconBox>
                </span>
                <span className="mt-2 text-[10px] font-mono font-semibold text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
              <IconBox
                size={18}
                className="hidden self-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary md:block"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </IconBox>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ---------- AUDIENCE TABS ---------- */

function AudienceTabs() {
  const tabs = [
    {
      id: "preduzeca",
      title: "Preduzeća i kompanije",
      heading: "Elektronsko arhiviranje za preduzeća i kompanije",
      desc: "Preduzeća su u zakonskoj obavezi da čuvaju dokumentarni materijal nastao izvorno u elektronskom obliku. Meridocs implementira i vodi sistem pouzdanog elektronskog arhiviranja u skladu sa važećim pozitivnim propisima.",
      bullets: ["Centralizovana arhiva svih ogranaka", "Upravljanje privilegijama nad dokumentima", "Integracija sa ostalim poslovnim sistemima", "Jednostavno upravljanje svim dokumentima"],
      icon: Icon.Building,
    },
    {
      id: "javna",
      title: "Javna preduzeća i institucije",
      heading: "Elektronsko arhiviranje za javna preduzeća i institucije",
      desc: "Javni sektor podleže posebnim zakonskim obavezama u oblasti elektronskog arhiviranja. Meridocs uspostavlja sistem koji osigurava usklađenost sa svim propisima i omogućava bezbedan pristup dokumentaciji.",
      bullets: ["Usklađenost sa propisima javnog sektora", "Pouzdano elektronsko čuvanje dokumentarnog materijala", "Kontrolisan pristup dokumentaciji", "Zakonski rokovi čuvanja arhivske građe"],
      icon: Icon.Scale,
    },
    {
      id: "racun",
      title: "Računovodstvene agencije",
      heading: "Elektronsko arhiviranje za računovodstvene agencije",
      desc: "Meridocs omogućava računovodstvenim agencijama i njihovim klijentima zajednički pristup dokumentaciji na jednom mestu — sve fakture, ugovori i poslovni dokumenti organizovani, dostupni i spremni za dalje računovodstvene obrade.",
      bullets: ["Zajednički pristup dokumentaciji agencije i klijenata", "Sva dokumentacija na jednom mestu", "Brza pretraga i pregled dokumenata", "Automatska klasifikacija po klijentu"],
      icon: Icon.Calculator,
    },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="klijenti" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <SectionLabel>Klijenti</SectionLabel>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Za koga je namenjena ova usluga?</h2>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-[280px_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition-all ${
                  isActive
                    ? "border-primary/40 bg-card text-foreground shadow-[var(--shadow-soft)]"
                    : "border-border bg-card/50 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="audience-indicator"
                    className="absolute inset-y-2 left-0 w-1 rounded-r-full"
                    style={{ background: "var(--gradient-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isActive ? "text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                  style={isActive ? { background: "var(--gradient-primary)" } : undefined}
                >
                  <IconBox size={18}>{t.icon}</IconBox>
                </span>
                {t.title}
              </button>
            );
          })}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10"
        >
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{current.heading}</h3>
            <p className="mt-4 max-w-xl text-muted-foreground">{current.desc}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {current.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3 text-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconBox size={14} strokeWidth={2.5}>
                      {Icon.Check}
                    </IconBox>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- BENEFITS ZIGZAG ---------- */

function BenefitsZigzag() {
  const items = [
    {
      icon: Icon.Globe,
      title: "Trenutni pristup dokumentima sa bilo kog mesta",
      desc: "Sigurna pretraga i pregled dokumenata 24/7, sa bilo kog uređaja. Pronađite bilo koji dokument za par sekundi.",
      stat: "<3s",
      label: "prosečno vreme pretrage",
    },
    {
      icon: Icon.Lock,
      title: "Zaštita od gubitka, oštećenja i neovlašćenog pristupa",
      desc: "Redovni backup, precizne dozvole pristupa i revizioni tragovi koji osiguravaju integritet i bezbednost vaše dokumentacije.",
      stat: "99.99%",
      label: "dostupnost sistema",
    },
  ];

  return (
    <section
      className="relative overflow-hidden border-y border-primary-deep/40"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <SectionLabel light>Vrednost za vas</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Prednosti elektronskog arhiviranja za vaše poslovanje
          </h2>
        </Reveal>

        <div className="mt-16 space-y-12 md:space-y-20">
          {items.map((b, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="text-white">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-primary-glow backdrop-blur">
                    <IconBox>{b.icon}</IconBox>
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{b.title}</h3>
                  <p className="mt-4 max-w-md text-white/75">{b.desc}</p>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-10 backdrop-blur-xl"
                >
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary-glow/20 blur-3xl"
                  />
                  <div className="relative">
                    <div
                      className="text-6xl font-bold leading-none md:text-7xl"
                      style={{
                        background: "linear-gradient(120deg, oklch(0.95 0.04 250), oklch(0.75 0.18 255))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {b.stat}
                    </div>
                    <div className="mt-3 text-sm uppercase tracking-widest text-white/60">{b.label}</div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS TIMELINE ---------- */

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      n: "01",
      t: "Besplatna analiza i konsultacija",
      d: "Razgovaramo o operativnim potrebama i ciljevima saradnje i dostavljamo transparentnu ponudu.",
    },
    {
      n: "02",
      t: "Uspostavljanje sistema za elektronsko čuvanje",
      d: "Implementiramo softversko rešenje i umrežavamo ga sa državnim portalima i drugim poslovnim sistemima.",
    },
    {
      n: "03",
      t: "Proces elektronskog arhiviranja",
      d: "Otvaranje elektronskih knjiga dokumenata, klasifikacija i evidentiranje sa pratećim zakonom propisanim elementima.",
    },
    {
      n: "04",
      t: "Podrška i održavanje",
      d: "Pružamo kontinuiranu operativnu i tehničku podršku sa konstantnim unapređivanjem procesa.",
    },
    {
      n: "05",
      t: "Upravljanje odgovornostima",
      d: "Preuzimamo odgovornost za redovno održavanje, ažuriranje i usklađenost sistema sa važećim propisima.",
    },
  ];

  return (
    <section id="proces" ref={ref} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <SectionLabel>Proces</SectionLabel>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Kako izgleda proces saradnje?</h2>
      </Reveal>

      <div className="relative mt-16">
        <div className="absolute left-5 top-0 h-full w-px bg-border md:hidden" />
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="absolute left-5 top-0 h-full w-px md:hidden"
          aria-hidden
        >
          <div className="h-full w-full" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-5"
        >
          {steps.map((s) => (
            <motion.li key={s.n} variants={fadeUp} className="relative pl-14 md:pl-0">
              <span
                className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white md:hidden"
                style={{ background: "var(--gradient-primary)" }}
              >
                {s.n}
              </span>
              <div className="relative h-full rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]">
                <div className="hidden md:block">
                  <span
                    className="text-3xl font-bold leading-none"
                    style={{
                      background: "var(--gradient-primary)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */

function PricingCallout() {
  return (
    <section id="cena" className="border-y border-border" style={{ background: "var(--gradient-subtle)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <Reveal>
          <SectionLabel>Cena</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Cena usluge elektronskog arhiviranja</h2>
          <h3 className="mt-8 text-lg font-semibold">Šta utiče na cenu elektronskog arhiviranja?</h3>
          <p className="mt-2 text-muted-foreground">
            Obim dokumentarnog materijala, kompleksnost klasifikacije, broj korisnika sistema i nivo podrške.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Obim dokumentarnog materijala",
              "Broj korisnika i pristupnih nivoa",
              "Kompleksnost indeksiranja i metapodataka",
              "Nivo tehničke podrške",
            ].map((i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IconBox size={14} strokeWidth={3}>
                    {Icon.Check}
                  </IconBox>
                </span>
                {i}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-3xl p-10 text-white shadow-[var(--shadow-elegant)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div aria-hidden className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <h3 className="text-2xl font-bold">Zatražite besplatnu ponudu</h3>
            <p className="mt-3 text-white/80">
              Pošaljite nam osnovne informacije i u roku od 24h dobijate jasnu, detaljnu i transparentnu ponudu
              prilagođenu Vašoj firmi.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/90">
              {["Odgovor u roku od 24h", "Personalizovana procena"].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-primary-glow">●</span> {i}
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-deep transition-transform hover:-translate-y-0.5"
            >
              Pošaljite upit →
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FaqSection() {
  const faqs = [
    {
      q: "Da li je elektronsko arhiviranje zakonska obaveza u Srbiji?",
      a: "Da. Na snazi je Uredba o jedinstvenim tehničko-tehnološkim zahtevima i procedurama za čuvanje i zaštitu arhivske građe i dokumentarnog materijala u elektronskom obliku (\"Sl. glasnik RS\", br. 107/2021, 94/2022 i 116/2023) koja obavezuje sve stvaraoce i imaoce dokumentarnog materijala da osiguraju pouzdano elektronsko čuvanje i upravljanje elektronskom dokumentacijom.",
    },
    {
      q: "Koji dokumentarni materijal podleže obavezi elektronskog arhiviranja?",
      a: "Sav dokumentarni materijal nastao izvorno u elektronskom obliku — ugovori, fakture, kadrovska dokumenta, poreske prijave i sva ostala poslovna dokumentacija.",
    },
    {
      q: "Šta je pouzdano elektronsko čuvanje?",
      a: "Pouzdano elektronsko čuvanje podrazumeva čuvanje dokumentarnog materijala uz osiguranje njegovog integriteta, autentičnosti, upotrebljivosti kao i sudske dokazne vrednosti kvalifikovanim elektronskim potpisom i ostalim propisanim elementima.",
    },
    {
      q: "Kako se vrši klasifikacija dokumentarnog materijala?",
      a: "Svaki dokument se evidentira u knjige elektronskih dokumenata sa svim zakonom propisanim elementima — jedinstevnom oznakom, vrstom, rokom čuvanja i statusom u skladu sa listom kategorija odobrenom od nadležnog javnog arhiva.",
    },
    {
      q: "Kako Meridocs pomaže u ispunjavanju zakonskih obaveza?",
      a: "Implementiramo sistem za pouzdano elektronsko čuvanje, vršimo indeksiranje i klasifikaciju dokumentarnog materijala i povezujemo vaš sistem sa relevantnim državnim portalima.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Često postavljana pitanja o elektronskom arhiviranju</h2>
          <p className="mt-4 text-muted-foreground">Niste pronašli odgovor? Pišite nam i odgovorićemo u najkraćem roku.</p>
          <a
            href="#kontakt"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Postavi pitanje
            <IconBox size={14} strokeWidth={2.5}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </IconBox>
          </a>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="space-y-3"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={fadeUp}
                className={`overflow-hidden rounded-2xl border bg-card transition-colors ${
                  isOpen ? "border-primary/30 shadow-[var(--shadow-soft)]" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <h3 className="text-base font-semibold md:text-lg">{f.q}</h3>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <IconBox size={14} strokeWidth={2.5}>
                      <path d="M12 5v14M5 12h14" />
                    </IconBox>
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CONTACT FORM (Netlify Forms) ---------- */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <section id="kontakt" className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-white shadow-[var(--shadow-elegant)] md:px-16 md:py-20"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "oklch(0.55 0.18 255 / 0.5)" }}
          />

          <div className="relative grid gap-12 md:grid-cols-2 md:items-start">
            {/* Left: info */}
            <div>
              <SectionLabel light>Kontakt</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Pokrenite elektronsko arhiviranje danas
              </h2>
              <p className="mt-5 text-white/75">
                Zakažite besplatnu konsultaciju i saznajte kako možemo da uspostavimo sistem pouzdanog elektronskog
                arhiviranja i evidentiranja poslovne dokumentacije za vašu firmu.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:info@meridocs.net"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <IconBox size={16}>{Icon.Mail}</IconBox>
                  </span>
                  info@meridocs.net
                </a>
                <a
                  href="tel:+381605121415"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <IconBox size={16}>{Icon.Phone}</IconBox>
                  </span>
                  +381 60 5121 415
                </a>
                <a
                  href="tel:+381648261156"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <IconBox size={16}>{Icon.Phone}</IconBox>
                  </span>
                  +381 64 826 1156
                </a>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <IconBox size={16}>{Icon.Building2}</IconBox>
                  </span>
                  Meridocs, Srbija
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <IconBox size={32} strokeWidth={2}>
                      {Icon.Check}
                    </IconBox>
                  </span>
                  <h3 className="mt-5 text-xl font-bold">Upit je poslat!</h3>
                  <p className="mt-2 text-white/70">Javićemo vam se u roku od 24h.</p>
                </motion.div>
              ) : (
                <form
                  name="kontakt"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="kontakt" />
                  <input type="hidden" name="bot-field" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                        Ime i prezime *
                      </label>
                      <input
                        type="text"
                        name="ime"
                        required
                        placeholder="Petar Petrović"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                        Firma
                      </label>
                      <input
                        type="text"
                        name="firma"
                        placeholder="Naziv firme d.o.o."
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Email adresa *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="petar@firma.rs"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="telefon"
                      placeholder="+381 60 000 0000"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/15"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Poruka *
                    </label>
                    <textarea
                      name="poruka"
                      required
                      rows={4}
                      placeholder=""
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/15 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary-deep shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Slanje..." : "Pošaljite upit →"}
                  </button>
                  
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary-deep">
            <img src={coloredLogo.url} alt="Meridocs" style={{ height: 32, width: "auto" }} />
            <span className="text-primary-deep">elektronskoarhiviranje.rs</span>
            <span className="ml-2 text-xs font-normal text-primary-deep">— usluga Meridocs</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-primary-deep">
            <span>© {new Date().getFullYear()} Meridocs</span>
            <a href="#kontakt" className="text-primary-deep transition-colors hover:opacity-70">
              Kontakt
            </a>
            <a href="#faq" className="text-primary-deep transition-colors hover:opacity-70">
              FAQ
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-primary-deep">
          <p>
            Sva prava su zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
}

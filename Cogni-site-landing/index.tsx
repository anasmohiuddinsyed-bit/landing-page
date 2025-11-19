// src/pages/Index.tsx

import { useState } from "react";
import { Upload, Globe2, PhoneCall } from "lucide-react";

type Region = "US" | "UAE";

const pricingByRegion: Record<
  Region,
  {
    label: string;
    currency: string;
    plans: {
      name: string;
      price: string;
      sub: string;
      badge?: string;
      features: string[];
    }[];
  }
> = {
  US: {
    label: "United States",
    currency: "USD",
    plans: [
      {
        name: "Starter",
        price: "$199/mo",
        sub: "For single-location operators",
        features: [
          "Up to 30K transactions / month",
          "1 data source (Stripe, Square, or CSV)",
          "AI leak & fee audit, monthly",
          "Email report + CSV export",
        ],
      },
      {
        name: "Growth",
        price: "$499/mo",
        sub: "For multi-location groups",
        badge: "Most popular",
        features: [
          "Up to 150K transactions / month",
          "3 data sources (POS, payments, accounting)",
          "Weekly AI audit + anomaly watchlist",
          "Slack / Teams alerts + PDF brief",
          "Priority support + onboarding",
        ],
      },
      {
        name: "Enterprise",
        price: "Let’s talk",
        sub: "For franchises & groups",
        features: [
          "Unlimited locations & transaction volume",
          "Custom connectors (ERP, data warehouse)",
          "Dedicated analyst + compliance review",
          "SOC / ISO-ready data flows",
        ],
      },
    ],
  },
  UAE: {
    label: "United Arab Emirates",
    currency: "AED",
    plans: [
      {
        name: "Starter",
        price: "AED 750/mo",
        sub: "For 1–2 outlets",
        features: [
          "Up to 100K AED volume / month",
          "1 data source (bank, POS, or CSV)",
          "Monthly AI fee & leak audit",
          "WhatsApp + email report",
        ],
      },
      {
        name: "Growth",
        price: "AED 1,850/mo",
        sub: "For growing groups",
        badge: "Most popular",
        features: [
          "Up to 600K AED volume / month",
          "3+ data sources (bank, POS, accounting)",
          "Weekly AI audit + anomaly alerts",
          "WhatsApp + Slack delivery",
          "Local UAE support window",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        sub: "For hospitality groups & franchises",
        features: [
          "Unlimited volume & locations",
          "On-prem / VPC deployment available",
          "Custom dashboards & CFO pack",
          "Dedicated success engineer",
        ],
      },
    ],
  },
};

const Index = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>("US");
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    locations: "",
    message: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // TODO: send to backend
    }
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      alert("Upload a CSV export first.");
      return;
    }
    // TODO: replace this with real audit trigger
    alert("POSENTIA would run the AI audit here and generate a report.");
  };

  const handleDemoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDemoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend / email / HubSpot
    alert("Demo request submitted. We’ll follow up by email.");
  };

  const pricing = pricingByRegion[region];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* soft gradient background */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,hsl(158_64%_52%_/_0.18),transparent_60%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 space-y-16">
        {/* === HERO === */}
        <section className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          {/* LEFT: copy + upload */}
          <div className="z-10 flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-[10px] text-emerald-300">
                •
              </span>
              <span>POSENTIA · AI audit for operators in US & UAE</span>
            </div>

            <div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Upload your{" "}
                <span className="gradient-text font-semibold">POS CSV</span>.
                <br />
                Get an{" "}
                <span className="gradient-text font-semibold">
                  AI revenue audit
                </span>{" "}
                in minutes.
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                POSENTIA reads your transactions, fees, and anomalies like a
                full-time analyst — then tells you, in plain language, where
                money is leaking across outlets and payment providers.
              </p>
            </div>

            <form
              onSubmit={handleAuditSubmit}
              className="glass-panel shadow-card glow-primary relative mt-4 flex max-w-xl flex-col gap-4 rounded-2xl p-4 md:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    1. Upload your POS / payments CSV
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stripe · Square · Shopify POS · bank exports · custom CSV
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-2 text-xs font-medium transition-smooth hover:border-primary hover:text-primary">
                  <Upload className="h-4 w-4" />
                  <span className="max-w-[140px] truncate">
                    {fileName ?? "Choose CSV"}
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2.5 text-sm font-semibold text-background shadow-premium transition-bounce hover:scale-[1.02]"
              >
                Run a free AI audit preview
              </button>

              <p className="text-[11px] text-muted-foreground">
                No installs. No card required. We&apos;ll show you where the
                biggest leaks are before you ever pay us.
              </p>
            </form>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/70 px-3 py-1">
                Works with US & UAE merchants
              </span>
              <span className="rounded-full border border-border/70 px-3 py-1">
                Built for restaurants · retail · hospitality
              </span>
            </div>
          </div>

          {/* RIGHT: 3D robot */}
          <div className="z-10 mt-8 flex flex-1 items-center justify-center md:mt-0">
            {/* @ts-expect-error model-viewer is a web component */}
            <model-viewer
              src="/POS.glb"
              camera-controls
              autoplay
              auto-rotate
              rotation-per-second="15deg"
              exposure="1"
              shadow-intensity="1"
              camera-orbit="0deg 75deg 2.4m"
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "420px",
                borderRadius: "1.5rem",
                background:
                  "radial-gradient(circle at 20% 0%, rgba(56,189,248,0.14), transparent 60%)",
              }}
            />
          </div>
        </section>

        {/* === PRICING === */}
        <section id="pricing" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">
                Pricing for US & UAE teams
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Simple plans that match how you actually operate. Switch region
                to see local pricing.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-2 py-1 text-xs">
              <Globe2 className="h-4 w-4 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setRegion("US")}
                className={`rounded-full px-3 py-1 ${
                  region === "US"
                    ? "bg-primary text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                US
              </button>
              <button
                type="button"
                onClick={() => setRegion("UAE")}
                className={`rounded-full px-3 py-1 ${
                  region === "UAE"
                    ? "bg-primary text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                UAE
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pricing.plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-panel flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 p-4 shadow-card ${
                  plan.badge ? "ring-1 ring-emerald-400/50" : ""
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {plan.sub}
                      </p>
                    </div>
                    {plan.badge && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-semibold">{plan.price}</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-1.5">
                        <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-border bg-muted/70 px-3 py-2 text-xs font-medium transition-smooth hover:border-primary hover:text-primary"
                  onClick={() => {
                    const anchor = document.getElementById("demo");
                    if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Talk to us about this plan
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* === BOOK A DEMO === */}
        <section
          id="demo"
          className="glass-panel rounded-2xl border border-border/80 bg-card/90 p-5 shadow-card"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold md:text-xl">
                Book a live POSENTIA demo
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Show us a sample export, and we&apos;ll walk you through a
                real-time AI audit for your outlets.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <PhoneCall className="h-4 w-4" />
              <span>US & UAE time zones</span>
            </div>
          </div>

          <form
            onSubmit={handleDemoSubmit}
            className="grid gap-3 md:grid-cols-2"
          >
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                name="name"
                value={demoForm.name}
                onChange={handleDemoChange}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                placeholder="Fatima, Ahmed, John..."
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground" htmlFor="email">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={demoForm.email}
                onChange={handleDemoChange}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                placeholder="ops@yourbrand.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                className="text-xs text-muted-foreground"
                htmlFor="company"
              >
                Brand / group name
              </label>
              <input
                id="company"
                name="company"
                value={demoForm.company}
                onChange={handleDemoChange}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                placeholder="e.g. Dubai Burger Co."
                required
              />
            </div>

            <div className="space-y-1">
              <label
                className="text-xs text-muted-foreground"
                htmlFor="locations"
              >
                # of locations & region
              </label>
              <input
                id="locations"
                name="locations"
                value={demoForm.locations}
                onChange={handleDemoChange}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                placeholder="4 locations · UAE + 2 in US"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label
                className="text-xs text-muted-foreground"
                htmlFor="message"
              >
                Anything specific you want us to audit?
              </label>
              <textarea
                id="message"
                name="message"
                value={demoForm.message}
                onChange={handleDemoChange}
                className="min-h-[80px] w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-smooth focus:border-primary"
                placeholder="Example: card fees on Talabat orders, POS vs bank settlements, outlet-level leakage..."
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background shadow-premium transition-bounce hover:scale-[1.02]"
              >
                Request demo
              </button>
              <p className="text-[11px] text-muted-foreground">
                We reply within one business day with a calendar link. If you
                prefer, you can plug this into Calendly / HubSpot later.
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Index;

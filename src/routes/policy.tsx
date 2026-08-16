import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import {
  ShieldCheck,
  FileText,
  Copyright,
  AlertTriangle,
  Cookie,
  Search,
  ArrowRight,
  ExternalLink,
  Mail,
  Building2,
  Phone,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

const policySearchSchema = z.object({
  tab: z.enum(["privacy", "terms", "copyright", "disclaimer", "cookies"]).catch("privacy").optional(),
});

export const Route = createFileRoute("/policy")({
  validateSearch: (search: Record<string, unknown>) => policySearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Legal, Policies & Terms — qubitedge" },
      {
        name: "description",
        content:
          "Read qubitedge's Privacy Policy, Terms & Conditions, Copyright & Intellectual Property guidelines, Disclaimers, and Cookie Policy.",
      },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "qubitedge privacy policy, terms and conditions, copyright policy, disclaimer, cookie policy, legal notice, Hyderabad, Visakhapatnam",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in/policy" },
      { property: "og:title", content: "Legal, Policies & Terms — qubitedge" },
      {
        property: "og:description",
        content:
          "Complete legal documentation including Privacy Policy, Terms & Conditions, Copyright & IP, Disclaimers, and Cookie Policy for qubitedge.",
      },
      { property: "og:image", content: "https://qubitedge.in/logo.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Legal & Policies — qubitedge" },
      {
        name: "twitter:description",
        content:
          "Official Privacy Policy, Terms & Conditions, Copyright, Disclaimers, and Cookie Policy of qubitedge.",
      },
      { name: "twitter:image", content: "https://qubitedge.in/logo.webp" },
    ],
    links: [{ rel: "canonical", href: "https://qubitedge.in/policy" }],
  }),
  component: PolicyPage,
});

type PolicyTabId = "privacy" | "terms" | "copyright" | "disclaimer" | "cookies";

interface TabConfig {
  id: PolicyTabId;
  label: string;
  shortTitle: string;
  icon: typeof ShieldCheck;
  badge: string;
  summary: string;
}

const TABS: TabConfig[] = [
  {
    id: "privacy",
    label: "Privacy Policy",
    shortTitle: "Privacy",
    icon: ShieldCheck,
    badge: "Data & Security",
    summary: "How we collect, use, and protect your direct and indirect personal information.",
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    shortTitle: "Terms",
    icon: FileText,
    badge: "Usage Rules",
    summary: "Rules, user responsibilities, service boundaries, and no-guarantee terms for our website and programs.",
  },
  {
    id: "copyright",
    label: "Copyright & Intellectual Property",
    shortTitle: "Copyright & IP",
    icon: Copyright,
    badge: "Proprietary Rights",
    summary: "Protection of qubitedge brand, website design, UI/UX, documents, and software code.",
  },
  {
    id: "disclaimer",
    label: "Disclaimer",
    shortTitle: "Disclaimer",
    icon: AlertTriangle,
    badge: "General Notice",
    summary: "Clarification on general information, career outcomes, service agreements, and third-party content.",
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    shortTitle: "Cookies",
    icon: Cookie,
    badge: "Tracking & Tech",
    summary: "Details about essential cookies, analytics, embedded media, and how to control your preferences.",
  },
];

function PolicyPage() {
  const search = Route.useSearch();
  const router = useRouter();
  const activeTab: PolicyTabId = (search?.tab as PolicyTabId) || "privacy";

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Handle hash changes on mount or update
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (["privacy", "terms", "copyright", "disclaimer", "cookies"].includes(hash)) {
        setActiveTab(hash as PolicyTabId);
      }
    }
  }, []);

  const setActiveTab = (tabId: PolicyTabId) => {
    router.navigate({
      to: "/policy",
      search: { tab: tabId },
      hash: tabId,
      replace: true,
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyLink = (tabId: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/policy?tab=${tabId}#${tabId}`;
      navigator.clipboard.writeText(url);
      setCopiedSection(tabId);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  const currentTabObj = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <main className="min-h-screen text-white pt-24 pb-20 selection:bg-[#64CEFB]/30">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#64CEFB]/30 bg-[#64CEFB]/10 px-3 py-1 text-xs font-medium text-[#64CEFB] backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Official Legal Documentation</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_25px_rgba(100,206,251,0.2)]">
                Terms, Policies & Disclaimers
              </h1>
              <p className="mt-3 text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
                Clear, transparent guidelines outlining our data practices, terms of service, intellectual property protections, and disclaimers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 rounded-lg px-3 py-2 shrink-0 self-start sm:self-auto">
              <Clock className="h-4 w-4 text-[#64CEFB]" />
              <span>Last Updated: August 2026</span>
            </div>
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#64CEFB]/20 text-[#64CEFB] border border-[#64CEFB]/40 shadow-[0_0_20px_rgba(100,206,251,0.25)]"
                      : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? "text-[#64CEFB]" : "text-white/50"}`} />
                  <span>{tab.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl shadow-xl">
              <h2 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-4">
                Policy Directory
              </h2>

              <nav className="flex flex-col space-y-2">
                {TABS.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3.5 group ${
                        isSelected
                          ? "bg-gradient-to-r from-[#64CEFB]/15 to-transparent border-[#64CEFB]/40 text-white shadow-sm"
                          : "border-white/5 hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.04] text-white/70 hover:text-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-[#64CEFB]/20 text-[#64CEFB]"
                            : "bg-white/5 text-white/40 group-hover:text-white/80 group-hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-semibold truncate">{tab.label}</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/10">
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 line-clamp-1 mt-0.5">{tab.badge}</p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact & Assistance Card */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-[#64CEFB]/5 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#64CEFB]/20 text-[#64CEFB]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Have Legal Questions?</h3>
                  <p className="text-xs text-white/50">Our compliance team is here to assist.</p>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                If you have inquiries regarding our data handling, terms, or proprietary assets, please reach out directly:
              </p>
              <div className="space-y-2 text-xs">
                <a
                  href="mailto:info@qubitedge.in"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10 text-white/80 hover:text-[#64CEFB] hover:border-[#64CEFB]/40 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#64CEFB]" />
                  <span className="truncate">info@qubitedge.in</span>
                </a>
                <a
                  href="tel:+916302829618"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10 text-white/80 hover:text-[#64CEFB] hover:border-[#64CEFB]/40 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#64CEFB]" />
                  <span>+91 6302829618</span>
                </a>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-black/40 border border-white/10 text-white/60 text-[11px] leading-relaxed">
                  <Building2 className="h-3.5 w-3.5 text-[#64CEFB] shrink-0 mt-0.5" />
                  <span>4-61-15, Galilee Enclave, Lawsons Bay Colony, Visakhapatnam, Andhra Pradesh.</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content Panel */}
          <article className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Subtle top glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#64CEFB]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#64CEFB]/15 border border-[#64CEFB]/30 text-[#64CEFB]">
                    <currentTabObj.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#64CEFB] uppercase tracking-wider">
                        {currentTabObj.badge}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {currentTabObj.label}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => handleCopyLink(activeTab)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white transition-colors"
                    title="Copy direct link to this policy section"
                  >
                    {copiedSection === activeTab ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Section Description Intro */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-8 text-sm text-white/70 leading-relaxed">
                {currentTabObj.summary}
              </div>

              {/* Content Body Based on Tab */}
              <div className="prose prose-invert max-w-none space-y-8 text-white/80 leading-relaxed text-sm sm:text-base">
                {activeTab === "privacy" && <PrivacyPolicyContent />}
                {activeTab === "terms" && <TermsAndConditionsContent />}
                {activeTab === "copyright" && <CopyrightContent />}
                {activeTab === "disclaimer" && <DisclaimerContent />}
                {activeTab === "cookies" && <CookiePolicyContent />}
              </div>

              {/* Bottom Navigation Between Policies */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-white/40">
                  Questions regarding these legal terms? Write to{" "}
                  <a href="mailto:info@qubitedge.in" className="text-[#64CEFB] hover:underline">
                    info@qubitedge.in
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/5"
                  >
                    About Us <ChevronRight className="h-3 w-3" />
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/5"
                  >
                    Home <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

/* =========================================================================
   1. PRIVACY POLICY CONTENT
========================================================================= */
function PrivacyPolicyContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          1. Overview and Scope
        </h3>
        <p>
          At <strong>qubitedge Global Services Pvt. Ltd.</strong> (“qubitedge”, “we”, “our”, or “us”), we are dedicated to respecting and protecting the privacy of everyone who visits our official website (
          <a href="https://qubitedge.in" className="text-[#64CEFB] underline">
            qubitedge.in
          </a>
          ) or interacts with our educational programs, IT consulting services, workshops, and marketing solutions.
        </p>
        <p>
          Even for a static or informational website, data processing may occur directly (when you contact us or submit an inquiry) or indirectly (via automated network logs, security protections, and embedded services). This Privacy Policy explains what information is collected, how it is handled, and how your privacy rights are safeguarded.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          2. Information We Collect
        </h3>
        <p>We process information in two primary ways:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#64CEFB]" />
              A. Information You Voluntarily Provide
            </h4>
            <p className="text-xs text-white/70">When you interact with our contact channels or forms:</p>
            <ul className="text-xs text-white/60 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-white/80">Full Name:</strong> To address you accurately.
              </li>
              <li>
                <strong className="text-white/80">Email Address:</strong> For responses, registrations, and updates.
              </li>
              <li>
                <strong className="text-white/80">Phone / WhatsApp Number:</strong> For workshop coordination or support.
              </li>
              <li>
                <strong className="text-white/80">Message & Inquiries:</strong> Any details submitted via our contact forms or direct emails.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#64CEFB]" />
              B. Indirect / Automated Technical Data
            </h4>
            <p className="text-xs text-white/70">When you access and browse the website:</p>
            <ul className="text-xs text-white/60 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-white/80">Hosting & Server Logs:</strong> IP address, browser type, operating system, and access timestamps.
              </li>
              <li>
                <strong className="text-white/80">Security & CDN Metrics:</strong> Cloudflare telemetry for DDoS protection and routing.
              </li>
              <li>
                <strong className="text-white/80">Analytics Data:</strong> Aggregated page views, referring URLs, and search trends (e.g., Google Search Console / Analytics).
              </li>
              <li>
                <strong className="text-white/80">Technical Cookies:</strong> Necessary session storage tokens for optimal layout rendering.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          3. Third-Party Services and Embedded Content
        </h3>
        <p>Our website may integrate or link to third-party services, including:</p>
        <ul className="list-disc list-inside space-y-2 text-white/70 pl-2">
          <li>
            <strong>Cloudflare & Infrastructure:</strong> To secure web traffic, mitigate automated attacks, and ensure rapid global content delivery.
          </li>
          <li>
            <strong>Embedded Media (e.g., YouTube videos):</strong> We may feature educational recordings or video demonstrations embedded via YouTube. YouTube may collect viewing diagnostics or set cookies according to Google’s privacy standards.
          </li>
          <li>
            <strong>Analytics & Search Tools:</strong> Standard aggregated traffic diagnostics (such as Google Analytics or Google Search Console) to understand user interest.
          </li>
          <li>
            <strong>Social Media Channels:</strong> Links to our verified profiles on LinkedIn, Instagram, YouTube, X (Twitter), Facebook, and GitHub. Interacting with these external platforms is governed by their respective privacy terms.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          4. How We Use Collected Information
        </h3>
        <p>Any information received by qubitedge is processed strictly for legitimate operational purposes:</p>
        <ul className="list-disc list-inside space-y-1.5 text-white/70 pl-2">
          <li>Responding to your direct questions, partnership proposals, or service inquiries.</li>
          <li>Processing registrations, schedules, and learning materials for workshops and bootcamps.</li>
          <li>Maintaining website uptime, resolving technical anomalies, and defending against cyber vulnerabilities.</li>
          <li>Complying with statutory accounting, record-keeping, and legal obligations under applicable law.</li>
        </ul>
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
          <strong>No Sale of Personal Data:</strong> qubitedge never sells, rents, leases, or monetizes user contact lists or personal data to third-party advertisers or brokers.
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          5. Data Security, Retention & Your Rights
        </h3>
        <p>
          We implement industry-standard encryption (TLS/HTTPS), firewall mechanisms, and access controls to safeguard all data transmitted to us. We retain inquiry records only as long as necessary to fulfill the requested communication or meet statutory requirements.
        </p>
        <p>
          You have the right to request access to, correction of, or deletion of your personal contact data retained by qubitedge. To exercise these rights, please email our team at{" "}
          <a href="mailto:info@qubitedge.in" className="text-[#64CEFB] underline">
            info@qubitedge.in
          </a>
          .
        </p>
      </section>
    </div>
  );
}

/* =========================================================================
   2. TERMS & CONDITIONS CONTENT
========================================================================= */
function TermsAndConditionsContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          1. Agreement to Terms
        </h3>
        <p>
          These Terms and Conditions (“Terms”) govern your access to and use of the website located at{" "}
          <a href="https://qubitedge.in" className="text-[#64CEFB] underline">
            https://qubitedge.in
          </a>
          , operated by <strong>qubitedge Global Services Pvt. Ltd.</strong> (“qubitedge”, “we”, “our”, or “us”).
        </p>
        <p>
          By accessing or using our website, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any part of these Terms, you must discontinue use of the site immediately.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          2. Website Purpose & Scope
        </h3>
        <p>The qubitedge website serves as an informational platform providing details on:</p>
        <ul className="list-disc list-inside space-y-1.5 text-white/70 pl-2">
          <li>Our company mission, leadership, and operational ecosystem.</li>
          <li>Skill-development workshops, technical bootcamps, and educational initiatives in IT, AI, and Quantum computing.</li>
          <li>Internship learning tracks and student empowerment programs.</li>
          <li>Enterprise IT, marketing, and business strategy solutions.</li>
          <li>Company news, insights, announcements, and contact channels.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          3. Content Accuracy and Program Changes
        </h3>
        <p>
          While qubitedge takes reasonable care to keep the information on this website accurate, current, and reliable, all materials are provided for general informational guidance only.
        </p>
        <p>
          Program dates, syllabus topics, workshop fees, eligibility criteria, schedules, speaker rosters, technical services, and feature availability are subject to change or cancellation at any time without prior notice.
        </p>
      </section>

      {/* NO GUARANTEE CALLOUT */}
      <section className="space-y-3">
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
          <h4 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            4. Explicit No-Guarantee Clause
          </h4>
          <p className="text-sm leading-relaxed text-amber-100/90 mb-2">
            Information regarding workshops, internships, bootcamps, training modules, and career opportunities provided on this website or in promotional communications <strong>does not constitute a guarantee of employment, job placement, internship selection, admission, salary attainment, or any specific career outcome.</strong>
          </p>
          <p className="text-xs text-amber-200/80">
            Participation in our programs is intended to enhance knowledge and practical skills. Career progression and hiring selections depend solely on the candidate’s individual performance, independent third-party recruitment decisions, and broader market conditions.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          5. Prohibited Use and Conduct
        </h3>
        <p>When interacting with the qubitedge website, you agree that you will not:</p>
        <ul className="list-disc list-inside space-y-1.5 text-white/70 pl-2">
          <li>Attempt unauthorized access to any part of the site, servers, databases, or connected network infrastructure.</li>
          <li>Deploy automated scripts, bots, spiders, or scrapers to harvest data, content, or contact details without written consent.</li>
          <li>Introduce malware, viruses, worms, trojans, or malicious payloads that could compromise site security or performance.</li>
          <li>Copy, mirror, reproduce, or republish the website layout, source code, or media without authorization.</li>
          <li>Impersonate qubitedge, its founders, team members, partners, or any other individual or entity.</li>
          <li>Engage in denial-of-service (DoS/DDoS) attacks or activities that disrupt website availability.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          6. External Links & Third-Party Platforms
        </h3>
        <p>
          Our site contains links to external platforms (including LinkedIn, Instagram, YouTube, GitHub, Google Forms, and partner portals). qubitedge does not own, endorse, or control these third-party websites and is not responsible for their content, reliability, security, or terms of service. Visiting external links is done at your own risk.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          7. Website Availability and Limitation of Liability
        </h3>
        <p>
          qubitedge does not warrant that the website will always be available, uninterrupted, bug-free, or free of security vulnerabilities. To the fullest extent permitted by applicable law, qubitedge shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your use of or inability to access the website.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          8. Governing Law & Jurisdiction
        </h3>
        <p>
          These Terms and any disputes arising out of or related to your use of this website shall be governed by and construed in accordance with the laws of <strong>India</strong>. The courts of <strong>Visakhapatnam, Andhra Pradesh, India</strong> shall have exclusive jurisdiction over any legal proceedings arising hereunder.
        </p>
      </section>
    </div>
  );
}

/* =========================================================================
   3. COPYRIGHT & INTELLECTUAL PROPERTY
========================================================================= */
function CopyrightContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          1. Proprietary Rights Notice
        </h3>
        <p>
          This official website and all associated materials, designs, and systems are the exclusive intellectual property of <strong>qubitedge Global Services Pvt. Ltd.</strong> and are protected by Indian and international copyright, trademark, trade dress, and intellectual property laws.
        </p>
        <div className="p-3 rounded-lg bg-[#64CEFB]/10 border border-[#64CEFB]/30 text-white/90 text-xs font-mono">
          © {new Date().getFullYear()} qubitedge Global Services Pvt. Ltd. All rights reserved.
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          2. Protected Assets & Scope of IP
        </h3>
        <p>The scope of qubitedge’s intellectual property includes, but is not limited to:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="font-semibold text-white text-sm text-[#64CEFB]">Brand & Identity</h4>
            <ul className="text-xs text-white/65 space-y-1 list-disc list-inside">
              <li>qubitedge™ name & logo</li>
              <li>Brand iconography & badges</li>
              <li>Taglines & slogans</li>
              <li>Corporate trade dress</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="font-semibold text-white text-sm text-[#64CEFB]">Content & Media</h4>
            <ul className="text-xs text-white/65 space-y-1 list-disc list-inside">
              <li>Original website copy & text</li>
              <li>UI / UX designs & themes</li>
              <li>Illustrations, graphics, icons</li>
              <li>Curriculum & workshop notes</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <h4 className="font-semibold text-white text-sm text-[#64CEFB]">Software & Systems</h4>
            <ul className="text-xs text-white/65 space-y-1 list-disc list-inside">
              <li>Frontend & server code</li>
              <li>Proprietary tools & APIs</li>
              <li>Component architectures</li>
              <li>Internal scripts & algorithms</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          3. Restrictions on Use
        </h3>
        <p>
          Except as expressly permitted by applicable law or with prior written authorization from qubitedge, you may not:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-white/70 pl-2">
          <li>Reproduce, duplicate, mirror, frame, or republish any content, design, or layout from this website.</li>
          <li>Distribute, sell, license, lease, or commercially exploit any qubitedge content, workshop syllabus, or educational assets.</li>
          <li>Modify, translate, decompile, reverse-engineer, or create derivative works from our proprietary software and codebases.</li>
          <li>Use qubitedge trademarks, logos, or slogans in a manner that falsely implies endorsement, sponsorship, or association.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          4. Permission Requests & IP Infringement Inquiries
        </h3>
        <p>
          For licensing requests, media kit assets, academic citations, or to report unauthorized use of qubitedge intellectual property, please submit a formal request to:
        </p>
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1">
          <p className="font-semibold text-white">qubitedge Global Services Pvt. Ltd. — Legal & IP Department</p>
          <p className="text-white/60">Email: <a href="mailto:info@qubitedge.in" className="text-[#64CEFB]">info@qubitedge.in</a></p>
          <p className="text-white/60">Address: 4-61-15, Galilee Enclave, Lawsons Bay Colony, Visakhapatnam, Andhra Pradesh, India.</p>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   4. DISCLAIMER CONTENT
========================================================================= */
function DisclaimerContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          1. General Information Disclaimer
        </h3>
        <p>
          The information contained on this website is published by <strong>qubitedge Global Services Pvt. Ltd.</strong> in good faith for general educational and informational purposes only. While we endeavor to keep the information accurate and up to date, qubitedge makes no representations or warranties of any kind, express or implied, regarding completeness, reliability, or suitability.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          2. Educational and Career Guidance Disclaimer
        </h3>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-white/80 space-y-2">
          <p>
            qubitedge provides training workshops, bootcamps, project mentoring, and internship opportunities designed to upskill students and professionals.
          </p>
          <p className="font-medium text-white">
            Please be advised: Participation, completion, or certification in any qubitedge program does not automatically guarantee employment, hiring, placement in partner firms, or specific compensation outcomes.
          </p>
          <p className="text-xs text-white/60">
            Hiring decisions are made independently by prospective employers based on their internal recruitment standards and job requirements.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          3. Commercial Services & IT Consulting Disclaimer
        </h3>
        <p>
          Descriptions of technical solutions, marketing strategies, software development, or corporate consulting services published on this site do not constitute a binding legal proposal, tender, or contract. Any commercial engagements with qubitedge are subject to independent written agreements signed by authorized representatives.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          4. Third-Party Links & External Endorsement Disclaimer
        </h3>
        <p>
          Through this website, you may link to other websites that are not under the control of qubitedge. We have no control over the nature, content, and availability of those sites. The inclusion of any external links does not necessarily imply a recommendation or endorse the views expressed within them.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          5. Website Availability & Technical Outages
        </h3>
        <p>
          Every effort is made to keep the website running smoothly. However, qubitedge takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to scheduled maintenance, server updates, hosting interruptions, or technical issues beyond our reasonable control.
        </p>
      </section>
    </div>
  );
}

/* =========================================================================
   5. COOKIE POLICY CONTENT
========================================================================= */
function CookiePolicyContent() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          1. What Are Cookies?
        </h3>
        <p>
          Cookies are small text files or local storage tokens placed on your computer, tablet, or mobile device by websites that you visit. They are widely used to make websites function properly, enhance user experience, and provide aggregated analytics to site administrators.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          2. Categories of Cookies We Use
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2 text-[#64CEFB]">
              <CheckCircle2 className="h-4 w-4" />
              A. Strictly Necessary & Functional Tokens
            </h4>
            <p className="text-xs text-white/70 mt-1">
              Essential for the website’s core functionality, security checks, smooth routing between pages, and storing administrative UI settings. Without these, basic features of the site cannot function.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2 text-[#64CEFB]">
              <CheckCircle2 className="h-4 w-4" />
              B. Performance & Analytics Tools
            </h4>
            <p className="text-xs text-white/70 mt-1">
              These collect anonymous, aggregated technical metrics—such as page load speeds, Cloudflare routing diagnostics, and general visitor trends (via Google Search Console / Analytics). They help us optimize performance without tracking individuals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2 text-[#64CEFB]">
              <CheckCircle2 className="h-4 w-4" />
              C. Embedded Third-Party Content
            </h4>
            <p className="text-xs text-white/70 mt-1">
              When viewing embedded media (such as YouTube videos or social media feeds), the external provider may set third-party cookies to remember video quality preferences or collect playback telemetry.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          3. How to Manage and Disable Cookies
        </h3>
        <p>
          You have the right to decide whether to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline or clear cookies at any time:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-white/70 pl-2">
          <li>
            <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data.
          </li>
          <li>
            <strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies.
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions.
          </li>
        </ul>
        <p className="text-xs text-white/50">
          *Note: Disabling necessary session tokens may affect the visual presentation or responsiveness of certain interactive components.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#64CEFB]" />
          4. Updates to This Cookie Policy
        </h3>
        <p>
          qubitedge may update this Cookie Policy periodically to reflect technological adjustments or regulatory enhancements. Any changes will be posted on this page with an updated revision date.
        </p>
      </section>
    </div>
  );
}

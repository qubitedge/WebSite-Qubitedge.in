import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/* ---------- Types ---------- */

export type BlockType =
  | "hero"
  | "features"
  | "workshops"
  | "testimonials"
  | "articles"
  | "faq"
  | "cta"
  | "richText";

export type Block = {
  id: string;
  type: BlockType;
  /** Optional anchor used by navbar smooth-scroll links */
  anchor?: string;
  /** Block-specific payload */
  data: Record<string, any>;
};

export type NavItem = { id: string; label: string; anchor: string; href?: string; isExternal?: boolean };

export type SiteContent = {
  brand: { name: string };
  nav: NavItem[];
  cta: { label: string; anchor: string };
  background: { enabled: boolean; videoUrl: string; imageUrl?: string; opacity: number };
  blocks: Block[];
  footer: { copyright: string; links: { label: string; href: string }[] };
};

const STORAGE_KEY = "qubitedge.cms.v5";

/* ---------- Default content (mirrors the existing site) ---------- */

const uid = () => Math.random().toString(36).slice(2, 10);

export const defaultContent: SiteContent = {
  brand: { name: "Qubitedge" },
  nav: [
    { id: uid(), label: "Learning", anchor: "learning", href: "/learning" },
    { id: uid(), label: "Manufacturing", anchor: "manufacturing", href: "https://qubitedge.vercel.app/", isExternal: true },
    { id: uid(), label: "IT Services", anchor: "it-services", href: "/it-services" },
    { id: uid(), label: "Workshops/Internships", anchor: "workshops", href: "/workshops" },
    { id: uid(), label: "About Us", anchor: "about", href: "/about" },
  ],
  cta: { label: "Get Started", anchor: "contact" },
  background: {
    enabled: true,
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4",
    opacity: 0.25,
  },
  blocks: [
    {
      id: uid(),
      type: "hero",
      anchor: "learning",
      data: {
        eyebrow: "Learn from Leaders",
        topLeft: "Qubitedge is an ecosystem for growth, bridging the gap between talent and opportunity.",
        topRight: "8000+ Learners. Real careers. Real impact.",
        titleLine1: "Sharpening Potential.",
        titleLine2: "Building Futures.",
        subtitle:
          "We empower students with job-ready skills and provide businesses with world-class technology, finance, and staffing solutions.",
        primaryCta: { label: "Explore our Workshops", anchor: "workshops" },
        secondaryCta: { label: "Partner With Us", anchor: "contact" },
        videoUrl:
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4",
      },
    },
    {
      id: uid(),
      type: "features",
      anchor: "about",
      data: {
        eyebrow: "Why Choose Qubitedge",
        title: "The Qubitedge Difference",
        intro:
          "At Qubitedge, we blend real-world expertise, future-ready skills, and direct industry access to create transformational growth for students, businesses, and visionary leaders alike.",
        items: [
          { id: uid(), title: "Built by Practitioners, Not Just Trainers", body: "We bring real-world experience into every engagement. Our team includes seasoned professionals who've led tech innovations, built businesses, and advised global enterprises." },
          { id: uid(), title: "Beyond Technical: Whole-Person Development", body: "We fuse hard skills with human skills. Alongside IT and AI training, we build communication, leadership, and emotional intelligence." },
          { id: uid(), title: "Fast-Track Learning, Maximum ROI", body: "Our 2-hour workshop model delivers concentrated, actionable knowledge at an accessible price." },
          { id: uid(), title: "Direct Pathways to Opportunity", body: "We connect students to real internships, corporate partners, and placement pipelines." },
          { id: uid(), title: "Enterprise-Class Solutions for Growth", body: "From tech implementation to financial strategy and workforce solutions, we empower businesses to scale with precision." },
          { id: uid(), title: "Innovation Across Sectors", body: "Whether it's using AI in agriculture, streaming high-impact events, or coaching CXOs, our innovation mindset drives value." },
        ],
      },
    },
    {
      id: uid(),
      type: "workshops",
      anchor: "workshops",
      data: {
        eyebrow: "Workshops",
        title: "Workshops That Move Careers Forward",
        intro:
          "Every session is built for real-world impact. From mastering business tools to sharpening strategic thinking, our workshops deliver high-performance skills in just 2 hours.",
        items: [
          { id: uid(), tag: "Data Analytics & ML", title: "Master Data & AI for Real-World Careers", body: "Step into the future of work with this hands-on webinar designed for students.", cta: "Join us Live !" },
          { id: uid(), tag: "Accounting", title: "Student Essentials: Accounting Basics", body: "Build a strong foundation in accounting—from balance sheets to budgeting.", cta: "Learn More" },
          { id: uid(), tag: "Artificial Intelligence", title: "AI Basics: Understand the Future", body: "This course is your gateway into the world of AI, machine learning, and neural networks.", cta: "Learn More" },
        ],
      },
    },
    {
      id: uid(),
      type: "testimonials",
      data: {
        eyebrow: "Testimonials & Reviews",
        title: "People. Progress. Proof.",
        intro: "Hear what respected professionals say about partnering with Qubitedge.",
        items: [
          { id: uid(), quote: "Qubitedge is solving a real gap—bridging academic knowledge with skills companies actually hire for.", author: "Industry Leader", role: "Tech" },
          { id: uid(), quote: "The clarity and focus in Qubitedge's sessions are rare.", author: "Industry Leader", role: "AI" },
          { id: uid(), quote: "Workshops like these are what the industry needs—short, impactful, and led by people who've actually done the work.", author: "Industry Leader", role: "Education" },
          { id: uid(), quote: "We've hired interns from Qubitedge programs and were impressed by their practical skills and readiness.", author: "Industry Leader", role: "HR" },
        ],
      },
    },
    {
      id: uid(),
      type: "articles",
      data: {
        eyebrow: "Latest News & Articles",
        title: "Insights from the Edge",
        intro: "Stay updated with expert insights and the latest trends.",
        items: [
          { id: uid(), tag: "Learning", title: "The Rise of Micro-Workshops in Career Building", excerpt: "Why bite-sized, high-impact learning is reshaping how professionals upskill in 2026.", imageUrl: "/micro-workshops.png" },
          { id: uid(), tag: "Industry", title: "AI in Agriculture: A Quiet Revolution", excerpt: "How emerging tech is transforming farming workflows across rural economies.", imageUrl: "/AI IN AGRI.png" },
          { id: uid(), tag: "Business", title: "Hiring for Skills, Not Pedigree", excerpt: "Enterprises are rewriting recruiting playbooks—here's what it means for new graduates.", imageUrl: "/BUSINESS.png" },
        ],
      },
    },
    {
      id: uid(),
      type: "faq",
      data: {
        eyebrow: "FAQ",
        title: "Questions, Answered",
        items: [
          { id: uid(), q: "What types of workshops does Qubitedge offer?", a: "We run focused, 2-hour live online workshops on Power BI, Excel, AI, communication, and leadership." },
          { id: uid(), q: "How do I register for a Qubitedge workshop?", a: "Registration links are shared via Gmail and WhatsApp." },
          { id: uid(), q: "Who can attend your workshops?", a: "Students, recent graduates, and professionals across all fields." },
          { id: uid(), q: "Is there a fee to attend the workshops?", a: "Yes. A small nominal fee keeps sessions accessible while ensuring high quality." },
        ],
      },
    },
    {
      id: uid(),
      type: "cta",
      anchor: "contact",
      data: {
        title: "Let's Build Your Future—Together",
        highlight: "Future",
        body: "Whether you're starting your career, scaling a business, or launching a bold idea—Qubitedge is here for your next step.",
        ctaLabel: "Let's Build Something Great",
      },
    },
  ],
  footer: {
    copyright: "© 2026 Qubitedge. All rights reserved.",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

/* ---------- Context ---------- */

type CMSContext = {
  content: SiteContent;
  setContent: (updater: (c: SiteContent) => SiteContent) => void;
  reset: () => void;
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, dir: -1 | 1) => void;
  updateBlock: (id: string, data: Record<string, any>) => void;
};

const Ctx = createContext<CMSContext | null>(null);

function loadFromStorage(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    const mergedNav = parsed.nav ? parsed.nav.map((item, index) => {
      const defaultItem = defaultContent.nav[index];
      return {
        ...item,
        href: item.href || defaultItem?.href,
        isExternal: item.isExternal ?? defaultItem?.isExternal
      };
    }) : defaultContent.nav;

    return { 
      ...defaultContent, 
      ...parsed, 
      nav: mergedNav,
      background: { ...defaultContent.background, ...(parsed.background || {}) } 
    } as SiteContent;
  } catch {
    return defaultContent;
  }
}

function emptyBlock(type: BlockType): Block {
  const base: Block = { id: uid(), type, data: {} };
  switch (type) {
    case "hero":
      base.data = { eyebrow: "New Eyebrow", titleLine1: "Big Title", titleLine2: "Goes Here.", subtitle: "Subtitle text.", topLeft: "", topRight: "", primaryCta: { label: "Get Started", anchor: "contact" }, secondaryCta: { label: "Learn More", anchor: "about" }, videoUrl: "" };
      break;
    case "features":
      base.data = { eyebrow: "Features", title: "Why Us", intro: "Our differentiators.", items: [{ id: uid(), title: "Feature one", body: "Describe the feature." }] };
      break;
    case "workshops":
      base.data = { eyebrow: "Workshops", title: "Programs", intro: "Short intro.", items: [{ id: uid(), tag: "Tag", title: "Workshop", body: "Body.", cta: "Learn more" }] };
      break;
    case "testimonials":
      base.data = { eyebrow: "Reviews", title: "What people say", intro: "", items: [{ id: uid(), quote: "Great work.", author: "Name", role: "Role" }] };
      break;
    case "articles":
      base.data = { eyebrow: "News", title: "Latest", intro: "", items: [{ id: uid(), tag: "Tag", title: "Headline", excerpt: "Short excerpt." }] };
      break;
    case "faq":
      base.data = { eyebrow: "FAQ", title: "Questions", items: [{ id: uid(), q: "Question?", a: "Answer." }] };
      break;
    case "cta":
      base.data = { title: "Call to action", highlight: "action", body: "Persuasive body.", ctaLabel: "Get Started" };
      break;
    case "richText":
      base.data = { eyebrow: "Section", title: "Heading", body: "Write any text content here." };
      break;
  }
  return base;
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() => loadFromStorage());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {}
  }, [content]);

  // Sync across windows/iframes (admin live preview)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try { setContentState(JSON.parse(e.newValue)); } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setContent = useCallback((updater: (c: SiteContent) => SiteContent) => {
    setContentState((c) => updater(c));
  }, []);

  const value = useMemo<CMSContext>(
    () => ({
      content,
      setContent,
      reset: () => setContentState(defaultContent),
      addBlock: (type) => setContentState((c) => ({ ...c, blocks: [...c.blocks, emptyBlock(type)] })),
      removeBlock: (id) => setContentState((c) => ({ ...c, blocks: c.blocks.filter((b) => b.id !== id) })),
      moveBlock: (id, dir) =>
        setContentState((c) => {
          const idx = c.blocks.findIndex((b) => b.id === id);
          const ni = idx + dir;
          if (idx < 0 || ni < 0 || ni >= c.blocks.length) return c;
          const blocks = [...c.blocks];
          [blocks[idx], blocks[ni]] = [blocks[ni], blocks[idx]];
          return { ...c, blocks };
        }),
      updateBlock: (id, data) =>
        setContentState((c) => ({ ...c, blocks: c.blocks.map((b) => (b.id === id ? { ...b, data: { ...b.data, ...data } } : b)) })),
    }),
    [content, setContent],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCMS() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCMS must be used within CMSProvider");
  return v;
}

/* ---------- Smooth scroll helper ---------- */

export function scrollToAnchor(anchor: string) {
  if (!anchor) return;
  const el = document.getElementById(anchor);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

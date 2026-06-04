import { ArrowRight, ArrowUpRight, Sparkles, Users, Rocket, Briefcase, GraduationCap, Lightbulb, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";

const features = [
  { icon: Briefcase, title: "Built by Practitioners, Not Just Trainers", body: "We bring real-world experience into every engagement. Our team includes seasoned professionals who've led tech innovations, built businesses, and advised global enterprises—ensuring every session is grounded in what actually works." },
  { icon: Users, title: "Beyond Technical: Whole-Person Development", body: "We fuse hard skills with human skills. Alongside IT and AI training, we build communication, leadership, and emotional intelligence—essential traits for standout professionals in today's market." },
  { icon: Rocket, title: "Fast-Track Learning, Maximum ROI", body: "Our 2-hour workshop model delivers concentrated, actionable knowledge at an accessible price. Whether it's mastering Power BI or corporate-ready Excel, we make elite learning scalable and efficient." },
  { icon: GraduationCap, title: "Direct Pathways to Opportunity", body: "Training is just the beginning. We connect students to real internships, corporate partners, and placement pipelines—bridging education with tangible outcomes in the job market." },
  { icon: Sparkles, title: "Enterprise-Class Solutions for Growth", body: "From tech implementation to financial strategy and workforce solutions, we empower businesses to scale with precision. Our services are tailored for impact—locally rooted, globally ready." },
  { icon: Lightbulb, title: "Innovation Across Sectors", body: "Whether it's using AI in agriculture, streaming high-impact events, or coaching CXOs, our innovation mindset drives value across every touchpoint—making us a growth partner across industries." },
];

const workshops = [
  { tag: "Data Analytics & Machine Learning", title: "Master Data & AI for Real-World Careers", body: "Step into the future of work with this hands-on webinar designed just for students. Learn how Machine Learning and Power BI are used by real companies to make smarter decisions. Gain skills that matter—and that employers value.", cta: "Join us Live !" },
  { tag: "Accounting", title: "Student Essentials: Accounting Basics", body: "Build a strong foundation in accounting—from balance sheets to budgeting. Perfect for students aiming to understand business finance or prepare for roles in finance, management, or entrepreneurship.", cta: "Learn More" },
  { tag: "Artificial Intelligence", title: "AI Basics: Understand the Future", body: "This course is your gateway into the world of AI. You'll learn key concepts like machine learning, neural networks, and real-life use cases—explained clearly for students from all backgrounds.", cta: "Learn More" },
];

const testimonials = [
  "Qubitedge is solving a real gap—bridging academic knowledge with skills companies actually hire for. Their workshops are exactly what emerging talent needs today.",
  "The clarity and focus in Qubitedge's sessions are rare. They manage to simplify complex topics like AI and data without dumbing them down.",
  "Workshops like these are what the industry needs—short, impactful, and led by people who've actually done the work.",
  "We've hired interns from Qubitedge programs and were impressed by their practical skills and readiness. They hit the ground running.",
];

const faqs = [
  { q: "What types of workshops does Qubitedge offer?", a: "We run focused, 2-hour live online workshops on topics like Power BI, Excel, AI, communication skills, and leadership—designed for fast, practical learning at an affordable cost." },
  { q: "How do I register for a Qubitedge workshop and where is the workshop happening?", a: "Registration links are shared via Gmail and WhatsApp. Once you fill out the form and pay the registration fee, you'll receive a Zoom link and confirmation." },
  { q: "Who can attend your workshops?", a: "Our workshops are open to students, recent graduates, and professionals across all fields—no prior technical background needed unless specified." },
  { q: "Is there a fee to attend the workshops?", a: "Yes. We charge a small, nominal fee to keep our sessions accessible while ensuring high-quality content delivered by real-world experts." },
  { q: "What is Qubitedge?", a: "Qubitedge is a multi-domain growth platform. We empower students with in-demand skills, support businesses with IT and financial services, and help leaders and startups scale with strategic guidance." },
  { q: "What makes your training different from others?", a: "Our programs blend practical tech skills, soft skills, and career guidance, delivered by practitioners—not just trainers. We focus on job-readiness, not just theory." },
  { q: "What services do you offer for businesses?", a: "We offer IT solutions, accounting, staffing, event management, and other custom services—tailored to help businesses grow locally and globally." },
];

const articles = [
  { tag: "Learning", title: "The Rise of Micro-Workshops in Career Building", excerpt: "Why bite-sized, high-impact learning is reshaping how professionals upskill in 2026." },
  { tag: "Industry", title: "AI in Agriculture: A Quiet Revolution", excerpt: "How emerging tech is transforming farming workflows across rural economies." },
  { tag: "Business", title: "Hiring for Skills, Not Pedigree", excerpt: "Enterprises are rewriting recruiting playbooks—here's what it means for new graduates." },
];

export function Home() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden pt-16">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay loop muted playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
            <p className="text-sm md:text-base text-white/80 max-w-md">
              Qubitedge is an ecosystem for growth, bridging the gap between talent and opportunity.
            </p>
            <p className="text-sm md:text-base text-white/80 lg:text-right">
              8000+ Learners. Real careers. Real impact.
            </p>
          </div>

          <div className="text-center flex flex-col items-center">
            <p className="text-xs md:text-sm uppercase tracking-tight text-white/80 mb-4">
              Learn from Leaders
            </p>
            <h1 className="tracking-tighter font-medium" style={{ lineHeight: 0.85 }}>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white">
                Sharpening Potential.
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                <ShinyText text="Building Futures." />
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-sm md:text-base text-white/80">
              We empower students with job-ready skills and provide businesses with world-class technology, finance, and staffing solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href="#workshops" className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 md:px-8 py-3 md:py-4 text-sm md:text-base hover:bg-white/90 transition-colors">
                Explore our Workshops
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base text-white hover:bg-white/10 transition-colors">
                Partner With Us
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="about" className="py-24 md:py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#64CEFB] mb-4">Why Choose Qubitedge</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter" style={{ lineHeight: 0.95 }}>
                The Qubitedge<br />Difference
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-6">
              <p className="text-white/70 text-base md:text-lg">
                At Qubitedge, we blend real-world expertise, future-ready skills, and direct industry access to create transformational growth for students, businesses, and visionary leaders alike.
              </p>
              <a href="#" className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white w-fit">
                See All Features <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-black p-8 hover:bg-white/[0.03] transition-colors"
              >
                <f.icon className="h-6 w-6 text-[#64CEFB] mb-6" />
                <h3 className="text-lg font-medium mb-3">{f.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOPS */}
      <section id="workshops" className="py-24 md:py-32 border-t border-white/10 bg-gradient-to-b from-black via-[#0a0f14] to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#64CEFB] mb-4">Workshops</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
              Workshops That Move Careers Forward
            </h2>
            <p className="text-white/70 text-base md:text-lg">
              Every session is built for real-world impact. From mastering business tools to sharpening strategic thinking, our workshops deliver high-performance skills in just 2 hours—designed for ambitious professionals ready to level up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workshops.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#64CEFB]/40 hover:bg-white/[0.04] transition-all"
              >
                <span className="text-xs uppercase tracking-widest text-[#64CEFB] mb-6">{w.tag}</span>
                <h3 className="text-2xl font-medium mb-4 tracking-tight">{w.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-8 flex-1">{w.body}</p>
                <a href="#" className="group inline-flex items-center gap-2 text-sm font-medium w-fit">
                  {w.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#64CEFB] mb-4">Testimonials & Reviews</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
              People. Progress. Proof.
            </h2>
            <p className="text-white/70 text-base md:text-lg">
              Hear what respected professionals and industry innovators have to say about partnering with Qubitedge—and how our work is driving real impact across communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 p-8 bg-white/[0.02]"
              >
                <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">"{t}"</blockquote>
                <figcaption className="flex items-center gap-3 text-sm text-white/60">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#64CEFB] to-blue-700" />
                  <div>
                    <div className="text-white">TBD</div>
                    <div className="text-xs">Industry Leader</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10 transition-colors">
              View All Reviews <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-24 md:py-32 border-t border-white/10 bg-gradient-to-b from-black via-[#0a0f14] to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#64CEFB] mb-4">Latest News & Articles</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
              Insights from the Edge
            </h2>
            <p className="text-white/70">
              Stay updated with expert insights, success stories, and the latest trends in education, business, and innovation—curated by the Qubitedge team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.a
                href="#"
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-white/10 overflow-hidden hover:border-[#64CEFB]/40 transition-all"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-[#64CEFB]/30 via-blue-900/40 to-black" />
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-[#64CEFB] mb-3">{a.tag}</span>
                  <h3 className="text-xl font-medium mb-3 tracking-tight group-hover:text-[#64CEFB] transition-colors">{a.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{a.excerpt}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section id="contact" className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#64CEFB]/10 via-transparent to-blue-900/20" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
            Let's Build Your <ShinyText text="Future" />—Together
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Whether you're just starting your career, scaling a business, or launching a bold idea—Qubitedge is here to support your next step. Join our growing community of learners, leaders, and change-makers driving impact with purpose and skill.
          </p>
          <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base hover:bg-white/90 transition-colors">
            Let's Build Something Great
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <div>© 2026 Qubitedge. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[#64CEFB] mb-4">Frequently Asked Questions</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-6" style={{ lineHeight: 0.95 }}>
            Got Questions?<br />We've Got Answers.
          </h2>
          <p className="text-white/70">
            Whether you're a student, a business owner, or a startup founder, here you'll find clear, concise answers to help you navigate our programs.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                >
                  <span className="text-base md:text-lg font-medium group-hover:text-[#64CEFB] transition-colors">{f.q}</span>
                  {isOpen ? <Minus className="h-5 w-5 shrink-0" /> : <Plus className="h-5 w-5 shrink-0" />}
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-6 text-white/70 text-sm md:text-base leading-relaxed"
                  >
                    {f.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

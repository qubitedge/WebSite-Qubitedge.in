import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";
import { ShinyText } from "./ShinyText";

const navLinks = [
  { label: "Home" },
  { label: "About Us" },
  { label: "Courses" },
  { label: "Instructors" },
  { label: "Testimonials" },
  { label: "Blog" },
];

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Nav */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
              <div className="h-3 w-3 rounded-full bg-white" />
            </div>
            <span className="text-lg font-medium text-white">DesignPro</span>
          </div>

          <div className="hidden rounded-full border border-gray-700 px-2 py-2 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href="#"
                className="rounded-full px-4 py-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#"
              className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm text-white/80 transition-colors hover:text-white"
            >
              Contact us
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button className="lg:hidden text-white" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </nav>

        {/* Top two-column */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <p className="max-w-md text-sm text-white/80 md:text-base">
            We deliver transformative programs that empower emerging product designers with cutting-edge expertise and vision to thrive globally.
          </p>
          <p className="text-sm text-white/80 md:text-base lg:text-right">
            8000+ Talented Designers Launched !
          </p>
        </div>

        {/* Center hero */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-4 text-xs uppercase tracking-tight text-white/80 md:text-sm">
            Seats for Next Program Opening Soon
          </p>
          <h1
            className="tracking-tighter"
            style={{ lineHeight: 0.85 }}
          >
            <span className="block text-5xl font-medium text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              Become
            </span>
            <span className="block text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <ShinyText text="Product Leader." />
            </span>
          </h1>

          <a
            href="#"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm text-white transition-colors hover:bg-gray-900 md:px-8 md:py-4 md:text-base"
          >
            Apply for Next Enrollment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

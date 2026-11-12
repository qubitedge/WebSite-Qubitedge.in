import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CMSProvider, useCMS } from "../lib/cms";
import { getCMSContent } from "../lib/api/cms.functions";
import { AdminProvider } from "../lib/AdminContext";
import { Footer } from "../components/Footer";
import { AdminToolbar } from "../components/AdminToolbar";
import { Aurora } from "../components/Aurora";
import { useSectionAccent } from "../hooks/useSectionAccent";

function GlobalBackground() {
  const { content } = useCMS();
  const bg = content.background;
  
  if (!bg?.enabled) return null;

  return <Aurora videoUrl={bg.videoUrl || undefined} />;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Default title — individual routes override this
      { title: "qubitedge — Sharpening Potential. Building Futures." },
      {
        name: "description",
        content:
          "qubitedge is a growth ecosystem bridging talent and opportunity through hands-on workshops, cutting-edge IT services, internship programs, and enterprise solutions.",
      },
      { name: "author", content: "qubitedge" },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "qubitedge, internships, workshops, IT services, AI, quantum computing, data science, machine learning, enterprise solutions, student programs, Hyderabad",
      },
      // Open Graph
      { property: "og:site_name", content: "qubitedge" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://qubitedge.in" },
      {
        property: "og:title",
        content: "qubitedge — Sharpening Potential. Building Futures.",
      },
      {
        property: "og:description",
        content:
          "qubitedge is a growth ecosystem bridging talent and opportunity through workshops, IT services, and enterprise solutions.",
      },
      {
        property: "og:image",
        content: "https://qubitedge.in/logo.webp",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_IN" },
      // Twitter / X Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@qubitedge" },
      { name: "twitter:creator", content: "@qubitedge" },
      {
        name: "twitter:title",
        content: "qubitedge — Sharpening Potential. Building Futures.",
      },
      {
        name: "twitter:description",
        content:
          "Workshops, IT services, internships, and enterprise solutions for students, businesses, and leaders.",
      },
      {
        name: "twitter:image",
        content: "https://qubitedge.in/logo.webp",
      },
      // Theme colour for browser chrome
      { name: "theme-color", content: "#0a0a0a" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/webp",
        href: "/logo.webp",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo.webp",
      },
      {
        rel: "canonical",
        href: "https://qubitedge.in",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  loader: async () => {
    const initialContent = await getCMSContent();
    return { initialContent };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { initialContent } = Route.useLoaderData();
  useSectionAccent();

  useEffect(() => {
    console.clear();
    console.log(`
██╗     ██╗██╗  ██╗██╗██╗████████╗██╗  ██╗
██║     ██║██║ ██╔╝██║██║╚══██╔══╝██║  ██║
██║     ██║█████╔╝ ██║██║   ██║   ███████║
██║     ██║██╔═██╗ ██║██║   ██║   ██╔══██║
███████╗██║██║  ██╗██║██║   ██║   ██║  ██║
╚══════╝╚═╝╚═╝  ╚═╝╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝

🚀 Developed by Likhith
☕ Coffee | 💻 Code | 🌪️ Chaos

👻 Welcome to qubitedge`);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider initialContent={initialContent}>
        <AdminProvider>
          <AdminToolbar />
          <div className="flex flex-col min-h-screen">
            <GlobalBackground />
            <Outlet />
            <Footer />
          </div>
        </AdminProvider>
      </CMSProvider>
    </QueryClientProvider>
  );
}

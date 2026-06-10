import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CMSProvider, useCMS } from "../lib/cms";
import { Footer } from "../components/Footer";

function GlobalBackground() {
  const { content } = useCMS();
  const bg = content.background;
  
  if (!bg?.enabled || (!bg.videoUrl && !bg.imageUrl)) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black pointer-events-none">
      {bg.videoUrl ? (
        <video
          key={bg.videoUrl}
          className="h-full w-full object-cover"
          style={{ opacity: bg.opacity ?? 0.25 }}
          autoPlay
          loop
          muted
          playsInline
          src={bg.videoUrl}
        />
      ) : (
        <img
          src={bg.imageUrl}
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity: bg.opacity ?? 0.25 }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
    </div>
  );
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
      { title: "Lovable App" },
      { name: "description", content: "Builds a dynamic, full-screen hero section for a product design education platform." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Builds a dynamic, full-screen hero section for a product design education platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Builds a dynamic, full-screen hero section for a product design education platform." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/811105d3-a670-456f-b9e0-c204a013367d/id-preview-14a05ee5--647145a8-337f-441b-9db2-e75d2007c6dc.lovable.app-1780551403612.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/811105d3-a670-456f-b9e0-c204a013367d/id-preview-14a05ee5--647145a8-337f-441b-9db2-e75d2007c6dc.lovable.app-1780551403612.png" },
    ],
    links: [
      {
        rel: "icon",
        href: "/logo.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
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

  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <div className="flex flex-col min-h-screen">
          <GlobalBackground />
          <Outlet />
          <Footer />
        </div>
      </CMSProvider>
    </QueryClientProvider>
  );
}

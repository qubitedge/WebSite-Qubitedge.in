import { useEffect } from "react";

export function useSectionAccent() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisible = 0;
        let bestAccent = "";
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            const targetAccent = (entry.target as HTMLElement).dataset.accent;
            if (ratio > maxVisible && targetAccent) {
              maxVisible = ratio;
              bestAccent = targetAccent;
            }
          }
        });

        if (bestAccent) {
          document.documentElement.style.setProperty("--accent-color", bestAccent);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }
    );

    const observeSections = () => {
      const sections = document.querySelectorAll("section[data-accent]");
      sections.forEach(s => observer.observe(s));
    };

    observeSections();
    const mutation = new MutationObserver(observeSections);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
}

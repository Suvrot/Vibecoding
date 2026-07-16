import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Asymmetrical rail section.
 * Left rail (1/4) holds the heading/eyebrow; the offset right zone holds content.
 * On mobile the spine disappears and content stacks.
 */
export function RailSection({
  eyebrow,
  title,
  description,
  children,
  bleed,
  className,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  bleed?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rail-section rail-spine", className)}>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[22%_1fr] lg:gap-10">
          <div className="rail-head mb-8 lg:mb-0 lg:sticky lg:top-24">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="display-2 mt-3 text-foreground">{title}</h2>
            )}
            {description && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <div className="rail-body">{children}</div>
        </div>
        {bleed}
      </div>
    </section>
  );
}

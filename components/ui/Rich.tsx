import { Fragment, type ReactNode } from "react";
import { copyTokens } from "@/content/site";

/**
 * Renders copy strings from content/en.ts.
 * **bold** -> <strong>, [note] -> visible placeholder flag, {token} -> value from content/site.ts.
 */
export function fillTokens(text: string): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => copyTokens[key] ?? match);
}

function renderBrackets(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={`${keyPrefix}-${i}`} className="ph" title="Open point: replace before go-live">
        {part}
      </span>
    ) : (
      <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>
    ),
  );
}

export function Rich({ text, boldClassName = "font-semibold" }: { text: string; boldClassName?: string }) {
  const filled = fillTokens(text);
  return (
    <>
      {filled.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={boldClassName}>
            {renderBrackets(part.slice(2, -2), `b${i}`)}
          </strong>
        ) : (
          <Fragment key={i}>{renderBrackets(part, `t${i}`)}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text version (for metadata, alt text, aria labels). */
export function plain(text: string): string {
  return fillTokens(text).replace(/\*\*/g, "");
}

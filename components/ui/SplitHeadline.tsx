import { Rich } from "./Rich";

/**
 * Salaido Headline (design system > Typography > Headline): "Imagine" in the display face, cut by
 * the 1px split (about 0.2em of the last letter disappears behind the line), then one word in bold.
 *
 * Takes copy in the "Imagine **better**" form from content/en.ts: the plain part goes left of the
 * split, the bold part right of it.
 */
export function SplitHeadline({
  text,
  as: Tag = "h1",
  id,
  className = "",
  lineClassName = "bg-cream/70",
  style,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  lineClassName?: string;
  style?: React.CSSProperties;
}) {
  const match = text.match(/^(.*?)\s*\*\*(.+)\*\*\s*(.*)$/);
  const left = match ? match[1] : text;
  const right = match ? `**${match[2]}**${match[3]}` : "";

  return (
    <Tag id={id} style={style} className={`relative grid grid-cols-2 items-center font-serif leading-[1.25] ${className}`}>
      <span aria-hidden className={`split-draw absolute bottom-[0.08em] left-1/2 top-[0.08em] w-px ${lineClassName}`} />
      <span className="overflow-hidden whitespace-nowrap text-right">
        {/* --cut: the "e" runs behind the line and is clipped. */}
        <span className="mr-[-0.2em] inline-block">
          <Rich text={left} />
        </span>
      </span>
      <span className="justify-self-start whitespace-nowrap pl-[0.12em]">
        <Rich text={right} boldClassName="font-bold" />
      </span>
    </Tag>
  );
}

import { useReveal } from '@/hooks/use-reveal';

interface CharRiseProps {
  text: string;
  /** Extra ms delay before the first char starts. */
  startDelay?: number;
  /** ms per character (defaults to 32). */
  stepMs?: number;
  className?: string;
  /** If true, wait for IntersectionObserver before animating (useful on sections below the fold). */
  runOnVisible?: boolean;
  /** Keep spaces as visible gaps (they otherwise collapse). */
  preserveSpaces?: boolean;
}

/**
 * Renders `text` with each character wrapped in a span that rises in place
 * on mount (or when scrolled into view if runOnVisible=true). Preserves
 * whitespace and non-breaking spaces.
 */
const CharRise = ({
  text,
  startDelay = 0,
  stepMs = 32,
  className = '',
  runOnVisible = false,
  preserveSpaces = true,
}: CharRiseProps) => {
  const ref = useReveal<HTMLSpanElement>();

  const extra = runOnVisible ? 'char-rise run-on-visible reveal' : 'char-rise';

  return (
    <span
      ref={runOnVisible ? ref : undefined}
      className={`${extra} ${className}`}
      aria-label={text}
    >
      {text.split('').map((ch, i) => {
        const delay = startDelay + i * stepMs;
        if (ch === ' ') {
          return (
            <span
              key={i}
              aria-hidden="true"
              style={
                {
                  '--i': 0,
                  animationDelay: `${delay}ms`,
                  width: preserveSpaces ? '0.28em' : undefined,
                } as React.CSSProperties
              }
            >
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{ animationDelay: `${delay}ms` } as React.CSSProperties}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

export default CharRise;

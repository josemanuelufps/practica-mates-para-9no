import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface KatexMathProps {
  math: string;
  block?: boolean;
}

export const KatexMath: React.FC<KatexMathProps> = ({ math, block = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
      }
    }
  }, [math, block]);

  return <span ref={containerRef} className={block ? 'block my-2 text-center' : 'inline'} />;
};

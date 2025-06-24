import React from "react";
import "./Flag.css";

type FlagProps = {
  code: string; // e.g. "usa", "fra"
  alt?: string;
  className?: string;
};

const flagPositions: Record<string, number> = {
  usa: 0,
  nor: 1,
  rus: 2,
  ned: 3,
  fra: 4,
  swe: 5,
  ita: 6,
  can: 7,
  sui: 8,
  blr: 9,
  ger: 10,
  aut: 11,
  chn: 12,
  // Add more as needed, index = row in the sprite
};

const FLAG_HEIGHT = 28; // px
const FLAG_WIDTH = 48;  // px

export const Flag: React.FC<FlagProps> = ({ code, alt, className }) => {
  if (!code) return null;
  const index = flagPositions[code.toLowerCase()];
  if (index === undefined) return null;

  return (
    <span
      className={`flag-sprite ${className || ""}`}
      style={{
        backgroundPosition: `0px -${index * FLAG_HEIGHT}px`,
        width: FLAG_WIDTH,
        height: FLAG_HEIGHT,
        display: "inline-block",
        backgroundImage: "url(/medals/flags.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: `auto`,
      }}
      aria-label={alt || code}
      title={alt || code}
    />
  );
}; 
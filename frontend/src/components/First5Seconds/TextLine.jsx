import React, { forwardRef } from "react";

const TextLine = forwardRef(function TextLine({ text, className }, ref) {
  return (
    <div ref={ref} className={`item ${className}`.trim()} aria-label={text}>
      {text.split("").map((character, index) => (
        <span
          key={`${className}-${index}-${character === " " ? "space" : character}`}
          className="char"
          aria-hidden="true"
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </div>
  );
});

export default TextLine;

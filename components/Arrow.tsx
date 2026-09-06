import React from 'react';

/**
 * A directional arrow that follows the reading direction.
 *
 * The bare glyph is a literal character, so under `dir="rtl"` it keeps pointing right and
 * ends up aimed back at the text it is meant to lead away from. Flipping it on the x-axis
 * costs nothing and is the only way to keep a "read on" cue meaningful in Urdu.
 *
 * `inline-block` is required — a transform does not apply to an inline box.
 */
const Arrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span aria-hidden="true" className={`inline-block rtl:-scale-x-100 ${className}`}>
    {'→'}
  </span>
);

export default Arrow;

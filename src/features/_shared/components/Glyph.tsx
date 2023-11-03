interface GlyphProps {
  src: string;

  /* Must include units, eg. "12px" or "61%" */
  width?: string;

  /* Must include units, eg. "12px" or "61%" */
  height?: string;
}

/**
 * Represents a color-masked image.
 */
export const Glyph = (props: GlyphProps) => {
  return (
    <span
      className="block w-10 h-10 bg-current"
      style={{
        WebkitMask: `url(${props.src}) center center no-repeat`,
        mask: `url(${props.src}) center center no-repeat`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        width: props.width,
        height: props.height,
      }}
    />
  );
};

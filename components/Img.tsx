import React from 'react';
import { IMAGE_SIZES } from '../content/imageSizes';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * An <img> that knows its own intrinsic size and, where they exist, offers smaller variants.
 *
 * Both facts come from content/imageSizes.ts, which is generated from the files on disk — so
 * the browser can reserve the right box before the bytes arrive, and a phone can fetch the
 * 400px copy of a 1600px photograph instead of the whole thing. See
 * scripts/generate-image-manifest.mjs.
 *
 * Pass `sizes` describing how wide the image actually renders — the CSS width, not the file's,
 * e.g. `sizes="(min-width: 640px) 33vw, 78vw"`. Without it the browser assumes the image fills
 * the viewport and picks a larger file than it needs: correct, but wasteful, which is the
 * whole thing we are trying to avoid.
 *
 * Defaults to lazy loading. Anything above the fold must opt out with `loading="eager"`;
 * lazy-loading the LCP image delays it, which is the opposite of what we want.
 */
const Img: React.FC<ImgProps> = ({ src, width, height, loading, decoding, srcSet, sizes, ...rest }) => {
  // Markup references images without a leading slash ('images/mill/…'); tolerate both.
  const key = src.replace(/^\//, '');
  const entry = IMAGE_SIZES[key];

  // Always emit a root-absolute URL. Every route is also served with a trailing slash
  // (/contact/ resolves to contact/index.html), where a relative 'images/…' would resolve to
  // /contact/images/… and 404. The site is served from the domain root, so a leading slash is
  // always right.
  const url = `/${key}`;

  const resolvedSrcSet =
    srcSet ??
    (entry?.v?.length
      ? [
          ...entry.v.map((w) => `/${key.replace(/\.webp$/, `-${w}.webp`)} ${w}w`),
          `${url} ${entry.w}w`,
        ].join(', ')
      : undefined);

  return (
    <img
      src={url}
      srcSet={resolvedSrcSet}
      sizes={resolvedSrcSet ? sizes ?? '100vw' : undefined}
      width={width ?? entry?.w}
      height={height ?? entry?.h}
      loading={loading ?? 'lazy'}
      decoding={decoding ?? 'async'}
      {...rest}
    />
  );
};

export default Img;

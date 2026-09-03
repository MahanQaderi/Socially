// the uploaded files are the full size originals, so the cdn resizes them for us
const variants = {
  avatar: "-/scale_crop/200x200/center/-/quality/smart/",
  post: "-/preview/1000x1000/-/quality/smart/",
  thumbnail: "-/scale_crop/160x160/center/-/quality/smart/",
  original: "",
};

type ImageVariant = keyof typeof variants;

export function getProfileImageURL(
  image: string | null | undefined,
  variant: ImageVariant = "original",
) {
  if (!image) return null;

  // already a usable URL (remote, bundled asset, blob/data) -> use as is
  if (/^(https?:|data:|blob:|\/)/.test(image)) return image;

  return `https://1p5nep1spk.ucarecd.net/${image}/${variants[variant]}`;
}

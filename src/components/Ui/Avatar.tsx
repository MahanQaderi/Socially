import avatar from "../../assets/avatar.png";
import { getProfileImageURL } from "../../utils/getProfileImgeURL";

type AvatarProps = {
  src?: string | null;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

function Avatar({
  src,
  width = 24,
  height = 24,
  alt = "User avatar",
  className = "",
}: AvatarProps) {
  function handleFallback(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;

    if (img.dataset.fallback) return;

    img.dataset.fallback = "true";
    img.src = avatar;
  }

  return (
    <img
      src={getProfileImageURL(src, "avatar") ?? avatar}
      width={width}
      height={height}
      style={{ width, height }}
      alt={alt}
      onError={handleFallback}
      loading="lazy"
      className={`shrink-0 rounded-full object-cover transition-opacity duration-300 ${className}`}
    />
  );
}

export default Avatar;

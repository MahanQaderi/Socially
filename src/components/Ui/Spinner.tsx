type SpinnerProps = {
  className?: string;
};

export function Spinner({ className = "" }: SpinnerProps) {
  return <div className={`spinner ${className}`} role="status" aria-label="Loading"></div>;
}

export function SpinnerMini({ className = "" }: SpinnerProps) {
  return <span className={`spinner-mini ${className}`} role="status" aria-label="Loading"></span>;
}

export function SpinnerXs({ className = "" }: SpinnerProps) {
  return <span className={`spinner-xs ${className}`} role="status" aria-label="Loading"></span>;
}

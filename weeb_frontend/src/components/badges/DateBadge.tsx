// ---------- DATE BADGE COMPONENT ---------- //
import { formatDate } from "../../core/utils/helpers";

interface IProps {
  date: string;
  className?: string;
}

export function DateBadge({
  date,
  className = "",
}: Readonly<IProps>): React.JSX.Element {
  return (
    <div
      className={`bg-midnight/80 rounded-lg px-2 py-1 backdrop-blur-md ${className}`}
    >
      <p className="text-[10px] font-medium tracking-wider uppercase">
        {formatDate(date)}
      </p>
    </div>
  );
}

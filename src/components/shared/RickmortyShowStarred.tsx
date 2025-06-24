// Tailwind CSS 코드 Cursor AI 참고
import { Star } from "lucide-react";

interface OwnProps {
  showStarred: boolean;
  setShowStarred(showStarred: boolean): void;
}

export function RickmortyShowStarred({
  showStarred,
  setShowStarred,
}: OwnProps) {
  const handleShowStarred = () => {
    setShowStarred(!showStarred);
  };

  const conditionalClasses = showStarred
    ? "shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] bg-neutral-100 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] dark:bg-neutral-100/40"
    : "shadow-sm";

  return (
    <div
      className={`p-2 border rounded-full ${conditionalClasses}`}
      onClick={handleShowStarred}
    >
      <Star size={20} />
    </div>
  );
}

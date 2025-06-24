import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OwnProps {
  name: string;
  disabled: boolean;
  handleNameChange: (newName: string) => void;
}

export function RickmortySearchField({
  name,
  disabled,
  handleNameChange,
}: OwnProps) {
  return (
    // Cursor AI 참고하여 수정 - Input 내에 Search 아이콘 들어가도록
    <div className="relative max-w-xs">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search size={18} />
      </span>
      <Input
        disabled={disabled}
        placeholder="Name"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

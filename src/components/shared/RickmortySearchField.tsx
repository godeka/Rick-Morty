import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OwnProps {
  name: string;
  handleNameChange: (newName: string) => void;
}

export function RickmortySearchField({ name, handleNameChange }: OwnProps) {
  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <Search />
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
    </div>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OwnProps {
  valueList: string[];
  disabled: boolean;
  handleValueChange: (newVal: string) => void;
}

export function RickmortySelect({
  valueList,
  disabled,
  handleValueChange,
}: OwnProps) {
  return (
    <Select
      disabled={disabled}
      onValueChange={(newVal) => handleValueChange(newVal)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">View All</SelectItem>
        {valueList.map((value, idx) => (
          <SelectItem key={idx} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

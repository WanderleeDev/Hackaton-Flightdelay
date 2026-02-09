import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseSelectFilterProps {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export default function BaseSelectFilter({
  value,
  onValueChange,
  placeholder,
  children,
}: BaseSelectFilterProps) {
  return (
    <Select value={value ?? "all"} onValueChange={onValueChange}>
      <SelectTrigger className="w-full sm:w-[150px] h-9">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="capitalize" value="all">
          {placeholder}
        </SelectItem>
        {children}
      </SelectContent>
    </Select>
  );
}

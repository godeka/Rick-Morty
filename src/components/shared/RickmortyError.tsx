import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface OwnProps {
  refetch(): void;
}

export function RickmortyError({ refetch }: OwnProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-[80vh]">
      <h3>데이터를 가져오는 중 에러가 발생했습니다.</h3>
      <Button onClick={() => refetch()}>
        <RefreshCcw /> 재시도
      </Button>
    </div>
  );
}

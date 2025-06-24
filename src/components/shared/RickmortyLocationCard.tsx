import type { LocationInfo } from "@/types/rickmorty.types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OwnProps {
  location?: LocationInfo;
}

// 1) location이 없는 경우: 스켈레톤 카드
// 2) location이 있는 경우: 일반 카드 (클릭 시 세부정보 다이얼로그 뜸)
export function RickmortyLocationCard({ location }: OwnProps) {
  if (!location)
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Skeleton className="h-16 w-48" />
          </CardDescription>
        </CardContent>
      </Card>
    );

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <CardTitle>{location.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{location.type}</CardDescription>
            <CardDescription>{location.dimension}</CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{location.name}</DialogTitle>
          <DialogDescription>Type: {location.type}</DialogDescription>
          <DialogDescription>Dimension: {location.dimension}</DialogDescription>
          <DialogDescription>
            Created: {location.created.split("T")[0]}
          </DialogDescription>
          <DialogDescription>
            Residents:
            <br />
            {location.residents.map((res, idx) =>
              idx < location.residents.length - 1 ? `${res.name}, ` : res.name
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

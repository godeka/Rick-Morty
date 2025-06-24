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
import { Star } from "lucide-react";

// 1) 스켈레톤 카드
export function RickmortyLocationSkeletonCard() {
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
}

// 2) 일반 카드 (클릭 시 세부정보 다이얼로그 뜸)
interface OwnProps {
  location: LocationInfo;
  starredList: LocationInfo[];
  setStarredList(starredList: LocationInfo[]): void;
}

export function RickmortyLocationCard({
  location,
  starredList,
  setStarredList,
}: OwnProps) {
  const starred = starredList.some((l) => l.id === location.id);

  // 즐겨찾기
  const handleClickStar = (loc: LocationInfo) => {
    const included = starredList.some((l) => l.id === loc.id);

    if (included) setStarredList(starredList.filter((l) => l.id !== loc.id));
    else setStarredList([...starredList, loc]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <CardTitle>{location.name}</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div
              className="absolute right-6 bottom-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleClickStar(location);
              }}
            >
              <Star fill={starred ? "currentColor" : "none"} />
            </div>
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

import type { EpisodeInfo } from "@/types/rickmorty.types";

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
export function RickmortyEpisodeSkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <Skeleton className="h-4 w-40" />
        </CardDescription>
      </CardContent>
    </Card>
  );
}

// 2) 일반 카드 (클릭 시 세부정보 다이얼로그 뜸)
interface OwnProps {
  episode: EpisodeInfo;
  starredList: EpisodeInfo[];
  setStarredList(starredList: EpisodeInfo[]): void;
}

export function RickmortyEpisodeCard({
  episode,
  starredList,
  setStarredList,
}: OwnProps) {
  const starred = starredList.some((e) => e.id === episode.id);

  // 즐겨찾기
  const handleClickStar = (ep: EpisodeInfo) => {
    const included = starredList.some((e) => e.id === ep.id);

    if (included) setStarredList(starredList.filter((e) => e.id !== ep.id));
    else setStarredList([...starredList, ep]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <CardTitle>{episode.name}</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div
              className="absolute right-6 bottom-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleClickStar(episode);
              }}
            >
              <Star fill={starred ? "currentColor" : "none"} />
            </div>
            <CardDescription>{episode.air_date}</CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{episode.name}</DialogTitle>
          <DialogDescription>Code: {episode.episode}</DialogDescription>
          <DialogDescription>Air date: {episode.air_date}</DialogDescription>
          <DialogDescription>
            Created: {episode.created.split("T")[0]}
          </DialogDescription>
          <DialogDescription>
            Characters:
            <br />
            {episode.characters.map((char, idx) =>
              idx < episode.characters.length - 1 ? `${char.name}, ` : char.name
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

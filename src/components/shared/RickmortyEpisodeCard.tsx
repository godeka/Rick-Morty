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

interface OwnProps {
  episode?: EpisodeInfo;
}

// 1) episode가 없는 경우: 스켈레톤 카드
// 2) episode가 있는 경우: 일반 카드 (클릭 시 세부정보 다이얼로그 뜸)
export function RickmortyEpisodeCard({ episode }: OwnProps) {
  if (!episode)
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

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <CardTitle>{episode.name}</CardTitle>
          </CardHeader>
          <CardContent>
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

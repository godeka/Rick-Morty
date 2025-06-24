import type { CharacterInfo } from "@/types/rickmorty.types";

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
export function RickmortyCharacterSkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-24" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-48 w-48" />
      </CardContent>
    </Card>
  );
}

// 2) 일반 카드 (클릭 시 세부정보 다이얼로그 뜸)
interface OwnProps {
  character: CharacterInfo;
  starredList: CharacterInfo[];
  setStarredList(list: CharacterInfo[]): void;
}

export function RickmortyCharacterCard({
  character,
  starredList,
  setStarredList,
}: OwnProps) {
  const starred = starredList.some((c) => c.id === character.id);

  // 즐겨찾기
  const handleClickStar = (char: CharacterInfo) => {
    const included = starredList.some((c) => c.id === char.id);

    if (included) setStarredList(starredList.filter((c) => c.id !== char.id));
    else setStarredList([...starredList, char]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader className="relative">
            <div
              className="absolute right-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleClickStar(character);
              }}
            >
              <Star fill={starred ? "currentColor" : "none"} />
            </div>
            <CardTitle>{character.name}</CardTitle>
            <CardDescription>{character.status}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={character.image} alt={character.name} />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{character.name}</DialogTitle>
          <DialogDescription>{character.status}</DialogDescription>
          <img src={character.image} alt={character.name} />
          <DialogDescription>Species: {character.species}</DialogDescription>
          {character.type && (
            <DialogDescription>Type: {character.type}</DialogDescription>
          )}
          <DialogDescription>Gender: {character.gender}</DialogDescription>
          <DialogDescription>
            Created: {character.created.split("T")[0]}
          </DialogDescription>
          <DialogDescription>
            Location: {character.location.name}
          </DialogDescription>
          <DialogDescription>
            Number of episodes appeared: {character.episode.length}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

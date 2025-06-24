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

interface OwnProps {
  character?: CharacterInfo;
}

// 1) character가 없는 경우: 스켈레톤 카드
// 2) character가 있는 경우: 일반 카드 (클릭 시 세부정보 다이얼로그 뜸)
export function RickmortyCharacterCard({ character }: OwnProps) {
  if (!character)
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

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
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

import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/characters";
import type { CharacterInfo } from "@/types/rickmorty.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Characters() {
  const { data, loading } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  return (
    <div>
      {loading
        ? Array.from({ length: 6 }).map((_) => (
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-[20px] w-[300px]" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-[20px] w-[100px]" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-[300px]" />
              </CardContent>
            </Card>
          ))
        : data?.characters.results.map((character: CharacterInfo) => (
            <Card>
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
                <CardDescription>{character.status}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={character.image} alt={character.name} />
              </CardContent>
            </Card>
          ))}
    </div>
  );
}

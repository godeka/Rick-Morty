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

export function Characters() {
  const { data: characters } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  return (
    <div>
      {characters?.characters.results.map((character: CharacterInfo) => (
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

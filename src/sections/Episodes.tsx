import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "@/graphql/episode";
import type { EpisodeInfo } from "@/types/rickmorty.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Episodes() {
  const { data } = useQuery(GET_EPISODES, {
    variables: { page: 1 },
  });

  return (
    <div>
      {data?.episodes.results.map((episode: EpisodeInfo) => (
        <Card>
          <CardHeader>
            <CardTitle>{episode.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{episode.air_date}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

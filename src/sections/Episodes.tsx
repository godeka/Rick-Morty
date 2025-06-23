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
import { Skeleton } from "@/components/ui/skeleton";

export function Episodes() {
  const { data, loading } = useQuery(GET_EPISODES, {
    variables: { page: 1 },
  });

  return (
    <div>
      {loading
        ? Array.from({ length: 6 }).map((_) => (
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-[20px] w-[100px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Skeleton className="h-[20px] w-[200px]" />
                </CardDescription>
              </CardContent>
            </Card>
          ))
        : data?.episodes.results.map((episode: EpisodeInfo) => (
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

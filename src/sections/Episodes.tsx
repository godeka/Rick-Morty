import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_EPISODES } from "@/graphql/episode";
import type { EpisodeInfo } from "@/types/rickmorty.types";
import { RickmortyPagination } from "@/components/shared/RickmortyPagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export function Episodes() {
  const [page, setPage] = useState<number>(1);

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_EPISODES,
    {
      variables: { page: 1 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
      refetch({ page: newPage });
    }
  };

  const isRefetching = networkStatus === NetworkStatus.refetch;

  if (loading || isRefetching)
    return (
      <div>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx}>
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
        ))}
      </div>
    );

  if (error && !loading)
    return (
      <div>
        <h3>데이터를 가져오는 중 에러가 발생했습니다.</h3>
        <Button onClick={() => refetch()}>
          <RefreshCcw /> 재시도
        </Button>
      </div>
    );

  return (
    <div>
      {data.episodes.results.map((episode: EpisodeInfo) => (
        <Card key={episode.id}>
          <CardHeader>
            <CardTitle>{episode.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{episode.air_date}</CardDescription>
          </CardContent>
        </Card>
      ))}
      <RickmortyPagination
        page={page}
        totalPages={data.episodes.info.pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_EPISODES } from "@/graphql/episode";
import type { EpisodeInfo } from "@/types/rickmorty.types";
import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import { RickmortyDialog } from "../shared/RickmortyDialog";
import { RickmortyReactiveGrid } from "../shared/RickmortyReactiveGrid";

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
  const [name, setName] = useState<string>("");

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_EPISODES,
    {
      variables: { page, name },
      notifyOnNetworkStatusChange: true,
    }
  );

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleNameChange = (newName: string) => {
    if (newName !== name) {
      setName(newName);
      setPage(1); //다시 1페이지로
    }
  };

  const isRefetching = networkStatus === NetworkStatus.refetch;

  let content;

  if (loading || isRefetching) {
    content = (
      <RickmortyReactiveGrid>
        {Array.from({ length: 20 }).map((_, idx) => (
          <Card key={idx}>
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
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error && !loading) {
    content = (
      <div className="flex flex-col gap-4 items-center justify-center w-full h-[80vh]">
        <h3>데이터를 가져오는 중 에러가 발생했습니다.</h3>
        <Button onClick={() => refetch()}>
          <RefreshCcw /> 재시도
        </Button>
      </div>
    );
  } else {
    content = (
      <RickmortyReactiveGrid>
        {data.episodes.results.map((episode: EpisodeInfo) => {
          const card = (
            <Card>
              <CardHeader>
                <CardTitle>{episode.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{episode.air_date}</CardDescription>
              </CardContent>
            </Card>
          );

          const descriptions = [
            `Code: ${episode.episode}`,
            `Air date: ${episode.air_date}`,
            `Created: ${episode.created.split("T")[0]}`,
            `Characters:`,
            `${episode.characters.map((char) => char.name)}`,
          ];

          return (
            <RickmortyDialog
              card={card}
              title={episode.name}
              descriptions={descriptions}
            />
          );
        })}
      </RickmortyReactiveGrid>
    );
  }

  return (
    <div>
      <div className="pl-4">
        <RickmortySearchField name={name} handleNameChange={handleNameChange} />
      </div>
      {content}
      <RickmortyPagination
        page={page}
        totalPages={data?.episodes.info.pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

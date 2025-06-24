import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_EPISODES } from "@/graphql/episode";
import type { EpisodeInfo } from "@/types/rickmorty.types";

import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import { RickmortyEpisodeCard } from "@/components/shared/RickmortyEpisodeCard";
import { RickmortyReactiveGrid } from "@/components/shared/RickmortyReactiveGrid";
import { RickmortyError } from "@/components/shared/RickmortyError";

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

  let content;

  if (loading || networkStatus === NetworkStatus.refetch) {
    content = (
      <RickmortyReactiveGrid>
        {Array.from({ length: 20 }).map((_, idx) => (
          <RickmortyEpisodeCard key={idx} />
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error && !loading) {
    content = <RickmortyError refetch={refetch} />;
  } else {
    content = (
      <RickmortyReactiveGrid>
        {data.episodes.results.map((episode: EpisodeInfo) => (
          <RickmortyEpisodeCard key={episode.id} episode={episode} />
        ))}
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

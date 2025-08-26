import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_EPISODES } from "@/graphql/episode";
import type { EpisodeInfo } from "@/types/rickmorty.types";

import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import {
  RickmortyEpisodeCard,
  RickmortyEpisodeSkeletonCard,
} from "@/components/shared/RickmortyEpisodeCard";
import { RickmortyReactiveGrid } from "@/components/shared/RickmortyReactiveGrid";
import { RickmortyError } from "@/components/shared/RickmortyError";
import { RickmortyShowStarred } from "@/components/shared/RickmortyShowStarred";
import { usePersistedState } from "@/hooks/usePersistedState";

export function Episodes() {
  const [page, setPage] = usePersistedState<number>("episodePage", 1);
  const [name, setName] = usePersistedState<string>("episodeName", "");

  // 즐겨찾기 관련
  const [showStarred, setShowStarred] = useState<boolean>(false);
  const [starredList, setStarredList] = usePersistedState<EpisodeInfo[]>(
    "episodeStarredList",
    []
  );

  const { data, previousData, loading, error, refetch } = useQuery(
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

  if (loading && !data) {
    content = (
      <RickmortyReactiveGrid>
        {Array.from({ length: 20 }).map((_, idx) => (
          <RickmortyEpisodeSkeletonCard key={idx} />
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error && !loading) {
    content = <RickmortyError refetch={refetch} />;
  } else {
    const showList = showStarred ? starredList : data.episodes.results;

    content = (
      <RickmortyReactiveGrid>
        {showList.map((episode: EpisodeInfo) => (
          <RickmortyEpisodeCard
            key={episode.id}
            episode={episode}
            starredList={starredList}
            setStarredList={setStarredList}
          />
        ))}
      </RickmortyReactiveGrid>
    );
  }

  const totalPages =
    data?.episodes?.info?.pages ?? previousData?.episodes?.info?.pages;

  return (
    <div>
      <div className="pl-4 flex gap-4">
        <RickmortySearchField
          disabled={showStarred}
          name={name}
          handleNameChange={handleNameChange}
        />
        <RickmortyShowStarred
          showStarred={showStarred}
          setShowStarred={setShowStarred}
        />
      </div>
      {content}
      {!showStarred && !error && totalPages > 1 && (
        <RickmortyPagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

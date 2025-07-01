import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { usePersistedState } from "@/hooks/usePersistedState";
import { GET_LOCATIONS } from "@/graphql/location";
import type { LocationInfo } from "@/types/rickmorty.types";

import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import {
  RickmortyLocationCard,
  RickmortyLocationSkeletonCard,
} from "@/components/shared/RickmortyLocationCard";
import { RickmortyReactiveGrid } from "@/components/shared/RickmortyReactiveGrid";
import { RickmortyError } from "@/components/shared/RickmortyError";
import { RickmortyShowStarred } from "@/components/shared/RickmortyShowStarred";

export function Locations() {
  const [page, setPage] = usePersistedState<number>("locationPage", 1);
  const [name, setName] = usePersistedState<string>("locationName", "");

  // 즐겨찾기 관련
  const [showStarred, setShowStarred] = useState<boolean>(false);
  const [starredList, setStarredList] = usePersistedState<LocationInfo[]>(
    "locationStarredList",
    []
  );

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_LOCATIONS,
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
        {Array.from({ length: 15 }).map((_, idx) => (
          <RickmortyLocationSkeletonCard key={idx} />
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error && !loading) {
    content = <RickmortyError refetch={refetch} />;
  } else {
    const showList = showStarred ? starredList : data.locations.results;

    content = (
      <RickmortyReactiveGrid>
        {showList.map((location: LocationInfo) => (
          <RickmortyLocationCard
            key={location.id}
            location={location}
            starredList={starredList}
            setStarredList={setStarredList}
          />
        ))}
      </RickmortyReactiveGrid>
    );
  }

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
      {!showStarred && (
        <RickmortyPagination
          page={page}
          totalPages={data?.locations.info.pages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

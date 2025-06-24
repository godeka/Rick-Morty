import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_LOCATIONS } from "@/graphql/location";
import type { LocationInfo } from "@/types/rickmorty.types";

import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import { RickmortyLocationCard } from "@/components/shared/RickmortyLocationCard";
import { RickmortyReactiveGrid } from "@/components/shared/RickmortyReactiveGrid";
import { RickmortyError } from "@/components/shared/RickmortyError";

export function Locations() {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");

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
          <RickmortyLocationCard key={idx} />
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error && !loading) {
    content = <RickmortyError refetch={refetch} />;
  } else {
    content = (
      <RickmortyReactiveGrid>
        {data.locations.results.map((location: LocationInfo) => (
          <RickmortyLocationCard key={location.id} location={location} />
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
        totalPages={data?.locations.info.pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

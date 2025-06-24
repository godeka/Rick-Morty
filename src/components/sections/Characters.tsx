import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_CHARACTERS } from "@/graphql/character";
import type { CharacterInfo } from "@/types/rickmorty.types";

import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import { RickmortySelect } from "@/components/shared/RickmortySelect";
import { RickmortyCharacterCard } from "@/components/shared/RickmortyCharacterCard";
import { RickmortyReactiveGrid } from "@/components/shared/RickmortyReactiveGrid";
import { RickmortyError } from "@/components/shared/RickmortyError";

const STATUS_LIST = ["Alive", "Dead", "unknown"];

export function Characters() {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>(""); // STATUS_LIST 중 하나의 값

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_CHARACTERS,
    {
      variables: { page, name, status },
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
      setPage(1); // 다시 1페이지로
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== status) {
      setStatus(newStatus === "all" ? "" : newStatus);
      setPage(1); // 다시 1페이지로
    }
  };

  let content;

  if (loading || networkStatus === NetworkStatus.refetch) {
    content = (
      <RickmortyReactiveGrid>
        {Array.from({ length: 12 }).map((_, idx) => (
          <RickmortyCharacterCard key={idx} />
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error) {
    content = <RickmortyError refetch={refetch} />;
  } else {
    content = (
      <RickmortyReactiveGrid>
        {data.characters.results.map((character: CharacterInfo) => (
          <RickmortyCharacterCard key={character.id} character={character} />
        ))}
      </RickmortyReactiveGrid>
    );
  }

  return (
    <div>
      <div className="pl-4 flex items-center gap-4">
        <RickmortySearchField name={name} handleNameChange={handleNameChange} />
        <RickmortySelect
          valueList={STATUS_LIST}
          handleValueChange={handleStatusChange}
        />
      </div>
      {content}
      <RickmortyPagination
        page={page}
        totalPages={data?.characters.info.pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

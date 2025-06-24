import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_CHARACTERS } from "@/graphql/character";
import type { CharacterInfo } from "@/types/rickmorty.types";

import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import { RickmortySelect } from "@/components/shared/RickmortySelect";
import {
  RickmortyCharacterCard,
  RickmortyCharacterSkeletonCard,
} from "@/components/shared/RickmortyCharacterCard";
import { RickmortyReactiveGrid } from "@/components/shared/RickmortyReactiveGrid";
import { RickmortyError } from "@/components/shared/RickmortyError";
import { RickmortyShowStarred } from "@/components/shared/RickmortyShowStarred";

const STATUS_LIST = ["Alive", "Dead", "unknown"];

export function Characters() {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>(""); // STATUS_LIST 중 하나 or ""

  // 즐겨찾기 관련
  const [showStarred, setShowStarred] = useState<boolean>(false);
  const [starredList, setStarredList] = useState<CharacterInfo[]>([]);

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
          <RickmortyCharacterSkeletonCard key={idx} />
        ))}
      </RickmortyReactiveGrid>
    );
  } else if (error) {
    content = <RickmortyError refetch={refetch} />;
  } else {
    const showList = showStarred ? starredList : data.characters.results;

    content = (
      <RickmortyReactiveGrid>
        {showList.map((character: CharacterInfo) => (
          <RickmortyCharacterCard
            key={character.id}
            character={character}
            starredList={starredList}
            setStarredList={setStarredList}
          />
        ))}
      </RickmortyReactiveGrid>
    );
  }

  return (
    <div>
      <div className="pl-4 flex items-center gap-4">
        <RickmortySearchField
          disabled={showStarred}
          name={name}
          handleNameChange={handleNameChange}
        />
        <RickmortySelect
          disabled={showStarred}
          valueList={STATUS_LIST}
          handleValueChange={handleStatusChange}
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
          totalPages={data?.characters.info.pages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

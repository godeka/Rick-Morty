import { useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_CHARACTERS } from "@/graphql/character";
import type { CharacterInfo } from "@/types/rickmorty.types";
import { RickmortyPagination } from "@/components/shared/RickmortyPagination";
import { RickmortySearchField } from "@/components/shared/RickmortySearchField";
import { RickmortySelect } from "../shared/RickmortySelect";
import { RickmortyDialog } from "../shared/RickmortyDialog";

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
      setStatus(newStatus);
      setPage(1); // 다시 1페이지로
    }
  };

  const isRefetching = networkStatus === NetworkStatus.refetch;

  let content;

  if (loading || isRefetching) {
    content = Array.from({ length: 6 }).map((_, idx) => (
      <Card key={idx}>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-[20px] w-[300px]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-[20px] w-[100px]" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-[300px]" />
        </CardContent>
      </Card>
    ));
  } else if (error && !loading) {
    content = (
      <>
        <h3>데이터를 가져오는 중 에러가 발생했습니다.</h3>
        <Button onClick={() => refetch()}>
          <RefreshCcw /> 재시도
        </Button>
      </>
    );
  } else {
    content = data.characters.results.map((character: CharacterInfo) => {
      const card = (
        <Card>
          <CardHeader>
            <CardTitle>{character.name}</CardTitle>
            <CardDescription>{character.status}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={character.image} alt={character.name} />
          </CardContent>
        </Card>
      );

      const description = (
        <>
          Species: {character.species}
          {character.type && ` / Type: ${character.type}`}
          <br />
          Gender: {character.gender}
          <br />
          Birthdate: {character.created.split("T")[0]}
          <br />
          Location: {character.location.name}
          <br />
          Number of episodes appeared: {character.episode.length}
        </>
      );

      return (
        <RickmortyDialog
          card={card}
          title={character.name}
          subtitle={character.status}
          description={description}
          imageUrl={character.image}
        />
      );
    });
  }

  return (
    <div>
      <RickmortySelect
        valueList={STATUS_LIST}
        handleValueChange={handleStatusChange}
      />
      <RickmortySearchField name={name} handleNameChange={handleNameChange} />
      {content}
      <RickmortyPagination
        page={page}
        totalPages={data?.characters.info.pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

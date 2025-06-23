import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/characters";
import type { CharacterInfo } from "@/types/rickmorty.types";

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

export function Characters() {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const isRefetching = networkStatus === NetworkStatus.refetch;

  if (loading || isRefetching)
    return (
      <div>
        {Array.from({ length: 6 }).map((_) => (
          <Card>
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
      {data?.characters.results.map((character: CharacterInfo) => (
        <Card>
          <CardHeader>
            <CardTitle>{character.name}</CardTitle>
            <CardDescription>{character.status}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={character.image} alt={character.name} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

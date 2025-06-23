import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "@/graphql/location";
import type { LocationInfo } from "@/types/rickmorty.types";

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

export function Locations() {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_LOCATIONS,
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
                <Skeleton className="h-[20px] w-[150px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <Skeleton className="h-[80px] w-[300px]" />
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
      {data?.locations.results.map((location: LocationInfo) => (
        <Card>
          <CardHeader>
            <CardTitle>{location.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{location.type}</CardDescription>
            <CardDescription>{location.dimension}</CardDescription>
            <CardDescription>{location.created}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

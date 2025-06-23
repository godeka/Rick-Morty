import { useQuery } from "@apollo/client";
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

export function Locations() {
  const { data, loading } = useQuery(GET_LOCATIONS, {
    variables: { page: 1 },
  });

  return (
    <div>
      {loading
        ? Array.from({ length: 6 }).map((_) => (
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
          ))
        : data?.locations.results.map((location: LocationInfo) => (
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

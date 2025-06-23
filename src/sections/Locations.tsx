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

export function Locations() {
  const { data } = useQuery(GET_LOCATIONS, {
    variables: { page: 1 },
  });

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

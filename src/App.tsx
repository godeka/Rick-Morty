import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./graphql/characters";
import { GET_LOCATIONS } from "./graphql/location";

import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CharacterInfo {
  id: number;
  image: string;
  name: string;
  status: string;
  gender: string;
  species: string;
  type: string;
  created: string;
}
interface LocationInfo {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Pick<CharacterInfo, "id">[];
  created: string;
}

function App() {
  const { data: characters } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });
  const { data: locations } = useQuery(GET_LOCATIONS, {
    variables: { page: 1 },
  });

  return (
    <div>
      <Tabs defaultValue="character" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="character">Character</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="episode">Episode</TabsTrigger>
        </TabsList>
        <TabsContent value="character">
          {characters?.characters.results.map((character: CharacterInfo) => (
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
        </TabsContent>
        <TabsContent value="location">
          {locations?.locations.results.map((location: LocationInfo) => (
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
        </TabsContent>
        <TabsContent value="episode">Episodes</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

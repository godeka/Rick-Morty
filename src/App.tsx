import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./graphql/characters";
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

function App() {
  const { data } = useQuery(GET_CHARACTERS, {
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
        </TabsContent>
        <TabsContent value="location">Locations</TabsContent>
        <TabsContent value="episode">Episodes</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

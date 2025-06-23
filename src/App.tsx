import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Characters } from "./components/sections/Characters";
import { Locations } from "./components/sections/Locations";
import { Episodes } from "./components/sections/Episodes";

function App() {
  return (
    <div>
      <Tabs defaultValue="character" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="character">Character</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="episode">Episode</TabsTrigger>
        </TabsList>
        <TabsContent value="character">
          <Characters />
        </TabsContent>
        <TabsContent value="location">
          <Locations />
        </TabsContent>
        <TabsContent value="episode">
          <Episodes />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

import { ThemeProvider, useTheme } from "@/components/theme-provider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "./components/ui/switch";
import { MoonStar } from "lucide-react";

import { usePersistedState } from "@/hooks/usePersistedState";
import { Characters } from "@/components/sections/Characters";
import { Locations } from "@/components/sections/Locations";
import { Episodes } from "@/components/sections/Episodes";

function App() {
  const [tab, setTab] = usePersistedState<string>("tab", "character");

  const handleTabChange = (newVal: string) => {
    setTab(newVal);
  };

  // Cusor AI 참고 - 다크모드 구현
  const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
      <div className="ml-5 flex gap-2 items-center">
        <MoonStar size={20} />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => {
            setTheme(checked ? "dark" : "light");
          }}
        />
      </div>
    );
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="p-4">
        <ThemeSwitcher />
        <Tabs value={tab} onValueChange={handleTabChange}>
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
    </ThemeProvider>
  );
}

export default App;

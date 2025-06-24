import { ThemeProvider, useTheme } from "@/components/theme-provider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Characters } from "./components/sections/Characters";
import { Locations } from "./components/sections/Locations";
import { Episodes } from "./components/sections/Episodes";
import { Switch } from "./components/ui/switch";

function App() {
  // Cusor AI 참고 - 다크모드 구현
  const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
      />
    );
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="p-4">
        <ThemeSwitcher />
        <Tabs defaultValue="character">
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

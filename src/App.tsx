import { useClipboard } from "./hooks/use-clipboard";
import { Home } from "./routes/Home";
import { Song } from "./routes/Song";

function App() {
  const clip = useClipboard();

  if (clip.isError || clip.data == null) {
    return <Home />;
  }

  return <Song />;
}

export default App;

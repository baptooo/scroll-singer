import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { LyricsForm } from "./routes/LyricsForm";
import { Song } from "./routes/Song";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route index path="/" element={<LyricsForm />} />
          <Route path="/song/:path" element={<Song />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./routes/Movie";
import Movies from "./routes/Movies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/:id" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

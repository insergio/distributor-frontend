import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Admin from './components/admin';
import Contributors from "./components/contributors"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contributors />} />
          <Route path="owner" element={ <Admin />} />
          <Route path="contributor" element={<Contributors />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

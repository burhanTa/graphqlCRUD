import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import  Blog  from "./pages/Blog";
import  BlogDetail  from "./pages/BlogDetail";

import { Modal } from "./components/Modal";

function App() {
console.log(import.meta.env)

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/BlogDetail/:slug" element={<BlogDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

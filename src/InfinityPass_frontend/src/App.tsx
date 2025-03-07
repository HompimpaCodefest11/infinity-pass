
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import News from "./pages/news";
import Subscription from "./pages/subscription";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/subscribe" element={<Subscription />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
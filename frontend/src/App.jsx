import { Routes, Route } from "react-router";
import Homepage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import PostPage from "./pages/PostPage";
import ProjectsPage from "./pages/ProjectPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
        </div>
    );
};

export default App;

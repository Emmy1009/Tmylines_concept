import React, { useState } from "react";
import { Link } from "react-router";

const ProjectsPage = () => {
    const projects = [
        {
            id: 1,
            title: "The Obsidian Villa",
            category: "Residential",
            year: "2024",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            title: "Skyline Corporate Hub",
            category: "Commercial",
            year: "2025",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
        },
        {
            id: 3,
            title: "Ethereal Glass House",
            category: "Modernist",
            year: "2023",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
        },
        {
            id: 4,
            title: "Monolith Museum",
            category: "Cultural",
            year: "2026",
            image: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80"
        },
        {
            id: 5,
            title: "The Linear Pavilion",
            category: "Public",
            year: "2024",
            image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80"
        },
        {
            id: 6,
            title: "Arctic Research Base",
            category: "Industrial",
            year: "2025",
            image: "https://images.unsplash.com/photo-1449156001935-d28bc3df726f?auto=format&fit=crop&q=80"
        }
    ];

    const [filter, setFilter] = useState("All");

    // FIX 1: Derive categories directly from the data so nothing is ever missing.
    // If you add a new project with a new category, it automatically appears in the filter.
    const categories = ["All", ...new Set(projects.map(p => p.category))];

    const filteredProjects =
        filter === "All"
            ? projects
            : projects.filter(p => p.category === filter);

    return (
        <div className="pt-32 min-h-screen bg-white">
            {/* --- Header Section --- */}
            <header className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-4">
                            Portfolio
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-none">
                            Selected{" "}
                            <span className="text-slate-300 italic font-medium">
                                Works.
                            </span>
                        </h1>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 border-b border-gray-100 pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-[10px] uppercase tracking-widest font-bold transition-all ${
                                    filter === cat
                                        ? "text-slate-900 scale-110"
                                        : "text-gray-400 hover:text-slate-600"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* --- Project Grid --- */}
            <main className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredProjects.map(project => (
                        // FIX 2: Changed /post/:id → /project/:id
                        // These are portfolio projects, not blog posts.
                        // Make sure your router has a matching <Route path="/project/:id" /> defined.
                        <Link
                            to={`/project/${project.id}`}
                            key={project.id}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-2xl transition-all duration-500 group-hover:shadow-indigo-100 group-hover:-translate-y-2">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                                    <p className="text-white text-xs font-black tracking-[0.3em] uppercase border border-white/30 px-6 py-3 rounded-full">
                                        View Project
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">
                                        {project.category}
                                    </p>
                                </div>
                                <span className="text-xs font-mono text-slate-300">
                                    /{project.year}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* --- Footer Call to Action --- */}
            <section className="bg-slate-50 py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 mb-6">
                        Want to see more?
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-10">
                        We bring complex structures to life.
                    </h2>
                    <Link
                        to="/contact"
                        className="px-12 py-5 bg-slate-900 text-white text-xs font-black rounded-full hover:bg-indigo-600 transition-all uppercase tracking-widest"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;

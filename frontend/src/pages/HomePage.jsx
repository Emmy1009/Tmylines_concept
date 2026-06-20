import instance from "../components/axios.js";
import { useState, useEffect } from "react";
import { Link } from "react-router"; // Import Link for navigation

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          setError(null)
          setLoading(true)
            try {
                const res = await instance.get("/post");
                // Accessing res.data.data as per your backend structure
                setPosts(res?.data?.data ?? []);
            } catch (e) {
                console.error("Fetch failed:", e);
                setError("Failed to load posts. Please try again later. " + e);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const SkeletonCard = () => (
        <div className="bg-gray-200 animate-pulse rounded-xl h-64 w-full"></div>
    );

    return (
        <div className="mt-20 min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* --- Hero Section --- */}
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
                        Discover New <span className="text-indigo-600">Insights.</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Explore the latest thoughts, projects, and updates from our community 
                        curated just for you.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* --- Error State --- */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* --- Posts Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        posts.map((post) => (
                            /* Wrapped in Link to make the whole card clickable */
                            <Link 
                                to={`/post/${post.id}`} 
                                key={post.id} 
                                className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="h-48 bg-indigo-100 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-indigo-300">
                                        <img 
                                            className="w-full h-full object-cover" 
                                            src={post.image_url} 
                                            alt={post.title} 
                                        />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-wider">
                                            Featured
                                        </span>
                                        <span className="text-gray-400 text-xs">5 min read</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                        {post.content.length > 35 ? post.content.slice(0,35)+ "…" : post.content || "Click to read more about this post and dive deeper into the details..."}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 inline-flex items-center transition-colors">
                                            Read More 
                                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* --- Empty State --- */}
                {!loading && posts.length === 0 && !error && (
                    <div className="text-center py-20">
                        <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                        <p className="text-gray-500">Check back later for new content!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;

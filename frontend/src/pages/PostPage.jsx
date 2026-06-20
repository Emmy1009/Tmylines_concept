import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import instance from "../components/axios.js";

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await instance.get(`/post/${id}`);
                setPost(res.data.data);
            } catch (e) {
                console.error("Error fetching post:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center font-mono text-gray-400">LOADING PROJECT...</div>;
    if (!post) return <div className="h-screen flex items-center justify-center">Project not found.</div>;

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* --- Navigation Bar --- */}
            <nav className="p-6 flex justify-between items-center border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <span className="text-xl font-black tracking-[0.3em]">TMYLINES</span>
                <button 
                    onClick={() => navigate("/")}
                    className="text-xs font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors"
                >
                    ← Back to Gallery
                </button>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                {/* --- Hero Image Section --- */}
                <section className="mb-16">
                    <div className="w-full h-[50vh] md:h-[70vh] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                            src={post.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>

                {/* --- Content Grid --- */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Side: Title & Description */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
                            {post.title}
                        </h1>
                        <div className="prose prose-lg text-gray-600 leading-relaxed">
                            {post.content || post.body}
                        </div>
                    </div>

                    {/* Right Side: Project Metadata */}
                    <div className="bg-slate-50 p-8 rounded-2xl h-fit border border-slate-100">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-indigo-600">
                            Project Details
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-bold">Category</p>
                                <p className="text-sm font-semibold">{post.category}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-bold">Location</p>
                                <p className="text-sm font-semibold">{post.location}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-bold">Year</p>
                                <p className="text-sm font-semibold">2026</p>
                            </div>
                            <button className="w-full mt-4 py-4 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest">
                                Inquire Project
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Footer Accent --- */}
                <footer className="mt-32 pt-12 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-xs tracking-widest uppercase">© {new Date().getFullYear()} TMYLINES STUDIO</p>
                </footer>
            </main>
        </div>
    );
};

export default PostPage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null); // Initialize to null
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((postData) => {
                if (postData) setPost(postData);
                else navigate("/");
            }).catch(() => navigate("/")); // Handle potential errors
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (post) { // Ensure post exists before deleting
            databaseService.deletePost(post.$id).then(() => {
                databaseService.deleteFile(post.featuredImage).then(() => {
                    navigate("/");
                }).catch(() => alert("Error deleting file.")); // Handle file deletion error
            }).catch(() => alert("Error deleting post.")); // Handle post deletion error
        }
    };


    if (!post) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-gray-500 text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <Container>
            <article className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Featured Image Section */}
                <div className="relative mb-8">
                    <img
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full rounded-2xl object-cover aspect-video shadow-lg" // aspect-video maintains aspect ratio
                        style={{ maxHeight: "500px" }} // Optional max height
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>  {/*Dark gradient overlay*/}
                </div>

                {/* Post Header */}
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-[#FCFCFF] mb-2">{post.title}</h1>
                    <div className="text-sm text-gray-500 flex items-center justify-between">
                        <span>By: Faiz</span> {/* Replace with actual author */}
                        <span>
                            {/* Edit/Delete Buttons (Conditional Rendering) */}
                            {isAuthor && (
                                <div className="flex space-x-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm" onClick={deletePost}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </span>
                    </div>
                </header>

                {/* Post Content */}
                <div className="prose prose-invert text-2xl max-w-none text-[#FCFCFF]">{parse(post.content)}</div>
            </article>
        </Container>
    );
}
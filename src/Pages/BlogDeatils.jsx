import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";


const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch("/blogs.json")
            .then(res => res.json())
            .then(data => {
                const selectedBlog = data.find(item => item.id === id);
                setBlog(selectedBlog);
            });
    }, [id]);

    if (!blog) {
        return <Spinner />;
    }

    return (
        <div className="w-10/12 mx-auto py-10">
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
            />

            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            <p className="text-gray-500 mb-6">
                {blog.author} • {blog.publishedDate}
            </p>

            <p className="text-lg leading-relaxed">{blog.content}</p>
        </div>
    );
};

export default BlogDetails;

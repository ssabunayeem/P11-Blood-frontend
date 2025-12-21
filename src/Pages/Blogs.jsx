import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/blogs.json")
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="w-11/12 mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-8">
                Blood Donation Blogs
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog.id} className="card bg-base-100 shadow-md">
                        <figure>
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="h-52 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h3 className="card-title">{blog.title}</h3>
                            <p>{blog.shortDescription}</p>

                            <div className="card-actions justify-end">
                                <Link
                                    to={`/blogs/${blog.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Show Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;

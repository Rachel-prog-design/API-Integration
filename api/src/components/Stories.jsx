import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Stories = () => {
    const { data: stories, isLoading, isError } = useQuery({
        queryKey: ["stories"],
        queryFn: () =>
            axios.get("https://student-management-system-backend.up.railway.app/api/stories")
                .then(res => res.data),
    });

    if (isLoading) return <p>Loading ...</p>;
    if (isError) return <p>Error fetching stories</p>;

    return (
        <div>
            <h2>All Stories</h2>

            {stories.map((story) => (
                <div key={story.id} className="flex flex-row gap-5">
                    <p>{story.authorName}</p>
                    <Link to={`/stories/${story.id}`}>
                        <button className="bg-blue-500 text-white p-3 mb-5">View Details</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Stories;
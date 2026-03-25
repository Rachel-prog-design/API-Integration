import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateStory = () => {
    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newStory) =>
            axios.post(
                "https://student-management-system-backend.up.railway.app/api/stories",
                newStory,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries(["stories"]);
            setAuthorName("");
            setContent("");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStory = { authorName, content };
        mutation.mutate(newStory);
    };

    return (
        <div className="p-4 border rounded max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Create Story</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Author Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    placeholder="Write your story here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {mutation.isPending ? "Creating..." : "Create Story"}
                </button>
            </form>

            {mutation.isError && (
                <p className="text-red-500 mt-2">Error creating story. Please try again.</p>
            )}
            {mutation.isSuccess && (
                <p className="text-green-500 mt-2">Story created successfully!</p>
            )}

            <Link to="/stories">
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                    View All Stories
                </button>
            </Link>
        </div>
    );
};

export default CreateStory;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://student-management-system-backend.up.railway.app/api/stories";

const StoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["story", id],
        queryFn: () =>
            axios.get(`${BASE_URL}/${id}`).then((res) => {
                setAuthorName(res.data.authorName);
                setContent(res.data.content);
                return res.data;
            }),
    });

    // PUT - update story
    const updateMutation = useMutation({
        mutationFn: (updatedStory) =>
            axios.put(`${BASE_URL}/${id}`, updatedStory),
        onSuccess: () => {
            queryClient.invalidateQueries(["story", id]);
            setIsEditing(false);
        },
    });

    // DELETE - delete story
    const deleteMutation = useMutation({
        mutationFn: () =>
            axios.delete(`${BASE_URL}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["stories"]);
            navigate("/stories");
        },
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        updateMutation.mutate({ authorName, content });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            deleteMutation.mutate();
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching story</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded">
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <h2 className="text-xl font-bold mb-4">Edit Story</h2>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="border p-2 mb-2 w-full"
                        placeholder="Author Name"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border p-2 mb-2 w-full"
                        placeholder="Story content"
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {updateMutation.isPending ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-2">{data.authorName}</h2>
                    <p className="mb-4">{data.content}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StoryDetails;
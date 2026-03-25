import React from "react";

const StoryDetails = () => {
    const { id } = useParams();

    const { data, isLoading, error} = useQuery({
        queryKey: ["story", id],
        queryFn: () =>
            axios.get ( 'https://student-management-system-backend.up.railway.app/api/stories/${id}')
                .then(res => res.data),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching story</p>;

    return (
        <div>
            <h2> {data.authorName}</h2>
            <p> {data.content}</p>
        </div>
    ); 
};

    export default StoryDetails;
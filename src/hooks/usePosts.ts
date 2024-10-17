import { axiosClient } from "@/lib/axiosconfig";
import { useRecoilState } from "recoil";
import { posts } from "@/Recoil/user";
import { useState } from "react";

const usePosts = () => {
    const [postsState, setPostsState] = useRecoilState(posts);
    const [isLoading, setIsLoading] = useState(false); // State for loading
    const [error, setError] = useState<string | null>(null); // State for errors

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true); // Start loading
            setError(null); // Reset error

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (token) {
                const response = await axiosClient.get("/post/allPost", { headers });
                console.log(response.data);
                setPostsState(response.data); // Update posts state
            } else {
                throw new Error("No token found");
            }

        } catch (error) {
            setError("Error fetching user profile"); // Set error
            console.error("Error fetching user profile:", error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    console.log(postsState);

    return { fetchUserProfile, isLoading, error }; // Return loading and error states
};

export default usePosts;

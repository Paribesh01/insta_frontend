
import { axiosClient } from "@/lib/axiosconfig";

const useFeed = () => {


    const fetchFeed = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            if (token) {
                console.log("fedding ")
                const response = await axiosClient.get(`/post/feed`, { headers });
                console.log(response.data)
                return response.data
            }

        } catch (error) {
            console.error("Error fetching post:", error);

        }
    };



    return { fetchFeed };
};

export default useFeed;


import { axiosClient } from "@/lib/axiosconfig";

const usePost = () => {


    const fetchPost = async (id: string) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            if (token) {
                console.log("postinnggg")
                const response = await axiosClient.get(`post/${id}`, { headers });
                console.log(response.data)
                return response.data
            }

        } catch (error) {
            console.error("Error fetching post:", error);

        }
    };



    return { fetchPost };
};

export default usePost;

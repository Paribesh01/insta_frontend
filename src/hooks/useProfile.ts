import { user } from "@/Recoil/user";
import { axiosClient } from "@/lib/axiosconfig";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useFetchUserProfile = () => {
    const [userData, setUserData] = useRecoilState(user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const fetchUserProfile = async () => {
            try {

                const response = await axiosClient.get("/user/me", { headers });
                setUserData(prev => ({
                    ...prev,
                    ...response.data, // Directly access response.data
                    _count: response.data._count,
                    userPreferences: response.data.userPreferences,
                }));
            } catch (error) {
                console.error("Error fetching user profile:", error);

            }
        };
        if (token) { // Check if token exists
            fetchUserProfile();
        }
    }, [setUserData]);

    return { userData };
};

export default useFetchUserProfile;

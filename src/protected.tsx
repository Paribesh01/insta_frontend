import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "./lib/axiosconfig";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { currentUser } from "./Recoil/user";

interface ProtectedProps {
    children: React.ReactNode;
}
export function Protected({ children }: ProtectedProps) {
    const navigate = useNavigate();
    const [currentUserr, setCurrentUserr] = useRecoilState(currentUser);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        const profile = async () => {
            const user = await axiosClient
                .get("/auth/me", { headers })
                .catch((err: AxiosError) => {
                    if (err.response?.status) {
                        localStorage.removeItem("token");
                        toast.error("You are not logged in")
                        navigate("/login");
                    }
                }) as AxiosResponse;
            setCurrentUserr(user.data);
        };

        profile();
    }, [0]);
    if (!localStorage.getItem("token")) {
        return <Navigate to={"/login"} />;
    } else {
        return <>{children}; </>;
    }
}
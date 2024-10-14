import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "./lib/axiosconfig";
import { toast } from "react-toastify";

interface ProtectedProps {
    children: React.ReactNode;
}
export function Protected({ children }: ProtectedProps) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        const profile = async () => {
            (await axiosClient
                .get("/auth/me", { headers })
                .catch((err: AxiosError) => {
                    if (err.response?.status) {
                        localStorage.removeItem("token");
                        toast.error("You are not logged in")
                        navigate("/login");
                    }
                })) as AxiosResponse;

        };
        profile();
    }, [0]);
    if (!localStorage.getItem("token")) {
        return <Navigate to={"/login"} />;
    } else {
        return <>{children}; </>;
    }
}
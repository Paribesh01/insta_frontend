

export function useLogout() {
    const logout = async () => {
        try {
            localStorage.removeItem("token")
            return { success: true }
        } catch (e: any) {
            return { message: "Error while logout" }
        }
    };

    return { logout };
}

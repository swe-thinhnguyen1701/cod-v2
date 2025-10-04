import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Login from "../components/Login";
import { useAuthStore } from "../state-management/authStore";

const AuthPage = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    if (isLoggedIn) return null;

    return (
        <Box as="section">
            <Login />
        </Box>
    )
}

export default AuthPage;
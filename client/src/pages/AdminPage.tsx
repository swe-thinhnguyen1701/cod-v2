import { Box } from "@chakra-ui/react";
import AdminDashboard from "../components/AdminDashboard";
import { useAuthStore } from "../state-management/authStore";
import { useEffect } from "react";
import AccessDeny from "../components/admin/AccessDeny";
import Spinner from "../components/Spinner";

const AdminPage = () => {
    const { user, loading, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if(loading)
        return <Spinner />

    if (!user || !user.isAdmin)
        return <AccessDeny />

    return (
        <Box>
            <AdminDashboard />
        </Box>
    )
}

export default AdminPage;
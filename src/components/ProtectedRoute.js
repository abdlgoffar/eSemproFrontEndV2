import React, { useState } from 'react';
import { useSession } from "../contexts/SessionContext";
import { get } from "../api/users";
import NotFound from '../pages/NotFound';



const ProtectedRoute = ({ children }) => {
    const { token } = useSession();
    const [role, setRole] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const load = async () => {
        if (token) {
            try {
                const response = await get(token);
                setRole(response.data.role);
                setIsAuthorized(true);
                setLoading(true);
            } catch (error) {
                console.error("Error fetching user role:", error);
                setIsAuthorized(false);
                setLoading(true);
            }
        }
    };
    load();

    const slug = window.location.pathname.split("/")[1];
    if (isAuthorized === true && role === slug) {
        return children;
    }

    if (loading || !token) {
        return (
            <NotFound />
        )
    }

};

export default ProtectedRoute;

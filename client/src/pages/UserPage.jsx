import { useAuthContext } from "../context/AuthContext";

const UserPage = ({children}) => {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate to="/login" />;
    }

};

export default UserPage;
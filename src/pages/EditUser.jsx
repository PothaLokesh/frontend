import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import UserForm from "../components/UserForm";
import { getUser, updateUser } from "../services/user.service";
import { toast } from "react-toastify";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const res = await getUser(id);
            setUser(res.data);
        } catch (error) {
            toast.error("Failed to load user");
        }
    };

    const onSubmit = async (data) => {
        try {
            await updateUser(id, data);
            toast.success("User updated successfully");
            navigate("/");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" sx={{ my: 2 }}>
                Edit User Details
            </Typography>

            {user && (
                <UserForm
                    onSubmit={onSubmit}
                    defaultValues={{
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    }}
                />
            )}
        </Container>
    );
}

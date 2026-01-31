import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import UserView from "../components/UserView";
import { getUser } from "../services/user.service";
import { toast } from "react-toastify";

export default function ViewUser() {
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

    return (
        <Container>
            <Typography variant="h6" sx={{ mt: 2 }}>
                View User Details
            </Typography>

            {user && <UserView user={user} />}

            <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
            >
                Back
            </Button>
        </Container>
    );
}

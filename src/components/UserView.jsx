import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Stack
} from "@mui/material";

export default function UserView({ user }) {
    return (
        <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography variant="h6">{user.name}</Typography>

                    <Typography>Email: {user.email}</Typography>
                    <Typography>Phone: {user.phone}</Typography>
                    <Typography>Status: {user.role}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

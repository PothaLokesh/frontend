import { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import UserTable from "../components/UserTable";
import { getUsers, searchUsers, exportCsv } from "../services/user.service";

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const loadUsers = async () => {
        const res = await getUsers();
        setUsers(res.data.users);
    };

    const handleSearch = async () => {
        const res = await searchUsers(search);
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <Container>
            <Typography variant="h6" sx={{ mt: 2 }}>
                MERN Stack Developer Practical Task
            </Typography>

            <TextField
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mr: 1 }}
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>

            <Button
                variant="contained"
                color="success"
                sx={{ float: "right", ml: 1 }}
                href="/add"
            >
                + Add User
            </Button>

            <Button
                variant="contained"
                color="secondary"
                sx={{ float: "right" }}
                onClick={exportCsv}
            >
                Export to CSV
            </Button>

            <UserTable users={users} reload={loadUsers} />
        </Container>
    );
}

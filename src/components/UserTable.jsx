import {
    Table, TableBody, TableCell, TableHead, TableRow,
    IconButton
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteUser } from "../services/user.service";
import { toast } from "react-toastify";

export default function UserTable({ users, reload }) {
    const handleDelete = async (id) => {
        await deleteUser(id);
        toast.success("User deleted");
        reload();
    };

    return (
        <Table sx={{ mt: 2 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {users.map((u) => (
                    <TableRow key={u._id}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.phone}</TableCell>
                        <TableCell>{u.role}</TableCell>
                        <TableCell>
                            <IconButton href={`/view/${u._id}`}>View</IconButton>
                            <IconButton href={`/edit/${u._id}`}>Edit</IconButton>
                            <IconButton onClick={() => handleDelete(u._id)}>
                                Delete
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

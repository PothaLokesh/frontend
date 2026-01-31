import { Routes, Route } from "react-router-dom";
import ListUsers from "../pages/ListUsers";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import ViewUser from "../pages/ViewUser";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ListUsers />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/view/:id" element={<ViewUser />} />
        </Routes>
    );
}

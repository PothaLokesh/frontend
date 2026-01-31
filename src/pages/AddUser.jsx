import UserForm from "../components/UserForm";
import { createUser } from "../services/user.service";
import { toast } from "react-toastify";

export default function AddUser() {
    const onSubmit = async (data) => {
        await createUser(data);
        toast.success("User added");
        window.location.href = "/";
    };

    return <UserForm onSubmit={onSubmit} />;
}

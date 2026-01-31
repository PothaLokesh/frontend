import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../utils/validation";

export default function UserForm({ onSubmit, defaultValues }) {
    const { register, handleSubmit, formState: { errors } } =
        useForm({
            resolver: yupResolver(userSchema),
            defaultValues
        });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Full Name"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Email"
                fullWidth
                {...register("email")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Phone"
                fullWidth
                {...register("phone")}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Role"
                fullWidth
                {...register("role")}
                sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained">
                Submit
            </Button>
        </form>
    );
}

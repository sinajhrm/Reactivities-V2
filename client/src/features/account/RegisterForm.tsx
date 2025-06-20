import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import {
  registerSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { useState } from "react";
import RegisterSuccess from "./RegisterSuccess";

export default function RegisterForm() {
  const { registerUser } = useAccount();
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });
  const email = watch("email");

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes("Email"))
              setError("email", {
                message: err,
              });
            else if (err.includes("Password"))
              setError("password", { message: err });
          });
        }
      },
      onSuccess: () => setRegisterSuccess(true),
    });
  };

  return (
    <>
      {registerSuccess ? (
        <RegisterSuccess email={email} />
      ) : (
        <Paper
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
            gap: 3,
            maxWidth: "md",
            mx: "auto",
          }}
        >
          <Box
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            color={"secondary.main"}
          >
            <LockOpen fontSize="large" />
            <Typography variant="h4">Register</Typography>
          </Box>
          <TextInput label="email" control={control} name="email" />
          <TextInput
            label="Display Name"
            control={control}
            name="displayName"
          />
          <TextInput
            label="password"
            type="password"
            control={control}
            name="password"
          />
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="contained"
            size="large"
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?!
            <Typography component={Link} ml={1} to={"/login"} color="primary">
              Sign in
            </Typography>
          </Typography>
        </Paper>
      )}
    </>
  );
}

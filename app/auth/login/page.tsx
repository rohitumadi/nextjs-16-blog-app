"use client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { logInSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof logInSchema>) => {
    setIsLoading(true);

    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push("/");
          setIsLoading(false);
        },
        onError: (error) => {
          toast.error(error.error.message);
          setIsLoading(false);
        },
      },
    });
  };

  const onGuestLogin = async () => {
    form.setValue("email", "guest@example.com");
    form.setValue("password", "password1234");
    await form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Log in to your account</CardDescription>
        <CardAction>
          <Button asChild className="cursor-pointer" variant="link">
            <Link href="/auth/sign-up">Sign up</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="password"
                      type="password"
                      placeholder="*****"
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Log In"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={onGuestLogin}
            disabled={isLoading}
          >
            Guest Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default LoginPage;

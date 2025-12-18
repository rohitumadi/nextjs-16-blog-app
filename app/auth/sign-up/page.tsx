"use client";
import { sigUpSchema } from "@/app/schemas/auth";
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
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(sigUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof sigUpSchema>) => {
    setIsLoading(true);
    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Sign up successful");
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

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
        <CardAction>
          <Button asChild className="cursor-pointer" variant="link">
            <Link href="/auth/login">Log in</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="name"
                      type="text"
                      placeholder="John Doe"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
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
          <Button type="submit" className="w-full cursor-pointer">
            {isLoading ? <Spinner /> : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpPage;

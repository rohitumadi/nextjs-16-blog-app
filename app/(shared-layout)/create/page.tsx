"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/app/schemas/blog";
import z from "zod";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof postSchema>) => {};

  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Write something amazing.
        </p>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Share your thoughts with the world.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        aria-invalid={fieldState.invalid}
                        id="title"
                        type="text"
                        {...field}
                      />
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        aria-invalid={fieldState.invalid}
                        id="content"
                        {...field}
                      />
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {isLoading ? <Spinner /> : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreatePost;

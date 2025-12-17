"use client";
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { commentSchema } from "@/app/schemas/comment";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import z from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const CommentsSection = () => {
  const params = useParams<{ postId: Id<"posts"> }>();
  const postId = params.postId;
  const comments = useQuery(api.comments.getCommentsByPostId, { postId });
  const [isLoading, setIsLoading] = useState(false);
  const createComment = useMutation(api.comments.createComment);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      postId: postId,
    },
  });
  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    setIsLoading(true);
    try {
      await createComment(data);
      toast.success("Comment added successfully");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    } finally {
      setIsLoading(false);
    }
  };

  const commentCount = comments?.length || 0;
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-lg font-semibold">{commentCount} Comments</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label htmlFor="content">Comment</Label>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      id="content"
                      placeholder="Write your comment here..."
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </Field>
                )}
              />
            </div>
            <Button type="submit" className="cursor-pointer">
              {isLoading ? <Spinner /> : "Add Comment"}
            </Button>
          </div>
        </form>
        <section className="mt-6 flex flex-col gap-2">
          {comments?.map((comment) => (
            <div className="flex gap-2 justify-between" key={comment._id}>
              <div className="flex gap-2 ">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${comment.authorName}`}
                  />
                  <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
                </Avatar>
                <p>{comment.content}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment._creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};
export default CommentsSection;

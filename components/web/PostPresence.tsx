"use client";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface PostPresenceProps {
  roomId: Id<"posts">;
  userId: string;
}

const PostPresence = ({ roomId, userId }: PostPresenceProps) => {
  const presenceState = usePresence(api.presence, roomId, userId);
  return (
    <div className="flex items-center gap-2 ">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Viewing now
      </p>
      <div className="text-black">
        <FacePile presenceState={presenceState || []} />
      </div>
    </div>
  );
};
export default PostPresence;

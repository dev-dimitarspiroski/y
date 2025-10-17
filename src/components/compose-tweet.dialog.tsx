"use client";

import { useState } from "react";
import ComposeTweet from "./compose-tweet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function ComposeTweetDialog({
  isReply,
  isModalOpen,
  repliedToId,
  onClose = () => void 0,
}: {
  isReply: boolean;
  isModalOpen: boolean;
  repliedToId?: string;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(isModalOpen);

  return (
    <Dialog
      defaultOpen
      open={open}
      onOpenChange={() => {
        setOpen(!isModalOpen);
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compose a tweet</DialogTitle>
        </DialogHeader>
        <ComposeTweet
          isReply={isReply}
          repliedToId={repliedToId ?? ""}
          onSubmit={() => setOpen(false)}
        ></ComposeTweet>
      </DialogContent>
    </Dialog>
  );
}

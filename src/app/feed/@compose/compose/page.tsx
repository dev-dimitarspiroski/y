"use client";

import ComposeTweet from "@/components/compose-tweet";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compose a tweet</DialogTitle>
        </DialogHeader>
        <ComposeTweet onSubmit={() => router.back()}></ComposeTweet>
      </DialogContent>
    </Dialog>
  );
}

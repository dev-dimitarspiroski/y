"use client";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format-date"; // your function

export function TweetDate({ createdAt }: { createdAt: string | Date }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(formatDate(createdAt));
  }, [createdAt]);

  return <span>{formattedDate}</span>;
}

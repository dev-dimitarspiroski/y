"use client";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Posts from "./posts";
import Replies from "./replies";
import Likes from "./likes";

enum TabsValue {
  Posts = "Posts",
  Replies = "Replies",
  Likes = "Likes",
}

export default function TweetsSection({ userId }: { userId: string }) {
  const [selectedTab, setSelectedTab] = useState<TabsValue>(TabsValue.Posts);

  return (
    <Tabs
      defaultValue={selectedTab}
      onValueChange={(value) => setSelectedTab(value as TabsValue)}
    >
      <TabsList>
        <TabsTrigger
          value={TabsValue.Posts}
          className={cn(
            "py-3 px-5 cursor-pointer",
            selectedTab === TabsValue.Posts &&
              "font-black border-b-4 border-blue-400",
            selectedTab !== TabsValue.Posts && "text-slate-400"
          )}
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value={TabsValue.Replies}
          className={cn(
            "py-3 px-5 cursor-pointer",
            selectedTab === TabsValue.Replies &&
              "font-black border-b-4 border-blue-400",
            selectedTab !== TabsValue.Replies && "text-slate-400"
          )}
        >
          Replies
        </TabsTrigger>
        <TabsTrigger
          value={TabsValue.Likes}
          className={cn(
            "py-3 px-5 cursor-pointer",
            selectedTab === TabsValue.Likes &&
              "font-black border-b-4 border-blue-400", // Highlight the selected tab.
            selectedTab !== TabsValue.Likes && "text-slate-400" // Dim unselected tabs.
          )}
        >
          Likes
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TabsValue.Posts}>
        <Posts userId={userId} />
      </TabsContent>
      <TabsContent value={TabsValue.Replies}>
        <Replies userId={userId} />
      </TabsContent>
      <TabsContent value={TabsValue.Likes}>
        <Likes userId={userId} />
      </TabsContent>
    </Tabs>
  );
}

"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
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
      {/* Tab triggers for switching between Posts, Replies and Likes */}
      <TabsList>
        <TabsTrigger
          value={TabsValue.Posts}
          className={cn(
            "py-3 px-5 cursor-pointer",
            selectedTab === TabsValue.Posts &&
              "font-black border-b-4 border-blue-400", // Highlight the selected tab.
            selectedTab !== TabsValue.Posts && "text-slate-400" // Dim unselected tabs.
          )}
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value={TabsValue.Replies}
          className={cn(
            "py-3 px-5 cursor-pointer",
            selectedTab === TabsValue.Replies &&
              "font-black border-b-4 border-blue-400", // Highlight the selected tab.
            selectedTab !== TabsValue.Replies && "text-slate-400" // Dim unselected tabs.
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
      {/* Tabs content: show the corresponding component based on selected tab */}
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

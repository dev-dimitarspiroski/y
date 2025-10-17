"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

enum TabsValue {
  ForYou = "for-you",
  Following = "following",
}

type FeedLayoutProps = {
  children: ReactNode;
  compose: ReactNode;
};

export default function FeedLayout({ children, compose }: FeedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const defaultTab = pathname.includes(TabsValue.ForYou as string)
    ? TabsValue.ForYou
    : TabsValue.Following;
  const [selectedTab, setSelectedTab] = useState<TabsValue>(defaultTab);

  return (
    <Tabs
      defaultValue={defaultTab}
      onValueChange={(value) => {
        setSelectedTab(value as TabsValue);
        router.push(`/feed/${value}`);
      }}
      className="w-full"
    >
      <TabsList className="border-b-1 border-gray-600">
        <TabsTrigger
          value={TabsValue.ForYou}
          className={cn(
            "py-3 px-5",
            selectedTab === TabsValue.ForYou &&
              "font-black border-b-4 border-blue-400",
            selectedTab !== TabsValue.ForYou && "text-slate-400"
          )}
        >
          For You
        </TabsTrigger>
        <TabsTrigger
          value={TabsValue.Following}
          className={cn(
            "py-3 px-5",
            selectedTab === TabsValue.Following &&
              "font-black border-b-4 border-blue-400",
            selectedTab !== TabsValue.Following && "text-slate-400"
          )}
        >
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TabsValue.ForYou}>{children}</TabsContent>
      <TabsContent value={TabsValue.Following}>{children}</TabsContent>
      {compose}
    </Tabs>
  );
}

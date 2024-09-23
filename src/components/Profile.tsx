import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Grid, Bookmark } from "lucide-react";
import PostGrid from "./PostGrid";

export default function Profile() {
  const [posts, setPosts] = useState<string[]>([
    "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  ]);

  const randomFollowers = Math.floor(Math.random() * 10000) + 100;
  const randomFollowing = Math.floor(Math.random() * 1000) + 50;

  return (
    <div className="bg-white text-gray-900 min-h-screen p-4 mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Avatar className="w-48 h-48 border-2 border-gray-300">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80&text=JD"
              alt="@johndoe"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 ml-16">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-semibold">johndoe</h1>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-900 border-gray-300"
              >
                ...
              </Button>
            </div>
            <div className="flex space-x-2 mt-8 mb-4">
              <Button variant="default" size="lg" className="flex-1">
                Follow
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-gray-300"
              >
                Message
              </Button>
            </div>
            <div className="flex space-x-4 mb-4 text-lg">
              <span>
                <strong>{posts.length}</strong> posts
              </span>
              <span>
                <strong>{randomFollowers.toLocaleString()}</strong> followers
              </span>
              <span>
                <strong>{randomFollowing.toLocaleString()}</strong> following
              </span>
            </div>
            <div className="text-lg">
              <p className="font-semibold">John Doe</p>
              <p>Digital creator</p>
              <p>Capturing life's moments one click at a time 📸</p>
              <a
                href="https://johndoe.com"
                className="text-blue-900 font-semibold"
              >
                johndoe.com
              </a>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full bg-transparent border-t border-b border-gray-300">
            <TabsTrigger
              value="posts"
              className="flex-1 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-t-2 data-[state=active]:border-gray-900"
            >
              <Grid className="h-4 w-4 mr-2" />
              POSTS
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="flex-1 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-t-2 data-[state=active]:border-gray-900"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              SAVED
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-4">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Camera className="h-16 w-16 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Share Photos</h2>
                <p className="text-center">
                  When you share photos, they will appear on your profile.
                </p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    setPosts([
                      "/placeholder.svg?height=300&width=300&text=New+Post",
                    ])
                  }
                >
                  Share your first photo
                </Button>
              </div>
            ) : (
              <PostGrid posts={posts} />
            )}
          </TabsContent>
          <TabsContent value="saved">Saved content</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

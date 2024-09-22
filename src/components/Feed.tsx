import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Post {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  likes: number;
  caption: string;
  comments: { user: string; text: string }[];
}

function InstagramPost({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment("");
  };

  return (
    <Card className="mb-6 max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>
              {post.user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold">{post.user.username}</span>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <img src={post.image} alt="Post" className="w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex justify-between w-full mb-4">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart
                className={`h-6 w-6 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={`h-6 w-6 ${isSaved ? "fill-black" : ""}`} />
          </Button>
        </div>
        <p className="font-semibold mb-2">
          {post.likes.toLocaleString()} likes
        </p>
        <p>
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </p>
        {post.comments.map((comment, index) => (
          <p key={index} className="mt-1 text-sm text-gray-500">
            <span className="font-semibold mr-2">{comment.user}</span>
            {comment.text}
          </p>
        ))}
        <form onSubmit={handleComment} className="w-full mt-4">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full"
          />
        </form>
      </CardFooter>
    </Card>
  );
}

export default function Feed() {
  const posts: Post[] = [
    {
      id: 1,
      user: {
        username: "johndoe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg",
      likes: 1234,
      caption: "Enjoying a beautiful day! ☀️ #sunshine",
      comments: [
        { user: "janedoe", text: "Looks amazing!" },
        { user: "mike123", text: "Wish I was there!" },
      ],
    },
    {
      id: 2,
      user: {
        username: "sarahsmith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg",
      likes: 5678,
      caption: "New recipe alert! 🍳 #foodie",
      comments: [
        { user: "foodlover", text: "Yum! Recipe please!" },
        { user: "chefjamie", text: "Looks delicious!" },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-xl mx-auto px-4">
        {posts.map((post) => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

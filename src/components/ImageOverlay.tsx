import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Send, ChevronLeft, ChevronRight } from "lucide-react";
import usePost from '@/hooks/usePost';
import { axiosClient } from '@/lib/axiosconfig';

interface UserPreferences {
  imageUrl: string; // URL of the user's profile image
}

interface CommentedBy {
  username: string; // The username of the user who commented
  userPreferences: UserPreferences; // User preferences that include the image URL
}

interface Comment {
  id: string; // Unique identifier for the comment
  content: string; // Content of the comment
  commentedBy: CommentedBy; // Information about the user who made the comment
}

interface Post {
  id: string; // Unique identifier for the post
  imagesUrl: string[]; // Array of image URLs associated with the post
  _count: {
    likes: number; // Number of likes on the post
    Comment: number; // Number of comments on the post
  };
  Comment: Comment[]; // Array of comments on the post
}




export default function ImageOverlay({ isOpen, onClose, postId }: { isOpen: boolean; onClose: () => void; postId: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false); // State to track if the post is liked
  const { fetchPost } = usePost();

  // Fetch the post when the postId changes
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchPost(postId);
      setPost(res); // Set the post data once fetched

      // Check if the post is liked by the current user
      const likedResponse = await axiosClient.get(`/post/isLiked/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,

        },
      });
      console.log(likedResponse.data)

      setIsLiked(likedResponse.data); // Update state if liked
    };

    if (postId) {
      fetch();
    }
  }, [postId]);

  // Handle new comment submission
  const handelComment = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = { comment: newComment };

    try {
      await axiosClient.post(`/comment/${postId}`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setNewComment("");
      const res = await fetchPost(postId);  // Fetch updated post comments
      setPost(res); // Update post without affecting dialog open state

    } catch (error) {
      console.error("Error sending comment:", error);
    }
  }, [postId, newComment]);


  // Handle like/unlike feature
  const toggleLike = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      if (isLiked) {
        // Unlike the post if already liked
        await axiosClient.post(`/post/unlike/${postId}`, {}, { headers });
        setIsLiked(false);
        setPost((prevPost: any) => ({
          ...prevPost,
          _count: {
            ...prevPost!._count,
            likes: prevPost!._count.likes - 1,
          },
        }));
      } else {
        // Like the post if not already liked
        await axiosClient.post(`/post/like/${postId}`, {}, { headers });
        setIsLiked(true);
        setPost((prevPost: any) => ({
          ...prevPost,
          _count: {
            ...prevPost!._count,
            likes: prevPost!._count.likes + 1,
          },
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }, [isLiked, postId]);

  if (!post) return null; // Handle when post is null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] h-[80vh] p-0 flex">
        <div className="w-2/3 h-full relative">
          <img
            src={post.imagesUrl[currentImageIndex]}
            alt={`Post image ${currentImageIndex + 1}`}
            className="object-cover w-full h-full"
          />
          {post.imagesUrl.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setCurrentImageIndex((prevIndex) => prevIndex === 0 ? post.imagesUrl.length - 1 : prevIndex - 1)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.imagesUrl.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full">
                {currentImageIndex + 1} / {post.imagesUrl.length}
              </div>
            </>
          )}
        </div>
        <div className="w-1/3 flex flex-col h-full">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              <div className="flex items-center space-x-2">
                <button onClick={toggleLike} className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                  <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
                </button>
                <span>{post._count.likes} likes</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-grow p-4">
            {post.Comment.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={comment.commentedBy.userPreferences.imageUrl} alt={comment.commentedBy.username} />
                  <AvatarFallback>{comment.commentedBy.username}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.commentedBy.username}</p>
                  <p className="text-sm text-gray-500">{comment.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handelComment} className="p-4 border-t flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send comment</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

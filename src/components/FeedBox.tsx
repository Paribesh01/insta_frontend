'use client'

import { Heart, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { axiosClient } from '@/lib/axiosconfig';

type Post = {
    author: {
        username: string; // Username of the author
        userPreferences: {
            imageUrl: string; // Author's profile image URL
        };
    };
    id: string; // Post ID
    imagesUrl: string[]; // Array of image URLs for the post
    _count: {
        likes: number; // Number of likes on the post
        Comment: number; // Number of comments on the post
    };
    Comment: {
        id: string; // Comment ID
        content: string; // Content of the comment
        commentedBy: {
            username: string; // Username of the person who commented
            userPreferences: {
                imageUrl: string; // Commenter's profile image URL
            };
        };
    }[];
};

type InstaFeedProps = {
    postId: string; // Post ID to fetch the specific post
};

export default function InstaFeed({ postId }: InstaFeedProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState('');

    // Fetch the post and its liked status when the postId changes
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axiosClient.get(`/post/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }); // Fetch post details
                console.log(res.data)
                setPost(res.data); // Set the post data

                // Check if the post is liked by the current user
                const likedResponse = await axiosClient.get(`/post/isLiked/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setIsLiked(likedResponse.data); // Update state if liked
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    // Handle new comment submission
    const handleComment = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newComment) return; // Prevent empty comments

        const commentData = { comment: newComment };

        try {
            await axiosClient.post(`/comment/${postId}`, commentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setNewComment(""); // Clear comment input after posting

            // Fetch updated post comments
            const updatedPost = await axiosClient.get(`/post/${postId}`);
            setPost(updatedPost.data); // Update post without affecting dialog open state
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

    if (!post) return <p>Loading...</p>; // Loading state while fetching the post

    return (
        <div className="max-w-md mx-auto space-y-4 p-4">
            <Card key={post.id} className="w-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage src={post.author.userPreferences.imageUrl || `https://api.dicebear.com/6.x/initials/svg?seed=${post.author.username}`} />
                        <AvatarFallback>{post.author.username.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="font-semibold">{post.author.username}</div>
                </CardHeader>
                <CardContent className="p-0">
                    <img src={post.imagesUrl[0]} alt={`Post by ${post.author.username}`} className="w-full h-auto" />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4 w-full">
                        <Button variant="ghost" size="icon" onClick={toggleLike}>
                            <Heart className={isLiked ? "text-red-500 fill-red-500" : ""} />
                        </Button>
                        <MessageCircle />
                        <Send className="ml-auto" />
                    </div>
                    <div className="font-semibold">{post._count.likes} likes</div>
                    <ScrollArea className="w-full h-24">
                        {post.Comment.map((comment, index) => (
                            <div key={index} className="mb-2">
                                <span className="font-semibold mr-2">{comment.commentedBy.username}</span>
                                {comment.content}
                            </div>
                        ))}
                    </ScrollArea>
                    <form onSubmit={handleComment} className="flex w-full gap-2">
                        <Input
                            name="comment"
                            placeholder="Add a comment..."
                            className="flex-grow"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)} // Update new comment state
                        />
                        <Button type="submit">Post</Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}

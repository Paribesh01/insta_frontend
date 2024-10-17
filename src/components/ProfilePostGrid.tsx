import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Heart, MessageCircle } from 'lucide-react'
import ImageOverlay from './ImageOverlay'

interface Post {
    id: string
    content: string
    imagesUrl: string[]
    _count: {
        likes: number
        Comment: number
    }
}

export default function ProfilePostsGrid({ posts }: { posts: Post[] }) {
    const [selectedPost, setSelectedPost] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
            {posts?.length > 0 ? (
                posts.map((post) => (
                    <React.Fragment key={post.id}>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Card className="cursor-pointer group" onClick={() => setSelectedPost(post.id)}>
                                    <CardContent className="p-0 aspect-square relative overflow-hidden">
                                        <img
                                            src={post.imagesUrl[0]}
                                            alt={`Post ${post.id}`}
                                            className="transition-transform object-cover w-full h-full duration-200 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="text-white flex space-x-4">
                                                <div className="flex items-center">
                                                    <MessageCircle className="w-6 h-6 mr-2" />
                                                    <span>{post._count.Comment}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Heart className="w-6 h-6 mr-2" />
                                                    <span>{post._count.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                        </Dialog>
                        {selectedPost === post.id && (
                            <ImageOverlay
                                isOpen={true}
                                onClose={() => setSelectedPost(null)}
                                postId={post.id}
                            />
                        )}
                    </React.Fragment>
                ))
            ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">No posts</div>
            )}
        </div>
    )
}
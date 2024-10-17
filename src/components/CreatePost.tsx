'use client'

import { axiosClient } from "@/lib/axiosconfig"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CreatePostForm({ isCreatingPost, setIsCreatingPost }: { isCreatingPost: boolean, setIsCreatingPost: (value: boolean) => void }) {
    const [postImages, setPostImages] = useState<File[]>([])
    const [postContent, setPostContent] = useState("")
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const navigate = useNavigate()
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('content', postContent)
            postImages.map((file) => {
                formData.append('images', file);
            });
            console.log(formData)
            await axiosClient.post("/post", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            setIsCreatingPost(false)
            setPostContent("")
            setPostImages([])
            setImagePreviews([])
            setCurrentImageIndex(0)
            navigate(0)
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setPostImages(prevImages => [...prevImages, ...files])

        files.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreviews(prevPreviews => [...prevPreviews, reader.result as string])
            }
            reader.readAsDataURL(file)
        })
    }, [])

    const removeImage = (index: number) => {
        setPostImages(prevImages => prevImages.filter((_, i) => i !== index))
        setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index))
        if (currentImageIndex >= imagePreviews.length - 1) {
            setCurrentImageIndex(Math.max(0, imagePreviews.length - 2))
        }
    }

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % imagePreviews.length)
    }

    const prevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + imagePreviews.length) % imagePreviews.length)
    }

    return (
        <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
            <DialogContent className="sm:max-w-[600px] sm:min-h-[400px]"> {/* Increased dialog height */}
                <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreatePost} className="grid gap-4 py-4">
                    <Textarea
                        placeholder="What's on your mind?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="col-span-3"
                    />
                    <div className="col-span-3 ">
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <div className="flex items-center justify-center w-full h-12 px-4 transition bg-primary text-primary-foreground border border-primary rounded-md hover:bg-primary/90">
                                <ImagePlus className="w-5 h-5 mr-2" />
                                <span>{imagePreviews.length > 0 ? 'Add More Images' : 'Choose Images'}</span>
                            </div>
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            multiple
                        />
                    </div>
                    {imagePreviews.length > 0 && (
                        <div className="col-span-3 relative w-full h-80 overflow-hidden"> {/* Increased height for image area */}
                            <img
                                src={imagePreviews[currentImageIndex]}
                                alt={`Preview ${currentImageIndex + 1}`}
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '100%', // Prevent image from overflowing
                                    maxHeight: '100%', // Prevent image from overflowing
                                }}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => removeImage(currentImageIndex)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            {imagePreviews.length > 1 && (
                                <>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-1/2 left-2 transform -translate-y-1/2"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/80 px-2 py-1 rounded-full">
                                {currentImageIndex + 1} / {imagePreviews.length}
                            </div>
                        </div>
                    )}
                    <Button type="submit" > {/* Moved button to the top and added margin */}
                        Post
                    </Button>
                </form>
            </DialogContent>
        </Dialog>


    )
}
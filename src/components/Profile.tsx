'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Grid, Settings, Camera } from "lucide-react"
import useFetchUserProfile from "@/hooks/useProfile"
import { axiosClient } from "@/lib/axiosconfig"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
  const { userData } = useFetchUserProfile()
  const [profile, setProfile] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (userData) {
      setProfile(userData)
      setEditedProfile(userData)
    }
    console.log(userData)
  }, [userData])

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axiosClient.post("/user/uploadDp", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log("Image upload response:", response)
      return response.data.imageUrl // Assuming the server returns the new image URL
    } catch (error) {
      console.error("Error uploading image:", error)
      throw error
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let newImageUrl = editedProfile.userPreferences.imageUrl

      if (file) {
        newImageUrl = await handleImageUpload(file)
      }

      const updatedProfile = {
        bio: editedProfile.userPreferences.bio,
        website: editedProfile.userPreferences.website,
        gender: editedProfile.userPreferences.gender,
        accountType: editedProfile.userPreferences.accountType,
        imageUrl: newImageUrl,
      }

      const res = await axiosClient.post("/user/prefence", updatedProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log("Profile update response:", res)
      setProfile({ ...profile, userPreferences: { ...profile.userPreferences, ...updatedProfile } })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      // Handle error (e.g., show a notification)
    }
  }

  return (
    <div className="w-full mt-9 max-w-xl mx-auto bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">{profile.username}</h1>
          <Settings className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.userPreferences.imageUrl} alt={`@${profile.username}`} />
            <AvatarFallback>{profile.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex space-x-4 text-center">
            {profile && profile._count && (
              <div>
                <div className="font-semibold">{profile._count.posts ?? 0}</div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
            )}

            {profile && profile._count && (
              <>
                <div>
                  <div className="font-semibold">{profile._count.followers ?? 0}</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div>
                  <div className="font-semibold">{profile._count.following ?? 0}</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          {profile.username && (
            <h2 className="font-semibold">{profile.username}</h2>
          )}

          {profile.userPreferences?.bio && (
            <p className="text-sm text-gray-500 whitespace-pre-line">{profile.userPreferences.bio}</p>
          )}


          {profile.userPreferences?.website && (
            <a
              href={`https://${profile.userPreferences.website}`}
              className="text-sm text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.userPreferences.website}
            </a>
          )}
          {profile.userPreferences?.accountType && (
            <p className="text-sm text-gray-500 mt-3 whitespace-pre-line">Account Type: {profile.userPreferences.accountType}</p>
          )}

          {profile.userPreferences?.gender && (
            <p className="text-sm text-gray-500 whitespace-pre-line">Gender:{profile.userPreferences.gender}</p>
          )}
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4" variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24 cursor-pointer" >
                  <AvatarImage src={editedProfile.userPreferences.imageUrl} alt={`@${editedProfile.username}`} />
                  <AvatarFallback>{editedProfile.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </Avatar>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditedProfile((prev) => ({
                          ...prev,
                          userPreferences: {
                            ...prev.userPreferences,
                            imageUrl: reader.result as string,
                          },
                        }));
                      };
                      reader.readAsDataURL(selectedFile);
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  Change Profile Photo
                </Button>
              </div>



              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website" className="text-right">Website</Label>
                <Input
                  id="website"
                  value={editedProfile.userPreferences?.website || ""}
                  onChange={(e) => setEditedProfile({ ...editedProfile, userPreferences: { ...editedProfile.userPreferences, website: e.target.value } })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.userPreferences?.bio || ""}
                  onChange={(e) => setEditedProfile({ ...editedProfile, userPreferences: { ...editedProfile.userPreferences, bio: e.target.value } })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">Gender</Label>
                <Select
                  value={editedProfile.userPreferences?.gender || ""}
                  onValueChange={(value: any) => setEditedProfile({ ...editedProfile, userPreferences: { ...editedProfile.userPreferences, gender: value } })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHERS">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accountType" className="text-right">Account Type</Label>
                <Select
                  value={editedProfile.userPreferences?.accountType || ""}
                  onValueChange={(value: any) => setEditedProfile({ ...editedProfile, userPreferences: { ...editedProfile.userPreferences, accountType: value } })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>

                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="ml-auto">Save changes</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1"><Grid className="w-5 h-5" /></TabsTrigger>
            <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
            <TabsTrigger value="followers" className="flex-1">Followers</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">Posts content here...</TabsContent>
          <TabsContent value="following">Following content here...</TabsContent>
          <TabsContent value="followers">Followers content here...</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
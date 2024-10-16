import { atom } from "recoil";

export const user = atom({
    key: 'user',
    default: {
        id: "",
        username: "",
        email: "",
        _count: {
            posts: 0,      // Count of posts
            followers: 0,  // Count of followedBy
            following: 0,  // Count of following
        },
        userPreferences: {
            bio: "",
            website: "",
            gender: "",
            accountType: "",
            imageUrl: "",
        },
    },
});

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser  = async () => {
    const user = await currentUser();    
    
    // check for logged in user
    if (!user) {
        return null;
    }

    // if the user is already in db
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id,
        },
    })

    // if user in db, return it
    if (loggedInUser) {
        return loggedInUser;
    }

    // if user not in db then create it and return
    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[ 0 ].emailAddress
        }
    });

    return newUser;
}
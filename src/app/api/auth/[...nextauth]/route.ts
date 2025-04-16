import NextAuth from 'next-auth';
import Google from "next-auth/providers/google";

const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers : [
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID!,
             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  
        }),
    ],
    
    pages : {
        signIn : "/login",
    },
    callbacks : {
        async signIn() {
            return true;
        },

        async session({session, token}) {
            return session;
        },

        async jwt({token, user}) {
            return token
        },
    },

  // @ts-expect-error
    trusted : ["http://localhost:3000"],
    secret : process.env.NEXTAUTH_SECRET,
});

export { GET, POST };

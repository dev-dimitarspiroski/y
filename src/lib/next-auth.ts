import { getUserByUsername } from "@/services/users.service";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { username: {}, password: {} },
      // This function runs when a user tries to log in.
      async authorize(credentials) {
        if (!credentials) return null; // If no credentials, fail auth

        const { username, password } = credentials; // Extract username and password

        const user = await getUserByUsername(username);

        if (!user) return null;

        if (bcrypt.compareSync(password, user.password)) {
          // If password matches, return user info for the session.
          return {
            id: user.id,
            name: user.name,
            email: user.username,
          };
        }

        // If password does not match, fail auth
        return null;
      },
    }),
  ],
  // Callback to customize the session object returned to the client.
  callbacks: {
    async session(data) {
      // Add user ID and username to the session object.
      return {
        ...data.session,
        user: {
          name: data.session.user?.name,
          username: data.session.user?.email, // Username stored in email field.
          id: data.token.sub, // User ID from token.
        },
      };
    },
  },
  // Custom login page route.
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Helper function to get the current server session
export const getNextServerSession = () => getServerSession(options);

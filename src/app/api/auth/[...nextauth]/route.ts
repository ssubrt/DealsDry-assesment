import { connectMongo } from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import User from "@/models/model";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";


interface Credentials {
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      
      //@ts-expect-error getting some type issues
      async authorize(credentials): Promise< User | null> {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as unknown as Credentials;

        try {
          await connectMongo();
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("Password is not matching");
            return null;
          }

          return user;

        } catch (e: any) {
          console.log("Error in Authorize: ", e);
          throw new Error(e.message);
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const client = await clientPromise
                
                if (!credentials.email || !credentials.password){
                    return null;
                }
                const user = await client
                    .db('demo_inside_marcos')
                    .collection('user')
                    .findOne({'email': credentials.email})

                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordsMatch) {
                    return null;
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV == "development"
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
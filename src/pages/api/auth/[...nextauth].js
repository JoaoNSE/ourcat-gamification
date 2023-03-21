import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserService from "../../../service/user.service";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            console.log("token", token);
            session.user = token.user;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "user@mail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = await UserService.findUserByEmailAndPassword(
                    credentials.email,
                    credentials.password
                );

                if (user) {
                    return user;
                }

                return null;
            },
        }),
    ],
};
export default NextAuth(authOptions);

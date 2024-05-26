import NextAuth, { AuthError, CredentialsSignin } from 'next-auth';
import googleProvider from 'next-auth/providers/google';
import credentialsProvider from 'next-auth/providers/credentials';
 
import { db } from './lib/db';
import { compare } from 'bcryptjs';

 
export const { handlers, signIn, signOut, auth } = NextAuth({ 
    providers: [
        googleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        credentialsProvider({
            name: "Credentials",
            credentials:{
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "abc@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password"
                },
            },
            authorize: async (credentials) => {
                 const email = credentials.email as string | undefined;
                 const password = credentials.password as string | undefined;
                 
                 if(!email || !password) {
                    throw new CredentialsSignin({cause: "Please provide both email and password!"});
                 }

                 const user = await db.user.findUnique({
                    where: {
                        email
                    }, 
                 });
                  
                 if(!user) throw new CredentialsSignin({cause: "Invalid email or password!"});

                 if(!user.password) throw new CredentialsSignin({cause: "Invalid email or password!"});

                 const isMatch = await compare(password, user.password);

                 if(!isMatch) throw new CredentialsSignin({cause: "Invalid email or password!"});
                  
                 return {name: user.name, email: user.email};
            },
        }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session ({ session, token }) {
            if (session?.user) {
              session.user.id  = token.sub;
            }
            return session;
        },  
        signIn: async ({user, account}) => { 
                if(account?.provider === "google") {
                    try {
                        const {email, name, image, id} = user;

                        const alreadyUser = await db.user.findUnique({
                            where: {
                                email
                            }, 
                         });

                        if(!alreadyUser) await db.user.create({
                            data: {
                                email,
                                name,
                                image, 
                            }
                        });
                        return true;
                        
                    } catch (error) {
                        throw new AuthError()
                    }
                }
                return false;
        },
    }
});


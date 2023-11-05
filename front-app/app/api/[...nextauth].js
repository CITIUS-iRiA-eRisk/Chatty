import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { CredentialsProvider } from "next-auth/providers";
import { connect } from "http2";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "credentials",
      Credentials: {
        email: {label: "Email", type:"text"},
        password: {label: "Password", type:"password"}
      },
      async authorize(credentials) {
        // Conectar con la base de datos y comprobar si existe el usuario
        try{
            // Mirar url https://www.youtube.com/watch?app=desktop&v=1SjqRn_Ira4
            // findOne base de datos
            // si existe el usuario comprobar contraseña
            // si es correcta devolvemos usuario
            // si no es correcta error
        } catch (err) {

        }
      }

    }),
    Google({
      clientId: process.env.GOOGLE_ID != null ? process.env.GOOGLE_ID : '' ,
      clientSecret: process.env.GOOGLE_SECRET != null ? process.env.GOOGLE_SECRET : '' ,
    })
  ],
})
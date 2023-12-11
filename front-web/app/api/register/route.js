import bcrypt from "bcrypt";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {
    const body = await request.json();
    const { username, email, password } = body.data;
    const client = await clientPromise
    
    const exists = await client
        .db('demo_inside_marcos')
        .collection('user')
        .findOne({'email': email})

    if (exists) {
        return new NextResponse("User already exists", {status: 400})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client
        .db('demo_inside_marcos')
        .collection('user')
        .insertOne({
            'username': username,
            'email': email,
            'password': hashedPassword
        })

    return NextResponse.json(user)
}
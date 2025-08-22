import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/dist/types/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }

        // prepare the chat data
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
        };

        // connect to the database and create a new chat
        await connectDB();
        await Chat.create(chatData);

        return NextResponse.json({ success: true, message: "Chat created successfully" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
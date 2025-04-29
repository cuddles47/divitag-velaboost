import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Get the backend API URL from environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function POST(request: NextRequest) {
    try {
        // Get the request body
        const body = await request.json();

        // Forward the request to the backend
        const response = await axios.post(`${apiUrl}/pageVisit`, body);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error recording page visit:", error);

        // Return appropriate error response based on the error
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Failed to record page visit";

        return NextResponse.json({ error: message }, { status });
    }
}
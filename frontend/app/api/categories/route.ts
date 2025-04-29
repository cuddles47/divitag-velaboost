import { NextResponse } from "next/server";
import axios from "axios";

// Get the backend API URL from environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function GET() {
    try {
        // Forward request to backend
        const response = await axios.get(`${apiUrl}/categories`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching categories:", error);

        // Return appropriate error response based on the error
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Failed to fetch categories";

        return NextResponse.json({ error: message }, { status });
    }
}
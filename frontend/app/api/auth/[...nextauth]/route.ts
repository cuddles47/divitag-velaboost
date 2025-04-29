import NextAuth from "next-auth";

// Use the local version of authOptions instead of the src version
import { authOptions } from "@/shared/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

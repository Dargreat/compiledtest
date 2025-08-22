// app/api/reddit/password/[id]/route.ts
import { handlers } from "@/auth"; // v5 auth handlers
import { getServerSession } from "next-auth";

// Force Node.js runtime
export const runtime = "nodejs";

// Re-export NextAuth handlers for this route
export const { GET, POST } = handlers;

// Optional: if you want custom session check logic
export async function customGET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(); // you can pass handlers or config if needed
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Your custom logic here...
  return new Response(`Password ID: ${params.id}`, { status: 200 });
}

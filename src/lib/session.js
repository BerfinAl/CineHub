/* import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Your logic here
  res.status(200).json({ message: "Success", session });
}
 */
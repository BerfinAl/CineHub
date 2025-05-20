import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import { Like } from "@/lib/modals";

export async function POST(request) {
  try {
    const { userEmail, movieID } = await request.json();

    // Validate input
    if (!userEmail || !movieID) {
      return NextResponse.json(
        { message: "Invalid userEmail or movieID.", success: false },
        { status: 400 }
      );
    }

    await connectToDb();

    const existingLike = await Like.findOne({ userEmail, movieID });

    if (existingLike) {
      // If already liked, remove it (unfavorite)
      await Like.deleteOne({ _id: existingLike._id });
      return NextResponse.json(
        { message: "Film removed from favorites.", success: true, fill: false },
        { status: 200 }
      );
    } else {
      // If not liked, add it
      const like = new Like({ userEmail, movieID });
      await like.save();
      return NextResponse.json(
        { message: "Film added to favorites.", success: true, fill: true },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { message: "Failed to toggle favorites.", success: false },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import { WatchedMovies } from "@/lib/modals";

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

    const exist = await WatchedMovies.findOne({ userEmail, movieID });

    if (exist) {
      // If already added, remove it
      await WatchedMovies.deleteOne({ _id: exist._id });
      return NextResponse.json(
        {
          message: "Film removed from watched movies.",
          success: true,
          fill: false,
        },
        { status: 200 }
      );
    } else {
      // If not exist, add it
      const movie = new WatchedMovies({ userEmail, movieID });
      await movie.save();
      return NextResponse.json(
        { message: "Film added to watched movies.", success: true, fill: true },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    console.log(error);
    return NextResponse.json(
      { message: "Failed to toggle watched movie list.", success: false },
      { status: 500 }
    );
  }
}

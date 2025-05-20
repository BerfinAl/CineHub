import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/connectToDb';
import { Watchlist } from '@/lib/modals';

export async function POST(request) {
  try {
    const { userEmail, movieID } = await request.json();

    if (!userEmail || !movieID) {
      return NextResponse.json(
        { message: 'Invalid userEmail or movieID.', success: false },
        { status: 400 }
      );
    }

    await connectToDb();

    const existingWatchlist = await Watchlist.findOne({ userEmail, movieID });

    if (existingWatchlist) {
      // If already Watchlistd, remove it (unfavorite)
      await Watchlist.deleteOne({ _id: existingWatchlist._id });
      return NextResponse.json(
        { message: 'Film removed from watchlist.', success: true, fill: false },
        { status: 200 }
      );
    } else {
      // If not Watchlistd, add it
      const watchlist = new Watchlist({ userEmail, movieID });
console.log(Watchlist)
      await watchlist.save();
      return NextResponse.json(
        { message: 'Film added to watchlist.', success: true, fill: true },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error toggling:', error);
    return NextResponse.json(
      { message: 'Failed to toggle.', success: false },
      { status: 500 }
    );
  }
}

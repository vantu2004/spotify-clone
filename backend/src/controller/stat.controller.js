import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        // Đếm số artist không trùng nhau (từ songs + albums)
        Song.aggregate([
          {
            // Gộp collection albums vào pipeline của songs
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          { $group: { _id: "$artist" } },
          { $count: "count" },
        ]),
      ]);

    res.json({
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};

import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // -1 = descending order
    const songs = await Song.find().sort({ createdAt: -1 });

    res.status(200).json({ songs });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // Lấy 6 bài hát ngẫu nhiên từ collection songs
    const featuredSongs = await Song.aggregate([
      {
        // Random document trong MongoDB
        // size: số lượng document cần lấy
        $sample: { size: 6 },
      },
      {
        // Chỉ trả về các field cần cho frontend
        // 1 = giữ field
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // Trả về client
    res.status(200).json({ featuredSongs });
  } catch (error) {
    // Đẩy lỗi về error middleware
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 4 random songs using aggregation
    const madeForYouSongs = await Song.aggregate([
      { $sample: { size: 4 } },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);

    res.status(200).json({ madeForYouSongs });
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const trendingSongs = await Song.aggregate([
      { $sample: { size: 4 } },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);

    res.status(200).json({ trendingSongs });
  } catch (error) {
    next(error);
  }
};

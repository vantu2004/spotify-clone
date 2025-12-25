import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

export const checkAdmin = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Admin access granted." });
  } catch (error) {
    next(error);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Audio file and image file are required." });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // khi khởi tạo là đã có luôn ID
    const song = new Song({
      title,
      artist,
      albumId: albumId || null,
      duration,
      audioUrl: audioUrl,
      imageUrl: imageUrl,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    // sau khi xóa thì trả về document đã xóa
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    res.status(200).json({ message: "Song deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.coverImage) {
      return res.status(400).json({ message: "Cover image is required." });
    }

    const { title, artist, releaseYear } = req.body;
    const coverImage = req.files.coverImage;

    const imageUrl = await uploadToCloudinary(coverImage);

    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumId: id });
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).json({ message: "Album not found." });
    }

    res.status(200).json({ message: "Album deleted successfully." });
  } catch (error) {
    next(error);
  }
};

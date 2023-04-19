import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    external: { type: String, required: true },
    published_at: { type: String, required: true },
    published_by: {
      username: { type: String, required: true },
      profileImage: { type: String, required: true },
    },
    preview: { type: String, required: true },
    views: { type: Number, required: true },
    tags: { type: [String], required: true },
    keywords: { type: [String], required: true },
    public: { type: Boolean, required: true },
    type: { type: String, required: true },
  },
  { collection: "video" }
);

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
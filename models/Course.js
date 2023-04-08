import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    shortDescription: { type: String, required: true },
    htmlContent: { type: String, required: true },
    preview: { type: String, required: true },
    published_at: { type: String, required: true },
    published_by: {
      username: { type: String, required: true },
      profileImage: { type: String, required: true },
    },
    views: { type: Number, required: true },
    youtubeEmbedURL: { type: String, required: true },
    topics: {
      type: [Object],
      title: { type: String, required: true },
      slug: { type: String, required: true },
      htmlContent: { type: String, required: true },
      video: { type: String, required: true }
    },
    tags: { type: [String], required: true },
    keywords: { type: [String], required: true },
    public: { type: Boolean, required: true },
  },
  { collection: "course" }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);

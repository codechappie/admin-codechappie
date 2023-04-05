import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    published_at: { type: String, required: true },
    published_by: { 
      username: { type: String, required: true },
      profileImage: { type: String, required: true },
    },
    description: { type: String, required: true },
    html_content: { type: String, required: true },
    tags: { type: [String], required: true },
    keywords: { type: [String], required: true },
  },
  { collection: "blog" }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

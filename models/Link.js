import mongoose from "mongoose";

const VirtualLinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    widgetStyle: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    username: { type: String, },
    position: { type: Number, },
    url: { type: String, },
    background: { type: String, },
    backgroundImage: { type: String },
    image: { type: String, },
    embedUrl: { type: String, },
    views: { type: Number, required: true },
    public: { type: Boolean, required: true },
  },
  { collection: "virtuallink" }
);

export default mongoose.models.VirtualLink || mongoose.model('VirtualLink', VirtualLinkSchema);
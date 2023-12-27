import { Document, Schema, model } from "mongoose";
// not done
interface Gallery extends Document {
  user_id: string;
  images: Array<string>;
  videos: Array<string>;
}

const gallerySchema = new Schema<Gallery>({
  user_id: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  videos: {
    type: [String],
    required: true,
  },
 
});

const Gallery = model<Gallery>("Gallery", gallerySchema);

export default Gallery;

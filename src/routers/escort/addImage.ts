import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort } from "../../models/escorts";
import { uploadMedia } from "../../utils";
import { Media } from "../../models/common";

export const addImageRouter = Router();

interface AddImageRequest extends AuthRequest {
  body: { images: Media[] };
}

addImageRouter.post(
  "/addImage",
  async (req: AddImageRequest, res: Response) => {
    /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/AddImageRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/Response' }
    }
    #swagger.responses[400] = {
        schema: { $ref: '#/definitions/BadRequest' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

    if (req.body.images) {
      try {
        const images = req.body.images;
        const escort = req.session?.user as Escort;

        const uploadedFilenames = await uploadMedia(
          req.session?.id as string,
          images
        );
        console.log(uploadedFilenames, "returned image urls");

        uploadedFilenames.forEach((url) => {
          escort.images.push(url);
        });

        await escort.save();
        res.status(200).json({ message: "Images uploaded successfully" });
      } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
    } else {
      res.status(404).json({ message: "Bad request: `images` not provided." });
    }
  }
);

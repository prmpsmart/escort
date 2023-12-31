import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort } from "../../models/escorts";
import { Media, uploadMedia } from "../../utils";

export const addVideoRouter = Router();

interface AddVideoRequest extends AuthRequest {
  body: { videos: Media[] };
}

addVideoRouter.post(
  "/addVideo",
  async (req: AddVideoRequest, res: Response) => {
    /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/AddVideoRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/Response' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

    if (req.body.videos) {
      try {
        const videos = req.body.videos;
        const escort = req.session?.user as Escort;

        const uploadedFileUrls = await uploadMedia(
          req.session?.id as string,
          videos
        );

        uploadedFileUrls.forEach((url) => {
          escort.videos.push(url);
        });

        await escort.save();
        res.status(200).json({ message: "Videos uploaded successfully" });
      } catch (error) {
        console.error("Error uploading videos:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
    } else {
      res.status(404).json({ message: "Bad request: `videos` not provided." });
    }
  }
);

import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort } from "../../models/escorts";
import { getMediaLinks } from "../../utils";

export const viewGalleryRouter = Router();

interface ViewGalleryResponse {
  images: string[];
  videos: string[];
}

viewGalleryRouter.get(
  "/viewGallery",
  async (req: AuthRequest, res: Response) => {
    /**
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/ViewGalleryResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
    }
    */

    const escort = req.session?.user as Escort;

    const json: ViewGalleryResponse = {
      images: await getMediaLinks(escort.images),
      videos: await getMediaLinks(escort.videos),
    };
    res.status(200).json(json);
  }
);

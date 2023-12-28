import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Escort } from "../../models/escorts";

export const viewGalleryRouter = Router();

interface ViewGalleryResponse {
  images: string[];
  videos: string[];
}

viewGalleryRouter.get("/viewGallery", (req: AuthRequest, res: Response) => {
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
    images: escort.images,
    videos: escort.videos,
  };
  res.status(200).json(json);
});

import { Request, Response, Router } from "express";

export const viewGalleryRouter = Router();

interface ViewGalleryResponse {
  images: Array<string>;
  videos: Array<string>;
}

viewGalleryRouter.get("/viewGallery", (req: Request, res: Response) => {
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

  const json: ViewGalleryResponse = {
    images: [],
    videos: [],
  };
  res.status(200).json(json);
});

import { Response, Router } from "express";
import { AuthRequest } from "../../middleware/checkToken";
import { Client } from "../../models/clients";
import { Media } from "../../models/common";
import { uploadMedia } from "../../utils";

export const upgradeProRouter = Router();

interface UpgradeProRequest extends AuthRequest {
  body: {
    images: Media[];
    height: number;
    hairColor: string;
    country: string;
    gender: string;
    birthday: number;
  };
}

upgradeProRouter.post(
  "/upgradePro",
  async (req: UpgradeProRequest, res: Response) => {
    /**
        #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/UpgradeProRequest" }
        }

        #swagger.responses[400] = {
            schema: { $ref: '#/definitions/BadRequest' }
        }
        #swagger.responses[404] = {
            schema: { $ref: '#/definitions/UserNotExists' }
        }
         */

    let invalidRequestMessage;

    if (!req.body.images) {
      invalidRequestMessage = "`images`: `string` not provided";
    }
    if (!req.body.height) {
      invalidRequestMessage = "`height`: `string` not provided";
    }
    if (!req.body.hairColor) {
      invalidRequestMessage = "`hairColor`: `string` not provided";
    }
    if (!req.body.country) {
      invalidRequestMessage = "`country`: `string` not provided";
    }
    if (!req.body.gender) {
      invalidRequestMessage = "`gender`: `string` not provided";
    }
    if (!req.body.birthday) {
      invalidRequestMessage = "`birthday`: `string` not provided";
    }
    if (invalidRequestMessage) {
      res.status(400).json({
        message: `Bad request:: ${invalidRequestMessage}`,
      });
    } else {
      try {
        const images = req.body.images;
        const client = req.session?.user as Client;

        const uploadedFileUrls = await uploadMedia(
          req.session?.id as string,
          images
        );

        uploadedFileUrls.forEach((url) => {
          client.images.push(url);
        });

        client
          .save()
          .then((value) => {
            res.status(200).json({ message: "Images uploaded successfully" });
          })
          .catch((reason) => {
            res.status(500).json({ message: "Internal server error", reason });
          });
      } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({});
    }
  }
);

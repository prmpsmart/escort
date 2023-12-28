import { Request, Response, Router } from "express";
import { Package, Packages } from "../../models/packages";

export const packagesRouter = Router();
interface PackagesRequest extends Request {
  query: {
    name: string;
  };
}
interface PackageR {
  id: string;
  name: string;
  expressLimit: string;
  showLimit: string;
  uploadLimit: string;
  validityPeriod: string;
  price: number;
}

packagesRouter.get("/packages", async (req: PackagesRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/PackagesRequest" }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/components/schemas/PackagesResponse' }
    }
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/InvalidSession' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/UserNotExists' }
      }
      */

  let query = {};
  if (req.query.name) query = { name: RegExp(req.query.name, "i") };

  const packages_ = await Packages.find(query);
  const packages = new Array<PackageR>();
  packages_.forEach((_package: Package) => {
    packages.push({
      id: _package.id,
      name: _package.name,
      expressLimit: _package.expressLimit,
      showLimit: _package.showLimit,
      uploadLimit: _package.uploadLimit,
      validityPeriod: _package.validityPeriod,
      price: _package.price,
    });
  });

  res.status(200).json({ packages });
});

interface PackageRequest extends Request {
  body: PackageR;
}

packagesRouter.post("/package", async (req: PackageRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/PackageRequest" }
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
  let invalidRequestMessage;

  if (!req.body.name) {
    invalidRequestMessage = "`name`: `string` not provided";
  }
  if (!req.body.expressLimit) {
    invalidRequestMessage = "`expressLimit`: `string` not provided";
  }
  if (!req.body.showLimit) {
    invalidRequestMessage = "`showLimit`: `string` not provided";
  }
  if (!req.body.uploadLimit) {
    invalidRequestMessage = "`uploadLimit`: `string` not provided";
  }
  if (!req.body.validityPeriod) {
    invalidRequestMessage = "`validityPeriod`: `string` not provided";
  }
  if (!req.body.price) {
    invalidRequestMessage = "`price`: `string` not provided";
  }
  if (invalidRequestMessage) {
    res.status(400).json({
      message: `Bad request:: ${invalidRequestMessage}`,
    });
  } else {
    try {
      await Packages.create({
        name: req.body.name,
        expressLimit: req.body.expressLimit,
        showLimit: req.body.showLimit,
        uploadLimit: req.body.uploadLimit,
        validityPeriod: req.body.validityPeriod,
        price: req.body.price,
      });
      res.status(200).json({ message: "Package added successfully." });
    } catch {
      res.status(500).json({ message: "Database error." });
    }
  }
});

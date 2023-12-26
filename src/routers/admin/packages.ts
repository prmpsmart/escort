import { Request, Response, Router } from "express";

export const packagesRouter = Router();
interface PackagesRequest extends Request {
  query: {
    name: string;
  };
}
interface Package {
  name: string;
  expressLimit: any;
  showLimit: any;
  uploadLimit: any;
  validityPeriod: any;
  price: number;
}

interface PackagesResponse {
  packages: Array<Package>;
}

packagesRouter.get("/packages", (req: PackagesRequest, res: Response) => {
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

  const json: PackagesResponse = {
    packages: [],
  };
  res.status(200).json(json);
});

interface PackageRequest extends Request {
  body: {
    name: string;
    expressLimit: any;
    showLimit: any;
    uploadLimit: any;
    validityPeriod: any;
    price: number;
  };
}

packagesRouter.post("/package", (req: PackageRequest, res: Response) => {
  /**
    #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/PackageRequest" }
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

  const json = {};
  res.status(200).json(json);
});

import { NextApiRequest, NextApiResponse } from "next";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import { getAuthUser } from "../../../utils/auth";

//Only these fields may be set via the API, so a client cannot inject arbitrary
//properties (e.g. _id, __v) through the request body.
const EDITABLE_PET_FIELDS = [
  "type",
  "name",
  "age",
  "sex",
  "yearsOrMonths",
  "breed",
  "size",
  "image",
  "suitableForChildren",
  "suitableForAnimals",
  "adopted",
  "desc",
] as const;

const pickEditableFields = (body: Record<string, unknown> = {}) => {
  const update: Record<string, unknown> = {};
  for (const field of EDITABLE_PET_FIELDS) {
    if (body[field] !== undefined) {
      update[field] = body[field];
    }
  }
  update.updatedAt = new Date();
  return update;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const id = query.id;

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        //Public: individual animal page.
        const pet = await petModel.findById(id);
        if (!pet) {
          return res.status(404).json({
            success: false,
            message: `No pet with ID of ${id} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `pet ${id} successfully retrieved`,
          data: pet,
        });
      }

      case "PUT": {
        if (!getAuthUser(req)) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        const update = pickEditableFields(req.body);
        const pet = await petModel.findByIdAndUpdate(id, update, {
          new: true,
          runValidators: true,
        });
        if (!pet) {
          return res.status(404).json({
            success: false,
            message: `No pet with ID of ${id} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `pet ${id} successfully updated`,
          data: pet,
        });
      }

      case "DELETE": {
        if (!getAuthUser(req)) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        const pet = await petModel.deleteOne({ _id: id });
        if (!pet.deletedCount) {
          return res.status(404).json({
            success: false,
            message: `No pet with ID of ${id} exists`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `pet ${id} successfully deleted`,
          data: {},
        });
      }

      default:
        res.setHeader("Allow", "GET, PUT, DELETE");
        return res
          .status(405)
          .json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("api/pets/[id] error", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default handler;

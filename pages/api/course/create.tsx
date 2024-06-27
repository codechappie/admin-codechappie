import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  const { method } = req;
  switch (method) {
    case "POST":

    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
  }
}

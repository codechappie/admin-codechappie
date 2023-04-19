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
      try {
        let course = undefined;
        let success = false;
        let error = "";
        let found = await Course.findOne({
          slug: req.body.slug,
        });
        if (!found) {
          const course = new Course(req.body);
          course._id = `${course._id}`;
          await course.save();
          success = true;
        } else {
          error = "¡Error: Curso ya existe!";
        }
        console.log(error)
        return res.status(200).json({ course, success, error });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error al guardar" });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
  }
}

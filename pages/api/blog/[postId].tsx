// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Course from "@/models/Course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  const { method } = req;

  const { postId, deleteId } = req.query;
  switch (method) {
    // case 'GET':
    //     try {
    //         let courses;
    //         if (courseId) {
    //             courses = await Course.find({
    //                 slug: courseId
    //             });
    //         } else {
    //             courses = await Course.find({});
    //         }
    //         return res.status(200).json({ success: true, courses })
    //     } catch (error) {
    //         return res.status(400).json({ success: false, error: 'Error no hay cursos' });
    //     }
    case "PUT":
      try {
        if (postId) {
          await Blog.findOneAndUpdate(
            {
              slug: postId,
            },
            req.body
          );
        }

        return res.status(200).json({ success: true, post: req.body });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error no hay cursos" });
      }
    case "DELETE":
      try {
        let elemDeleted;
        if (postId) {
          elemDeleted = await Blog.findOneAndDelete({
            slug: postId,
          });
        }

        return res.status(200).json({ success: true, deleted: elemDeleted });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error no hay cursos" });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
    //   res.status(200).json({ name: 'John Doe' })
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Blog from "../../../../models/Blog";
import Course from "../../../../models/Course";

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
          console.log(postId);
          let val: any = await Blog.findOneAndUpdate(
            {
              slug: postId,
            },
            req.body
          );
          console.log("aaa", req.body);
        }

        return res.status(200).json({ success: true, post: req.body });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error no hay cursos" });
      }
    // case 'DELETE':
    //     try {
    //         let elemUpdated;
    //         if (courseId) {
    //             let found = await Course.findOne({
    //                 _id: courseId
    //             });
    //             // LETS TRANSFORM THE OBJECT
    //             // console.log(found.topics.filter((el: any) => el.slug !== deleteId))
    //             // let newObject = {
    //             //     ...found,
    //             //     topics: found.topics.filter((el: any) => el.slug !== deleteId)
    //             // }
    //             await Course.findOneAndUpdate({
    //                 _id: courseId,
    //             },
    //                 { topics: found.topics.filter((el: any) => el.slug !== deleteId) }
    //             );

    //             elemUpdated = await Course.findOne({
    //                 _id: courseId
    //             });
    //         }

    //         return res.status(200).json({ success: true, element: elemUpdated })
    //     } catch (error) {
    //         return res.status(400).json({ success: false, error: 'Error no hay cursos' });
    //     }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
    //   res.status(200).json({ name: 'John Doe' })
  }
}

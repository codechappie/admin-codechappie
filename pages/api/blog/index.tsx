// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  const { method } = req;
  const { postId, deleteId } = req.query;
  switch (method) {
    case "GET":
      try {
        let found = await Blog.findOne({
          slug: postId,
        });
        let postExists = found?._id ? true : false;
        return res.status(200).json({ success: true, postExists });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error al guardar" });
      }
    case "POST":
      try {
        let found = await Blog.findOne({
          slug: postId,
        });
        let blog;
        let success = false;
        let error = "";
        if (!found) {
          console.log("SSSSSSSSSSSSSS", req.body);

          blog = new Blog(req.body);
          await blog.save();

          blog._id = `${blog._id}`;
          success = true;
        } else {
          blog = "Error";
          error = "¡Error: Blog ya existe!";
        }

        return res.status(200).json({ blog, success, error });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error al guardar" });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
    //   res.status(200).json({ name: 'John Doe' })
  }
}

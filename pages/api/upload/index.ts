import { IncomingForm } from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req: any) =>
  new Promise((resolve, reject) => {
    const form: any = new IncomingForm({
      multiples: false,
      filename: (name, ext, part, form) => {
        const stamptime = new Date().getTime();
        return (
          stamptime + "_codechappie__img_" + (part.originalFilename || "file")
        );
      },
    });
    const filePath = path.join(process.cwd(), "public/files");
    form.uploadDir = filePath;
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { fields, files }: any = await asyncParse(req);
    let result: any = [];
    Object.values(files).map((el: any) => {
      result.push(el.newFilename);
    });
    return res.status(200).json({ success: true, result: result });
  }
}

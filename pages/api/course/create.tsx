import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Course from "../../../models/Course";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();

    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                console.log(req.body)
                const course = new Course(req.body);
                course._id = `${course._id}`;
                await course.save();

                return res.status(200).json({ course, success: true, error: '' });
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error al guardar' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
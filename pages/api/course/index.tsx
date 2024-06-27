import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();
    const { method } = req;
    const { q } = req.query;
    switch (method) {
        case 'POST':
            try {
                // let course = undefined;
                let success = false;
                let error = "";
                let found = await Course.findOne({
                    slug: req.body.slug,
                });
                console.log("found", found)

                if (!found) {
                    const course = new Course(req.body);
                    console.log("CO", course)
                    course._id = `${course._id}`;
                    await course.save();

                    return res.status(200).json({
                        success: true,
                        course
                    });
                }

                return res.status(200).json({
                    success: false,
                    error: "COURSE_ALREADY_EXISTS"
                });
            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, error: "Error al guardar" });
            }
        case 'GET':
            try {
                let courses;
                if (q) {
                    courses = await Course.find({
                        title: {
                            $regex: '.*' + q + '.*',
                            $options: 'i'
                        }
                    });
                } else {
                    courses = await Course.find({});
                }
                return res.status(200).json({ success: true, courses })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        case 'DELETE':
            try {
                let courses;
                if (q) {
                    courses = await Course.find({
                        title: {
                            $regex: '.*' + q + '.*',
                            $options: 'i'
                        }
                    });
                } else {
                    courses = await Course.find({});
                }
                return res.status(200).json({ success: true, courses })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
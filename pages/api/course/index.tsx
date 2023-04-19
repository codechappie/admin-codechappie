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
        // try {
        //     const blog = new Blog(req.body);
        //     await blog.save();

        //     blog._id = `${blog._id}`;
        //     return res.status(200).json({ blog, success: true, error: '' });
        // } catch (error) {
        //     return res.status(400).json({ success: false, error: 'Error al guardar' });
        // }
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
        //   res.status(200).json({ name: 'John Doe' })
    }
}
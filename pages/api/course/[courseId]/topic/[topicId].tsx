// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Course from '@/models/Course';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();

    const { method } = req;

    const { courseId, topicId } = req.query;
    switch (method) {
        case 'PUT':
            try {

                let updated;
                if (courseId) {
                    updated = await Course.findOneAndUpdate({
                        slug: courseId,
                        'topics.slug': topicId
                    }, {
                        $set: { 'topics.$': req.body }
                    }, { returnDocument: 'after' });

                    return res.status(200).json({ success: true, course: updated })
                }
                return res.status(200).json({ success: false })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        case 'DELETE':
            try {
                let elemDeleted;

                let deleted;
                if (courseId) {
                    deleted = await Course.findOneAndUpdate({
                        slug: courseId,
                    }, {
                        $pull: { topics: { slug: topicId } }
                    });

                    return res.status(200).json({ success: true, course: deleted })
                }

                return res.status(200).json({ success: true, deleted: elemDeleted });
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
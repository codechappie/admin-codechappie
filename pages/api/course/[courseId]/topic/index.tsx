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

    const { courseId } = req.query;
    switch (method) {
        case "POST":
            try {
                let found = await Course.findOne({
                    slug: courseId,
                    'topics.slug': req.body.slug
                });

                if (!found) {
                    await Course.findOneAndUpdate({
                        slug: courseId,
                    }, {
                        $push: { topics: req.body }
                    });

                    return res.status(200).json({ success: true, course: req.body })
                } else {
                    return res.status(200).json({ success: false, error: "TOPIC_SLUG_IN_USE" });
                }

            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
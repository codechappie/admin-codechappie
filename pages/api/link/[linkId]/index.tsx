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

    const { linkId, deleteId } = req.query;
    switch (method) {

        case 'DELETE':
            try {
                let elemDeleted;
                if (linkId) {
                    elemDeleted = await Course.findOneAndDelete({
                        slug: linkId,
                    });
                }

                return res.status(200).json({ success: true, deleted: elemDeleted });
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
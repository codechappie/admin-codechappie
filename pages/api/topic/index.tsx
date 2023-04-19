// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog'
type Data = {
    _id: string,
    title: string,
    slug: string,
    image: string,
    published_by: {
        username: string,
        profileImage: string,
    },
    published_at: string,
    description: string,
    html_content: string,
    tags: Array<string>
    __v: number,
}

type ResponseError = {
    success: boolean,
    error: string,
}
// success?: boolean,
// error?: string,
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();

    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const blog = new Blog(req.body);
                await blog.save();

                blog._id = `${blog._id}`;
                return res.status(200).json({ blog, success: true, error: '' });
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error al guardar' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
        //   res.status(200).json({ name: 'John Doe' })
    }
}
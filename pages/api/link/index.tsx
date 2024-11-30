// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Link from '@/models/Link';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();

    const { method } = req;

    const { linkId, deleteId } = req.query;
    const { position, direction } = req.body;

    switch (method) {
        case 'POST':
            try {
                console.log("REQ", req.body)
                const links = new Link(req.body);
                links._id = `${links._id}`;
                console.log(links)
                await links.save();

                return res.status(200).json({
                    success: true,
                    links
                });
            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, error: "Error al guardar" });
            }
        case 'GET':
            try {
                let links;
                if (linkId) {
                    links = await Link.find({
                        slug: linkId
                    });
                } else {
                    links = await Link.find({});
                }
                return res.status(200).json({ success: true, links })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay proyectos' });
            }
        case 'PUT':
            try {
                let changePosition = position;

                if (direction === "down") {
                    changePosition = changePosition - 1;
                } else {
                    changePosition = changePosition + 1;
                }


                const mainFound = await Link.findOne({
                    position,
                });
                const secondFound = await Link.findOne({
                    position: changePosition,
                });

                await Link.findOneAndUpdate({
                    _id: `${mainFound._id}`
                }, {
                    position: changePosition
                })

                await Link.findOneAndUpdate({
                    _id: `${secondFound._id}`
                }, {
                    position
                });

                return res.status(200).json({ success: true, updated: "true" })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
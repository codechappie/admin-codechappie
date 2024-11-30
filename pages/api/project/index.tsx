// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();

    const { method } = req;

    const { projectId, deleteId } = req.query;
    switch (method) {
        case 'POST':
            try {
                // let course = undefined;
                let success = false;
                let error = "";
                let found = await Project.findOne({
                    slug: req.body.slug,
                });
                console.log("found", found)

                if (!found) {
                    const project = new Project(req.body);
                    project._id = `${project._id}`;
                    await project.save();

                    return res.status(200).json({
                        success: true,
                        project
                    });
                }

                return res.status(200).json({
                    success: false,
                    error: "PROJECT_ALREADY_EXISTS"
                });
            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, error: "Error al guardar" });
            }
        case 'GET':
            try {
                let projects;
                if (projectId) {
                    projects = await Project.find({
                        slug: projectId
                    });
                } else {
                    projects = await Project.find({});
                }
                return res.status(200).json({ success: true, projects })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay proyectos' });
            }
        default:
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
}
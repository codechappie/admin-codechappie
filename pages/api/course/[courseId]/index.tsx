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

    const { courseId, deleteId } = req.query;
    switch (method) {
        case "POST":
            try {
                // console.log("CID", courseId, req.body.slug);

                // let found = await Course.findOne({
                //     slug: courseId,
                //     'topics.slug': req.body.slug
                // });


                // console.log(found);

                // if (!found) {
                //     const topicAdded = await Course.findOneAndUpdate({
                //         slug: courseId,
                //         'topics.slug': req.body.slug
                //     }, {
                //         $push: { topics: req.body }
                //     });

                //     return res.status(200).json({ success: true, course: topicAdded })
                // }

                //   let course = undefined;
                //   let success = false;
                //   let error = "";
                //   let found = await Course.findOne({
                //     slug: req.body.slug,
                //   });
                //   if (!found) {
                //     const course = new Course(req.body);
                //     course._id = `${course._id}`;
                //     await course.save();
                //     success = true;
                //   } else {
                //     error = "¡Error: Curso ya existe!";
                //   }
                //   console.log(error)
                //   return res.status(200).json({ course, success, error });
            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false });
            }
        case 'GET':
            try {
                let courses;
                if (courseId) {
                    courses = await Course.find({
                        slug: courseId
                    });
                } else {
                    courses = await Course.find({});
                }
                return res.status(200).json({ success: true, courses })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        case 'PUT':
            try {
                let found;
                if (courseId) {
                    found = await Course.findOneAndUpdate({
                        slug: courseId
                    },
                        req.body
                    );
                }

                return res.status(200).json({ success: true, course: req.body })
            } catch (error) {
                return res.status(400).json({ success: false, error: 'Error no hay cursos' });
            }
        case 'DELETE':
            try {
                let elemDeleted;
                if (courseId) {
                    elemDeleted = await Course.findOneAndDelete({
                        slug: courseId,
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
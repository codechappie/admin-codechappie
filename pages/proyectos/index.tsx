import MyPagination from "@/components/pagination/Pagination";
import SearchForm from "@/components/search-form/search-form";
import { calculatePagesCount, paginate } from "@/lib/Utils";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import style from "./project.module.scss";
import Project from '@/models/Project';

const ProjectList = ({ projects }: any) => {
  const router = useRouter();

  return (
    <section className={style.course__list__container}>
      <div className={style.header}>
        <h1>Listas de proyectos</h1>
        <div className={style.buttons}>
          <Link href="/proyecto/crear">Crear proyecto</Link>
        </div>
      </div>

      <div className={style.course__list}>
        {projects.map(({ _id, title, description, preview, slug, public: isPublic }: any, index: number) => (
          <div className={style.course__list__item} key={_id}>
            <div className={style.image}>
              <img src={preview} alt="" />
            </div>
            <div className={style.content}>
              <h2>
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE}/proyectos/${slug}`}
                  target="_blank"
                >
                  {title} <span>{isPublic ? "(Publico)" : "(Oculto)"}</span>
                </Link>
              </h2>
              <p>
                {description}
              </p>
            </div>
            <div className={style.buttons}>
              <button
                color="primary"
                onClick={() => {
                  router.push(`/proyectos/${slug}/editar`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>



    </section>
  );
};

export default ProjectList;

export async function getServerSideProps({ query, res }: any) {
  let { q } = query;
  try {
    let coursesFiltered;
    await dbConnect();

    let courses = await Project.find({});

    coursesFiltered = courses
      .map((doc: any) => {
        const course = doc.toObject();
        course._id = `${doc._id}`;
        return course;
      })
      .reverse();

    return {
      props: {
        projects: coursesFiltered,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

ProjectList.auth = true;

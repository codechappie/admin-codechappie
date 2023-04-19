import axios from "axios";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const getcourses = () => {
    axios.get("/api/course").then(({ data }) => {
      setCourses(data.courses);
    });
  };
  useEffect(() => {
    getcourses();
  }, []);

  const deleteTopic = async ({ _id, topicSlug }: any) => {
    await axios
      .delete(`/api/course/${_id}`, {
        params: {
          deleteId: topicSlug,
        },
      })
      .then(({ data }) => {
        console.log(data);
      });

    getcourses();
  };

  return (
    <section className="course__list__container">
      <div className="header">
        <h1>Listas de cursos</h1>
        <div className="buttons">
          <Link href="/admin/crear/curso">Crear curso</Link>
        </div>
      </div>

      <div className="course__list">
        {courses.map(({ _id, title, topics, slug }: any) => (
          <div className="course__list__item" key={_id}>
            <div className="course__list__item__title">
              <h2>
                <a href={`/cursos/${slug}`} target="_blank">
                  {title}
                </a>
              </h2>
              <button
                color="primary"
                onClick={() => {
                  router.push(`/admin/cursos/${slug}/crear/tema`);
                }}
                // icon={<Plus set="bold" />}
              ></button>
            </div>
            <div className="course__topic_list">
              <ul>
                {topics.map(({ title, slug: topicSlug }: any) => (
                  <li key={topicSlug}>
                    <h4 className="title">
                      <a href={`/cursos/${slug}/${topicSlug}`} target="_blank">
                        {title}
                      </a>
                    </h4>
                    <a
                      href={`/admin/cursos/${slug}/editar/tema/${topicSlug}`}
                      target="_blank"
                      color="success"
                    >
                      editar
                    </a>
                    <button
                      color="error"
                      onClick={() => deleteTopic({ _id, topicSlug })}
                      // icon={<Delete set="bold" />}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* <div className="course__list__item">
                    <div className="course__list__item__title">
                        <h2>Curso de React</h2>
                        <Button auto color="primary" icon={<Plus set="bold" />} />
                    </div>
                    <div className="course__topic_list">
                        <h3>No hay temas</h3>

                    </div>
                </div> */}
      </div>
    </section>
  );
};

export default CourseList;

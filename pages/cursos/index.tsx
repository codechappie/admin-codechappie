import axios from "axios";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import style from "./courses.module.scss";
import SearchForm from "@/components/search-form/search-form";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { calculatePagesCount, paginate } from "@/lib/Utils";
import MyPagination from "@/components/pagination/Pagination";
import Button from "@/components/button/Button";

const CourseList = ({ courses }: any) => {
  const router = useRouter();
  const pageSize = 10;
  const pageCount = calculatePagesCount(pageSize, courses.length);
  const [page, setPage] = useState<number>(0);
  const [content, setcontent] = useState<any>(paginate(courses, pageSize, 0));
  const searchInputRef = useRef<any>();

  const searchPosts = (e: any) => {
    e.preventDefault();
    router.push(
      `/cursos${`${searchInputRef.current.value.trim() === "" ||
        !searchInputRef.current.value.trim()
        ? "?"
        : `?q=${searchInputRef.current.value.trim()}&`
      }`}`,
      undefined
    );
  };

  useEffect(() => {
    let q = router.query.q;
    if (q) {
      searchInputRef.current.value = q;
    }
    openContent("")
    setcontent(paginate(courses, pageSize, 0));
  }, [router]);


  const myPage = (page: any) => {
    setPage(page);
    setcontent(paginate(courses, pageSize, page));
    window.scrollTo(0, 0);
  };
  const deleteTopic = async ({ slug, topicSlug }: any) => {
    console.log(router)

    const deleteTopic = confirm("¿Deseas borrar este tema?");

    if (deleteTopic) {
      await axios
        .delete(`/api/course/${slug}/topic/${topicSlug}`)
        .then(({ data }) => {
          console.log("DELTE", data)
          if (data.success) {
            router.push({
              pathname: `/cursos`
            })
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const openContent = (_id: string) => {
    let element: any = document.querySelector(`#content${_id}`);
    let collapseButton: any = document.querySelector(`#button${_id}`);
    let isOpen = element?.getAttribute("class").includes("isOpen");
    document
      .querySelectorAll(
        `.${style.course__list__item} .${style.course__topic_list}`
      )
      .forEach((el: any) => {
        el.classList.remove(`${style.isOpen}`);
        if (el) {
          el.style.height = "0px";
        }
      });

    if (element) {
      if (isOpen) {
        element.style.height = "0px";
        element.classList.remove(`${style.isOpen}`);
        collapseButton.classList.remove(`${style.opened}`)
      } else {
        let elem: any = document.querySelector(`#content${_id} ul`);
        let h = "300px";
        if (elem) {
          h = elem?.clientHeight + 30 + "px";
        }
        collapseButton.classList.add(`${style.opened}`)
        element.style.height = h;
        element.classList.add(`${style.isOpen}`);
      }
    }
  };

  const deleteCourse = (slug: string) => {
    const confirmDeleteCourse = confirm("¿Deseas eliminar este curso?")
    if (confirmDeleteCourse) {
      try {
        axios.delete(`/api/course/${slug}`).then(({ data }) => {
          if (data.success) {
            router.push('/cursos')
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={style.course__list__container}>
      <div className={style.header}>
        <h1>Listas de cursos</h1>
        <div className={style.buttons}>
          <Link href="/cursos/crear">Crear curso</Link>
        </div>
      </div>

      <SearchForm
        classNa={style.form}
        searchHandler={searchPosts}
        inputPlaceholder="Buscar en todo el contenido..."
        buttonSearchText="Buscar"
        searchInputRef={searchInputRef}
      />

      <div className={style.course__list}>
        {content.map(({ _id, title, shortDescription, preview, topics, slug }: any, index: number) => (
          <div className={style.course__list__item} key={_id}>
            <div className={style.image}>
              <img src={preview} alt="" />
            </div>
            <div className={style.content}>
              <h2>
                <Link
                  href={`${process.env.NEXT_PUBLIC_WEBSITE}/cursos/${slug}`}
                  target="_blank"
                >
                  {title}
                </Link>
              </h2>
              <p>
                {shortDescription}
              </p>
            </div>
            <div className={style.buttons}>
              <button
                color="primary"
                onClick={() => {
                  router.push(`/cursos/${slug}/editar`);
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

              <button
                color="primary"
                onClick={() => {
                  router.push(`/cursos/${slug}/crear/tema`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={20}
                  height={20}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <button
                color="primary"
                id={"button" + _id}
                className={`${style.collapse} ${topics.length == 0 && style.no__topics}`}
                onClick={() => openContent(_id)}
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
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </button>

              <button
                className={`${style.delete} ${topics.length == 0 && style.no__topics}`}
                onClick={() => deleteCourse(slug)}

              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={1.2}
                  stroke="currentColor"
                >
                  <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
                </svg>

              </button>
            </div>

            {topics.length > 0 && (
              <div className={style.course__topic_list} id={"content" + _id}>
                <h3>Temas: </h3>
                <ul>
                  {topics.map(({ title, slug: topicSlug }: any) => (
                    <li key={topicSlug}>
                      <h4 className="title">
                        <a
                          href={`${process.env.NEXT_PUBLIC_WEBSITE}/cursos/${slug}/${topicSlug}`}
                          target="_blank"
                        >
                          {title}
                        </a>
                      </h4>
                      <div className={style.action__buttons}>
                        <a
                          href={`/cursos/${slug}/editar/tema/${topicSlug}`}
                          target="_blank"
                          color="success"
                        >
                          editar
                        </a>
                        <button
                          className={style.delete}
                          onClick={async () => {
                            await deleteTopic({ slug, topicSlug });
                          }}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth={1.2}
                            stroke="currentColor"
                          >
                            <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <MyPagination
        page={page}
        totalPages={pageCount}
        handlePageChange={myPage}
      />
    </section>
  );
};

export default CourseList;

export async function getServerSideProps({ query, res }: any) {
  let { q } = query;
  try {
    let coursesFiltered;
    await dbConnect();

    let courses = await Course.find(
      q
        ? {
          $or: [
            {
              title: {
                $regex: ".*" + q + ".*",
                $options: "i",
              },
            },
            {
              tags: {
                $regex: ".*" + q + ".*",
                $options: "i",
              },
            },
            {
              keywords: {
                $regex: ".*" + q + ".*",
                $options: "i",
              },
            },
          ],
        }
        : {}
    );

    coursesFiltered = courses
      .map((doc: any) => {
        const course = doc.toObject();
        course._id = `${doc._id}`;
        return course;
      })
      .reverse();

    return {
      props: {
        courses: coursesFiltered,
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

CourseList.auth = true;

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CardBlog from "../../components/card-blog/CardBlog";
import SearchForm from "../../components/search-form/search-form";
import dbConnect from "../../lib/dbConnect";
import { calculatePagesCount, paginate } from "../../lib/Utils";
import Blog from "../../models/Blog";
import Course from "../../models/Course";
import postStyle from "./content.module.scss";
import courseStyle from "../../pages/cursos/courses.module.scss";
import CardCourse from "../../components/card-course/CardCourse";
import MyPagination from "@/components/pagination/Pagination";
const ContentPage = ({ finalPosts, courses, type }: any) => {
  const pageSize = 2;
  const [posts, setPosts] = useState(paginate(finalPosts, pageSize, 0));
  const pageCount = calculatePagesCount(pageSize, finalPosts.length);
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const searchInputRef = useRef<any>();
  const [content, setcontent] = useState<any>([]);
  const searchPosts = (e: any) => {
    e.preventDefault();
    router.push(
      `/contenido${`${
        searchInputRef.current.value.trim() === "" ||
        !searchInputRef.current.value.trim()
          ? "?"
          : `?q=${searchInputRef.current.value.trim()}&`
      }`}type=${type}`,
      undefined
    );
  };
  useEffect(() => {
    let q = router.query.q;
    if (q) {
      searchInputRef.current.value = q;
    }
  }, [router.query.q]);
  useEffect(() => {
    setPosts(paginate(finalPosts, pageSize, 0));
  }, []);
  useEffect(() => {
    if (type === "empty") {
      type = "cursos";
      router.push(
        `/contenido${`${
          searchInputRef.current.value.trim() === "" ||
          !searchInputRef.current.value.trim()
            ? "?"
            : `?q=${searchInputRef.current.value.trim()}&`
        }`}type=${type}`,
        undefined
      );
    } else {
      router.push(
        `/contenido${`${
          searchInputRef.current.value.trim() === "" ||
          !searchInputRef.current.value.trim()
            ? "?"
            : `?q=${searchInputRef.current.value.trim()}&`
        }`}type=${type}`,
        undefined
      );
    }
  }, [type]);

  useEffect(() => {
    let content = [
      ...(finalPosts ? finalPosts : []),
      ...(courses ? courses : []),
    ];
    setcontent(content);
  }, []);

  //   useEffect(() => {
  //     setPosts(finalPosts);
  //   }, [finalPosts]);
  console.log("CON", content)
  const changeType = (type: string) => {
    router.push(
      `/contenido${`${
        router.query.q === "" || !router.query.q
          ? "?"
          : `?q=${searchInputRef.current.value.trim()}&`
      }`}type=${type}`,
      undefined
    );
  };
  const myPage = (page: any) => {
    setPage(page);
    setPosts(paginate(finalPosts, pageSize, page));
    window.scrollTo(0, 0);
  };
  return (
    <div className={postStyle.content__page}>
      <Head>
        <title>CodeChappie - Contenido 🛠️</title>
        <meta name="title" content="CodeChappie - Blog 🛠️" />
        <meta
          name="description"
          content="En este apartado podras encontrar contenidos relacionados al mundo de la informática."
        />
      </Head>

      <SearchForm
        searchHandler={searchPosts}
        inputPlaceholder="Buscar en todo el contenido..."
        buttonSearchText="Buscar"
        searchInputRef={searchInputRef}
      />

      <div className={postStyle.buttons__container}>
        <button
          className={type === "todo" ? `${postStyle.button__active}` : ""}
          onClick={() => changeType("todo")}
        >
          Todo
        </button>
        <button
          className={type === "cursos" ? `${postStyle.button__active}` : ""}
          onClick={() => changeType("cursos")}
        >
          Cursos
        </button>
        <button
          className={
            type === "publicaciones" ? `${postStyle.button__active}` : ""
          }
          onClick={() => changeType("publicaciones")}
        >
          Publicaciones
        </button>
        {/* <button
          className={type === "videos" ? `${postStyle.button__active}` : ""}
          onClick={() => changeType("videos")}
        >
          Videos
        </button>
        <button
          className={type === "proyectos" ? `${postStyle.button__active}` : ""}
          onClick={() => changeType("proyectos")}
        >
          Proyectos
        </button> */}
      </div>

      {/* {type === "publicaciones" ? (
        <>
          <h2>Publicaciones</h2>{" "}
          <div className={postStyle.content__container}>
            {posts.length > 0 ? (
              posts.map((post: any) => <CardBlog key={post._id} {...post} />)
            ) : (
              <div>
                <h3>
                  Aún no hay publicaciones relacionadas con {router.query?.q}
                </h3>
              </div>
            )}
          </div>
          <MyPagination
            page={page}
            totalPages={pageCount}
            handlePageChange={myPage}
          />
        </>
      ) : null}
      {type === "cursos" ? (
        <div className={courseStyle.courses__page}>
          <h2>Cursos</h2>
          {courses.length > 0 ? (
            <div className={courseStyle.cards__container}>
              {courses.map((course: any) => (
                <CardCourse key={course._id} {...course} />
              ))}
            </div>
          ) : (
            <div>
              <h3>Aún no hay cursos relacionados con {router.query?.q}</h3>
            </div>
          )}
        </div>
      ) : null} */}

      <div className={courseStyle.courses__page}>
        <h2>Cursos</h2>
        {content.length > 0 ? (
          <div className={courseStyle.cards__container}>
            {courses.map((course: any) => (
              <CardCourse key={course._id} {...course} />
            ))}
          </div>
        ) : (
          <div>
            <h3>Aún no hay cursos relacionados con {router.query?.q}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query, res }: any) {
  let { q, type } = query;
  try {
    await dbConnect();
    let posts = await Blog.find(
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

    const postsFiltered = posts
      .map((doc: any) => {
        const post = doc.toObject();
        post._id = `${doc._id}`;
        return post;
      })
      .reverse();

    const coursesFiltered = courses
      .map((doc: any) => {
        const course = doc.toObject();
        course._id = `${doc._id}`;
        return course;
      })
      .reverse();
    return {
      props: {
        type: type ? type : "empty",
        finalPosts: postsFiltered,
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

export default ContentPage;

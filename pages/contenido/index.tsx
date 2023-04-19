import Card from "@/components/card/Card";
import MyPagination from "@/components/pagination/Pagination";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SearchForm from "@/components/search-form/search-form";
import { calculatePagesCount, paginate } from "@/lib/Utils";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Course from "@/models/Course";
import Video from "@/models/Video";
import contentStyle from "./content.module.scss";

const ContentPage = ({ content: rawContent, type }: any) => {
  const router = useRouter();
  const searchInputRef = useRef<any>();
  const pageSize = 6;
  const pageCount = calculatePagesCount(pageSize, rawContent.length);
  const [page, setPage] = useState<number>(0);
  const [content, setcontent] = useState<any>(
    paginate(rawContent, pageSize, 0)
  );
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
    if (type === "empty") {
      changeType("todo");
    }
  }, []);

  useEffect(() => {
    let q = router.query.q;
    if (q) {
      searchInputRef.current.value = q;
    }
  }, [router.query.q]);

  useEffect(() => {
    setcontent(paginate(rawContent, pageSize, 0));
  }, [router.query.q, type]);

  const myPage = (page: any) => {
    setPage(page);
    setcontent(paginate(rawContent, pageSize, page));
    window.scrollTo(0, 0);
  };

  const getTypeOfContent = (type: string) => {
    if (type == "cursos") {
      return "Cursos";
    } else if (type === "publicaciones") {
      return "Publicaciones";
    } else if (type === "videos") {
      return "Videos";
    } else {
      return "Contenido";
    }
  };
  return (
    <div className={contentStyle.content__page}>
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

      <div className={contentStyle.buttons__container}>
        <button
          className={type === "todo" ? `${contentStyle.button__active}` : ""}
          onClick={() => changeType("todo")}
        >
          Todo
        </button>
        <button
          className={type === "cursos" ? `${contentStyle.button__active}` : ""}
          onClick={() => changeType("cursos")}
        >
          Cursos
        </button>
        <button
          className={
            type === "publicaciones" ? `${contentStyle.button__active}` : ""
          }
          onClick={() => changeType("publicaciones")}
        >
          Publicaciones
        </button>
        <button
          className={type === "videos" ? `${contentStyle.button__active}` : ""}
          onClick={() => changeType("videos")}
        >
          Videos
        </button>
        {/* <button
          className={type === "proyectos" ? `${contentStyle.button__active}` : ""}
          onClick={() => changeType("proyectos")}
        >
          Proyectos
        </button> */}
      </div>
      <div className={contentStyle.content__page}>
        <h2>{getTypeOfContent(type)}</h2>
        {content.length > 0 ? (
          <>
            <div className={contentStyle.cards__container}>
              {content.map((course: any) => (
                <Card key={course._id} {...course} />
              ))}
            </div>
            <MyPagination
              page={page}
              totalPages={pageCount}
              handlePageChange={myPage}
            />
          </>
        ) : (
          <div className={contentStyle.no__results}>
            <h3>
              Aún no hay resultados relacionados con el siguiente termino de
              busqueda: <span>{router.query?.q}</span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query, res }: any) {
  let { q, type } = query;
  try {
    let postsFiltered, coursesFiltered, videosFiltered, finalContent;
    await dbConnect();
    if (type === "publicaciones" || type === "todo") {
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
      postsFiltered = posts
        .map((doc: any) => {
          const post = doc.toObject();
          post._id = `${doc._id}`;
          return post;
        })
        .reverse();
    }
    if (type === "cursos" || type === "todo") {
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
    }
    if (type === "videos" || type === "todo") {
      let videos = await Video.find(
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

      videosFiltered = videos
        .map((doc: any) => {
          const video = doc.toObject();
          video._id = `${doc._id}`;
          return video;
        })
        .reverse();
    }

    finalContent = [
      ...(postsFiltered ? postsFiltered : []),
      ...(coursesFiltered ? coursesFiltered : []),
      ...(videosFiltered ? videosFiltered : []),
    ];

    return {
      props: {
        type: type ? type : "empty",
        content: finalContent,
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

export const processVideoData = (data: [any]) => {
  let tempArr = data.map((el) => {
    let { snippet, id } = el;
    return {
      image: snippet.thumbnails.medium.url,
      description: snippet.description,
      title: snippet.title,
      type: "video",
      tags: [snippet.channelTitle],
      slug: snippet.channelId,
      external: `https://www.youtube.com/watch?v=${id.videoId}`,
      publishTime: snippet.publishTime,
    };
  });

  return tempArr;
};

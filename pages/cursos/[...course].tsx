import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./course-page.module.scss";

import Renderhtml from "@/components/renderhtml/renderhtml";
import Link from "next/link";
import Head from "next/head";
import { incrementView } from "@/lib/Utils";

const Curso = ({ course, topic }: any) => {
  const router = useRouter();

  const [showTopics, setShowTopics] = useState(false);
  const [topicContent, setTopicContent] = useState("");
  const [topicTitle, setTopicTitle] = useState("Title");
  const [topicVideo, setTopicVideo] = useState("");
  const [numOfViews, setNumOfViews] = useState();

  let tema = "";
  if (router.query.course) {
    tema = router.query.course[1];
  }
  const {
    slug,
    title,
    htmlContent,
    badge,
    topics: tempTopics,
    tags,
    keywords,
    views,
    youtubeEmbedURL,
  } = course;

  useEffect(() => {
    let id = `${course.slug}`;
    console.log(course);
    if (id) {
      incrementView(id, "course", views, setNumOfViews);
    }
  }, []);

  useEffect(() => {
    if (topic) {
      setTopicContent(topic[0].htmlContent);
      setTopicTitle(topic[0].title);
      setTopicVideo(topic[0].video);
    }
  }, [topic, topicContent]);

  let topics = [
    {
      id: "chappiflix",
      title: "Introducción",
      slug: "",
    },
    ...tempTopics,
  ];
  const setMenuAction = (val: any) => {
    if(window.innerWidth <= 950){
      setShowTopics(val);
    }
  };

  return topic ? (
    <>
      <Head>
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={style.course__page}>
        <div className={style.header__buttons}>
          <div
            className={style.back__button}
            onClick={() => {
              history.go(-2);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 0 24 24"
              width="30px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M14.71 6.71c-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
            </svg>
            Atras
          </div>

          <div
            className={style.topics__button}
            onClick={() => setMenuAction(!showTopics)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              style={{ marginRight: "10px" }}
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <path d="M20,6h-8l-1.41-1.41C10.21,4.21,9.7,4,9.17,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z M13,16H7c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h6c0.55,0,1,0.45,1,1C14,15.55,13.55,16,13,16z M17,12H7 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1C18,11.55,17.55,12,17,12z" />
              </g>
            </svg>
            Temas
          </div>
        </div>

        <div className={style.course}>
          <div className={style.course__header}>
            <div className={style.course__icon}>
              <img src={badge} alt="" />
            </div>
            <div className={style.header__detail}>
              <h1 className={style.title}>
                <Link href={`/cursos/${slug}`}>{title}</Link>
              </h1>
              <h2>Tema: {topicTitle}</h2>
              <div className={style.tags}>
                {tags.map((tag: string, index: number) => (
                   <Link href={`/contenido?q=${tag}`} key={tag + index}>
                   <span className={style.tag}>{tag}</span>
                 </Link>
                ))}
              </div>
              <small>{views} vistas</small>
            </div>
          </div>

          <div className={style.course__content}>
            <div className={style.course__main__content}>
              {topicVideo ? (
                <div className={style.video}>
                  <iframe
                    id="course__video__player"
                    width="100%"
                    height="100%"
                    typeof="text/html"
                    src={`${topicVideo}?autoplay=1&modestbranding=1&color=white`}
                    allowFullScreen={true}
                  />
                </div>
              ) : null}

              <div className={style.markdown__content}>
                {/* Editor */}
                {/* <MdEditor style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={handleEditorChange} /> */}

                {/* <MdEditor
                                view={{ menu: false, md: false, html: true }}
                                renderHTML={() => mdParser.render(markdownText)} /> */}
                <Renderhtml html={topicContent} />
                {/* data[0].topics[0].markdownText ||  */}
              </div>
            </div>

            <div
              className={`${style.course__topics} ${
                showTopics ? `${style.show}` : ""
              }`}
            >
              <div className={style.overlay}>overlay</div>
              <div className={style.header}>
                <h6>Contenido</h6>
                <div
                  className={style.close__button}
                  onClick={() => setMenuAction(!showTopics)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="42px"
                    width="42px"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7,18a1,1,0,0,1-.707-1.707l10-10A.99989.99989,0,0,1,17.707,7.707l-10,10A.99676.99676,0,0,1,7,18Z" />
                    <path d="M17,18a.99676.99676,0,0,1-.707-.293l-10-10A.99989.99989,0,0,1,7.707,6.293l10,10A1,1,0,0,1,17,18Z" />
                  </svg>
                </div>
              </div>

              <div className={style.topics}>
                {topics.map((topic: any, index: number) => (
                  <div
                    key={index}
                    className={`${style.topic} ${
                      topic.slug === tema ? style.activated : ""
                    }`}
                    onClick={() => setMenuAction(!showTopics)}
                  >
                    <Link
                      href={`/cursos/${slug}/${topic.slug}`}
                      className={style.topic__ancor}
                    >
                      {topic.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Head>
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={style.course__page}>
        <div className={style.header__buttons}>
          <div
            className={style.back__button}
            onClick={() => {
              history.back();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 0 24 24"
              width="30px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M14.71 6.71c-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
            </svg>
            Atras
          </div>
          <div
            className={style.topics__button}
            onClick={() => setMenuAction(!showTopics)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              style={{ marginRight: "10px" }}
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <path d="M20,6h-8l-1.41-1.41C10.21,4.21,9.7,4,9.17,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z M13,16H7c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h6c0.55,0,1,0.45,1,1C14,15.55,13.55,16,13,16z M17,12H7 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1C18,11.55,17.55,12,17,12z" />
              </g>
            </svg>
            Temas
          </div>
        </div>

        <div className={style.course}>
          <div className={style.course__header}>
            <div className={style.course__icon}>
              <img src={badge} alt="" />
            </div>
            <div className={style.header__detail}>
              <h1 className={style.title}>
                <Link href={`/cursos/${slug}`}>{title}</Link>
              </h1>
              <div className={style.tags}>
                {tags.map((tag: string, index: number) => (
                   <Link href={`/contenido?q=${tag}`} key={tag + index}>
                   <span className={style.tag}>{tag}</span>
                 </Link>
                ))}
              </div>
              <small className={style.views}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{numOfViews} vistas</span>
              </small>
            </div>
          </div>

          <div className={style.course__content}>
            <div className={style.initial__content}>
              <div className={style.iframe__container}>
                <iframe
                  src={youtubeEmbedURL}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
              </div>

              <Renderhtml html={htmlContent} />

              {topics[1]?.slug ? (
                <Link
                  href={`/cursos/${slug}/${topics[1].slug}`}
                  className={style.start__button}
                >
                  Comenzar el curso
                </Link>
              ) : (
                <h3 className={style.no__topics}>
                  Este curso aún no tiene temas.
                </h3>
              )}
            </div>

            <div
              className={`${style.overlay} ${
                showTopics ? `${style.show}` : ""
              }`}
              onClick={() => setMenuAction(false)}
            ></div>
            <div
              className={`${style.course__topics} ${
                showTopics ? `${style.show}` : ""
              }`}
            >
              <div className={style.header}>
                <h6>Contenido</h6>
                <div
                  className={style.close__button}
                  onClick={() => setMenuAction(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="42px"
                    width="42px"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7,18a1,1,0,0,1-.707-1.707l10-10A.99989.99989,0,0,1,17.707,7.707l-10,10A.99676.99676,0,0,1,7,18Z" />
                    <path d="M17,18a.99676.99676,0,0,1-.707-.293l-10-10A.99989.99989,0,0,1,7.707,6.293l10,10A1,1,0,0,1,17,18Z" />
                  </svg>
                </div>
              </div>

              <div className={style.topics}>
                {topics.map((topic: any, index: number) => (
                  <div
                    key={index}
                    className={`${style.topic} ${
                      topic.id === "chappiflix" ? style.activated : ""
                    }`}
                    onClick={() => setMenuAction(!showTopics)}
                  >
                    <Link
                      href={`/cursos/${slug}/${topic.slug}`}
                      className={style.topic__ancor}
                    >
                      {topic.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params, res }: any) {
  let topic = null;

  try {
    await dbConnect();
    const resp = await Course.findOne({ slug: params.course[0] });
    const course = resp.toObject();
    course._id = `${resp._id}`;

    // TODO: Check if this redirection is necessary
    // if (course.topics.length === 0) {
    //     return {
    //         redirect: {
    //             permanent: false,
    //             destination: `/cursos`
    //         }
    //     }
    // }
    if (params.course[1]) {
      topic = course.topics.filter((tes: any) => tes.slug === params.course[1]);
      if (topic.length < 1) {
        return {
          redirect: {
            permanent: false,
            destination: `/cursos/${course.slug}`,
          },
        };
      }
    }

    return {
      props: {
        course,
        topic,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/cursos/no-encontrado",
      },
    };
  }
}

export default Curso;

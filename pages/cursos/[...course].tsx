import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import style from "./course-page.module.scss";

// import 'highlight.js/styles/atom-one-dark.css';
// import 'react-markdown-editor-lite/lib/index.css';

import Link from "next/link";
import Texteditor from "@/components/texteditor/Texteditor";

const Curso = ({ course, topic }: any) => {
  const router = useRouter();

  const [showTopics, setShowTopics] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const [topicTitle, setTopicTitle] = useState("Title");
  const [topicVideo, setTopicVideo] = useState("");

  let tema = "";
  if (router.query.course) {
    tema = router.query.course[1];
  }

  useEffect(() => {
    if (topic) {
      setMarkdownText(topic[0].markdownText);
      setTopicTitle(topic[0].title);
      setTopicVideo(topic[0].video);
    }
  }, [topic, markdownText]);

  const { slug, title, description, topics, tags, keywords, youtubeEmbedURL } = course;

  function handleEditorChange({ html, text }: any) {
    // console.log('handleEditorChange', text);
  }

  return topic ? (
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
          onClick={() => setShowTopics(!showTopics)}
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
            <img src="/assets/images/logos/discord-icon.svg" alt="" />
          </div>
          <div className={style.header__detail}>
            <h1 className={style.title}>
              <Link href={`/cursos/${slug}`}>{title}</Link>
            </h1>
            <h2>{topicTitle}</h2>
            <div className={style.tags}>
              {tags.map((tag: string, index: number) => (
                <div key={index} className={style.tag}>
                  {tag}
                </div>
              ))}
            </div>
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
                  frameBorder="0"
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
              <Texteditor
                html={description}
                leftlabel="Contenido"
                type="preview"
              />
              {/* data[0].topics[0].markdownText ||  */}
            </div>
          </div>

          <div
            className={`${style.course__topics} ${
              showTopics ? `${style.show}` : ""
            }`}
          >
            <div className={style.header}>
              <h6>Contenido</h6>
              <div
                className={style.close__button}
                onClick={() => setShowTopics(!showTopics)}
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
                  onClick={() => setShowTopics(!showTopics)}
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
  ) : (
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

        {/* <div className={style.topics__button} onClick={() => setShowTopics(!showTopics)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24px" viewBox="0 0 24 24"
                        width="24px"
                        style={{ marginRight: "10px" }}>
                        <g>
                            <rect fill="none" height="24" width="24" />
                            <path d="M20,6h-8l-1.41-1.41C10.21,4.21,9.7,4,9.17,4H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z M13,16H7c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h6c0.55,0,1,0.45,1,1C14,15.55,13.55,16,13,16z M17,12H7 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1C18,11.55,17.55,12,17,12z" />
                        </g>
                    </svg>
                    Temas
                </div> */}
      </div>

      <div className={style.course}>
        <div className={style.course__header}>
          <div className={style.course__icon}>
            <img src="/assets/images/logos/discord-icon.svg" alt="" />
          </div>
          <div className={style.header__detail}>
            <h1 className={style.title}>
              <Link href={`/cursos/${slug}`}>{title}</Link>
            </h1>
            <div className={style.tags}>
              <div className={style.tag}>HTML5</div>
              <div className={style.tag}>Web</div>
              <div className={style.tag}>desarrollo</div>
            </div>
          </div>
        </div>

        <div className={style.initial__content}>
          <iframe
            src="https://www.youtube.com/embed/RJNALIw8PFE"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>

          <Texteditor html={description} leftlabel="Contenido" type="preview" />

          {topics[0]?.slug ? (
            <Link
              href={`/cursos/${slug}/${topics[0].slug}`}
              className={style.start__button}
            >
              Comenzar el curso
            </Link>
          ) : (
            <h3>Este curso aún no tiene temas.</h3>
          )}
        </div>
      </div>
    </div>
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

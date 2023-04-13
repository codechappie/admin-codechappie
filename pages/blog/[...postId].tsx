import { getTimeForpost } from "@/lib/Utils";
import Blog from "@/models/Blog";

import Renderhtml from "@/components/renderhtml/renderhtml";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-markdown-editor-lite/lib/index.css";
import dbConnect from "../../lib/dbConnect";
import style from "./blog.module.scss";

const PostPage = ({ post }: any) => {
  const {
    title,
    description,
    html_content,
    tags,
    published_by,
    published_at,
    image,
    views,
    keywords,
  } = post;
  const [numOfViews, setNumOfViews] = useState();
  const blogTitle = `CodeChappie Blog 🛠️ -  ${title}`;
  const router = useRouter();
  const testKeywords = keywords.join(",");
  useEffect(() => {
    incrementView();
  }, []);

  const incrementView = async () => {
    try {
      await axios
        .put(`/api/blog/${router.query.postId}`, {
          views: views + 1,
        })
        .then(({ data }) => {
          console.log(data.post.views);
          setNumOfViews(data.post.views);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.blog__page}>
      <Head>
        <title>{blogTitle}</title>
        <meta name="title" content="CodeChappie - Blog 🛠️" />
        <meta name="description" content={description} />
        <meta name="author" content={published_by.username} />
        <meta name="keywords" content={testKeywords} />
      </Head>
      <div className={style.blog__entry}>
        <div className={style.blog__banner__image}>
          <img src={image} alt="" />
        </div>

        <div className={style.blog__entry__content}>
          <h1 className={style.blog__main__title}>{title}</h1>

          <span className={style.views}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={20}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
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
            {numOfViews} vistas
          </span>
          <div className={style.tags}>
            {tags.map((tag: string, ind: number) => (
              <span key={tag + ind} className={style.tag}>
                {tag}
              </span>
            ))}
          </div>
          <h4 className={style.created_by}>
            Creado por{" "}
            <span className={style.author}>@{published_by.username}</span> el{" "}
            {getTimeForpost(published_at)}
          </h4>

          <Renderhtml html={html_content} />

          <div className={style.blog__footer}>
            <Link href="/blog">
              <div className={style.back__button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  style={{ fill: "#000000" }}
                >
                  <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                </svg>
              </div>
              Regresar para leer otras entradas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params, res }: any) {
  try {
    await dbConnect();
    let post = await Blog.findOne({ slug: params.postId });
    post = post.toObject();
    post._id = `${post._id}`;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        // TODO: REDIRECT TO BLOG NOT FOUND
        destination: "/blog",
      },
    };
  }
}
export default PostPage;

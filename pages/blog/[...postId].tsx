import Texteditor from "@/components/texteditor/Texteditor";
import { getTimeForpost } from "@/lib/Utils";
import Blog from "@/models/Blog";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-markdown-editor-lite/lib/index.css";
import dbConnect from "../../lib/dbConnect";
import style from "./blog.module.scss";

const PostPage = ({ post }: any) => {
  const { title, html_content, tags, published_by, published_at, image } = post;
  const blogTopic = `CodeChappie Blog 🛠️ -  ${title}`;
  const router = useRouter();

  return (
    <div className={style.blog__page}>
      <Head>
        <title>{blogTopic}</title>
        <meta name="title" content="CodeChappie - Blog 🛠️" />
        <meta
          name="description"
          content="En este apartado podras encontrar un blog con temas relacionados al mundo de la informática."
        />
      </Head>
      <div className={style.blog__entry}>
        <div className={style.blog__banner__image}>
          <img src={image} alt="" />
        </div>

        <div className={style.blog__entry__content}>
          {/* <h1>{blogTitle}</h1> */}
          <div className={style.tags}>
            {tags.map((tag: string) => (
              <span key={tag} className={style.tag}>
                {tag}
              </span>
            ))}
          </div>
          <h4 className={style.created_by}>
            Creado por @{published_by.username} el{" "}
            {getTimeForpost(published_at)}
          </h4>

          <div className={style.blog__html__content}>
            <Texteditor
              html={html_content}
              leftlabel="Contenido"
              type="preview"
            />
          </div>

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

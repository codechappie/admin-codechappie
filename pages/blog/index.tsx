import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CardBlog from "@/components/card-blog/CardBlog";
import SearchForm from "@/components/search-form/search-form";
import { calculatePagesCount, paginate } from "@/lib/Utils";
import Blog from "@/models/Blog";
import dbConnect from "@/lib/dbConnect";
import MyPagination from "@/components/pagination/Pagination";
import style from "./blog.module.scss";

const BlogPage = ({ finalPosts }: any) => {
  const pageSize = 5;
  const [posts, setPosts] = useState(paginate(finalPosts, pageSize, 0));
  const pageCount = calculatePagesCount(pageSize, finalPosts.length);
  const [page, setPage] = useState<number>(0);
  console.log(finalPosts)
  const router = useRouter();
  const searchInputRef = useRef<any>();

  const searchPosts = (e: any) => {
    e.preventDefault();
    router.push(`/blog?q=${searchInputRef.current.value.trim()}`, undefined);
  };
  useEffect(() => {
    setPosts(finalPosts);
  }, [finalPosts]);
  useEffect(() => {
    setPosts(paginate(finalPosts, pageSize, 0));
  }, []);

  const myPage = (page: any) => {
    setPage(page);
    setPosts(paginate(finalPosts, pageSize, page));
    window.scrollTo(0, 0);
  };

  return (
    <div className={style.blog__page}>
      <Head>
        <title>CodeChappie - Blog 🛠️</title>
        <meta name="title" content="CodeChappie - Blog 🛠️" />
        <meta
          name="description"
          content="En este apartado podras encontrar un blog con temas relacionados al mundo de la informática."
        />
      </Head>

      <h2 className={style.centered__text}>Publicaciones diarias</h2>
      <h4 className={style.centered__subtext}>
        Publicaciones activas: {finalPosts.length}
      </h4>

      <Link className={style.button} href="/blog/crear">Crear nueva entrada</Link>
      <SearchForm
        searchHandler={searchPosts}
        inputPlaceholder="Buscar publicaciones..."
        buttonSearchText="Buscar"
        searchInputRef={searchInputRef}
      />
      <div className={style.blog__container}>
        {posts.map((post: any) => (
          <CardBlog
            key={post._id}
            {...post}
            slug={`/blog/editar/${post.slug}`}
          />
        ))}
        <MyPagination
          page={page}
          totalPages={pageCount}
          handlePageChange={myPage}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps({ query, res }: any) {
  let { q } = query;
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
    const postsFiltered = posts
      .map((doc: any) => {
        const post = doc.toObject();
        post._id = `${doc._id}`;
        return post;
      })
      .reverse();
    return {
      props: {
        finalPosts: postsFiltered,
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
BlogPage.auth = true;

export default BlogPage;

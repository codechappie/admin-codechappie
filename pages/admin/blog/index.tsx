import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CardBlog from "@/components/card-blog/CardBlog";
import SearchForm from "@/components/search-form/search-form";
import { calculatePagesCount, paginate } from "@/lib/Utils";
import Blog from "@/models/Blog";
import dbConnect from "@/lib/dbConnect";
import MyPagination from "@/components/pagination/Pagination";
import style from './blog.module.scss'

const BlogPage = ({ finalPosts }: any) => {
  const pageSize = 2;
  const [posts, setPosts] = useState(paginate(finalPosts, pageSize, 0));
  const pageCount = calculatePagesCount(pageSize, finalPosts.length);
  const [page, setPage] = useState<number>(0);

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
        Últimas publicaciones e historias de un desarrollador para
        desarrolladores.
      </h4>

      <SearchForm
        searchHandler={searchPosts}
        inputPlaceholder="Buscar publicaciones..."
        buttonSearchText="Buscar"
        searchInputRef={searchInputRef}
      />

      <div className={style.blog__container}>
        {posts.map((post: any) => (
          <CardBlog key={post._id} {...post} />
        ))}
        {/* <Pagination
          className="nui_pagination"
          size="md"
          noMargin
          shadow
          total={pageCount}
          initialPage={1}
          onChange={myPage}
        /> */}
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

export default BlogPage;

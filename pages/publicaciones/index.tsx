import style from './posts.module.scss'
import axios from 'axios'
import CardPost from '../../components/card-post/CardPost'
import Head from 'next/head'
const PostsPage = ({ posts }: any) => {

    return (
        <div className={style.posts__page}>
             <Head>
                <title>CodeChappie - Publicaciones 🛠️</title>
                <meta name="title" content="CodeChappie - Publicaciones 🛠️" />
                <meta
                    name="description"
                    content="En este apartado podras encontrar publicaciones relacionadas al mundo de la informática."
                />
            </Head>

            <h1>Publicaciones</h1>

            <div className={style.last__posts__container}>
                {posts.map((post: any) => (
                    <CardPost key={post.id} {...post} />
                ))}
                <CardPost />
            </div>
        </div>
    )
}

export const getStaticProps = async () => {

    const headers = {
        'api-key': 'gmKtXmpwVE9rjohM28tysbiz',
    }

    const { data } = await axios.get("https://dev.to/api/articles?username=codechappie", { headers });
    // let data:[] = [];
    return {
        props: {
            posts: data,
        }
    }
}
export default PostsPage
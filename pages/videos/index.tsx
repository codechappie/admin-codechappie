import style from './videos.module.scss'
import axios from 'axios'
import CardVideo from '../../components/card-video/CardVideo'
import Head from 'next/head'

const VideosPage = ({ videos }: any) => {
    return (
        <div className={style.videos__page}>
            <Head>
                <title>CodeChappie - Videos 🎥</title>
                <meta name="title" content="CodeChappie - Videos 🎥" />
                <meta name="description" content="En este apartado podras encontrar videos relacionados al mundo de la informática." />
            </Head>
            <h1>Videos</h1>
            <div className={style.cards__container}>
                {
                    videos.map((video: any) => (
                        <CardVideo key={video.etag} {...video} {...video.snippet} />
                    ))
                }
            </div>
        </div>
    )
}
export const getStaticProps = async () => {


    const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_KEY}&channelId=UCgANZIFfnwnBLMwtC5HzlsQ&part=snippet,id&order=date&maxResults=50&type=video`);
    return {
        props: {
            videos: data.items,
        }
    }
}

export default VideosPage
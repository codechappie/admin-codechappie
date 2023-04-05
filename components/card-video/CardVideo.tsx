import Link from "next/link"
import style from './card-video.module.scss';
import moment from 'moment'
interface ICardVideoProps {
    slug: string;
    image: string;
    title: string;
    description: string;
    views: number;
    duration: string;
}

const CardVideo = ({ title, description, thumbnails, id, etag, publishedAt }: any) => {

    return etag ? (
        <Link href={`https://www.youtube.com/watch?v=${id.videoId}`} target="_blank" className={style.card}>
           
                <div className={style.image}>
                    <img src={thumbnails.medium.url} alt="curso" />
                    <small className={style.time}>1:36:23</small>
                </div>
                <div className="course-information">
                    <h3 className={style.title} title={title}>
                        {title}
                    </h3>
                    <p className={style.description}>
                        {description}
                    </p>
                    <div className={style.views}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" /></svg>
                        <small>{moment(publishedAt).format("L")}</small>
                    </div>
                </div>
            
        </Link>
    ) : null
}

export default CardVideo

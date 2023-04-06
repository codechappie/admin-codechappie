import Link from "next/link"
import style from './card-post.module.scss';

interface ICardPostProps {
    slug: string;
    image: string;
    title: string;
    description: string;
    views: number;
    duration: string;
}

const CardPost = ({ url, cover_image, title, description, reading_time_minutes }: any) => {

    return url ? (
        <Link  href={url} target="_blank" className={style.card__post}>
            
                <div className={style.image}>
                    <img
                        src={cover_image}
                        alt="artículo imagen"
                    />
                </div>
                <div className={style.information}>
                    <h3 className={style.title}>{title}</h3>
                    <div className={style.time}>{reading_time_minutes} min</div>
                    <p className={style.description}>
                        {description}
                    </p>
                    <div className={style.footer__card}>
                        {/* <a target="_blank" href={`${url}`} rel="noreferrer" className={style.btn__read__more}>
                        <span>Leer más</span>
                        <img src="/assets/icons/arrow-right.svg" alt="ver artículo icono" />
                    </a> */}
                        {/* <div className={style.time}>{reading_time_minutes} min</div> */}
                    </div>
                </div>
        </Link>
    ) : null
}

export default CardPost

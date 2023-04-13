import Link from "next/link";
import { FC } from "react";
import { getTimeForpost } from "../../lib/Utils";
import style from "./card-blog.module.scss";

const CardBlog = ({
  slug,
  image,
  title,
  description,
  published_by,
  published_at,
  tags,
  views,
}: any) => {
  return (
    <Link href={slug} className={style.card__blog}>
      <div className={style.image}>
        <img src={image} alt="artículo imagen" />
      </div>
      <div className={style.information}>
        <div className={style.tags}>
          {tags.map((tag: string, ind: number) => (
            <span className={style.tag} key={tag + ind}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={style.title}>{title}</h3>
        <p className={style.description}>{description}</p>
        <div className={style.footer__card}>
          <img src={published_by.profileImage} alt="artículo imagen" />
          <small className={style.published_at}>
            Publicado por {published_by.username} el
            {getTimeForpost(published_at)}
          </small>
        </div>
        <span className={style.views}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={18}
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
          {views} vistas
        </span>
      </div>
    </Link>
  );
};

export default CardBlog;

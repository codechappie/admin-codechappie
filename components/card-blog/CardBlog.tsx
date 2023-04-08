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
}: any) => {
  return (
    <Link href={slug} className={style.card__blog}>
      <div className={style.image}>
        <img src={image} alt="artículo imagen" />
      </div>
      <div className={style.information}>
        <div className={style.tags}>
          {tags.map((tag: string) => (
            <span className={style.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={style.title}>{title}</h3>
        <p className={style.description}>{description}</p>
        <div className={style.footer__card}>
          <img src={published_by.profileImage} alt="artículo imagen" />
          <small className={style.published_at}>
            Publicado por {published_by.username} el{" "}
            {getTimeForpost(published_at)}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;

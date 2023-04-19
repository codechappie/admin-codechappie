import Link from "next/link";
import style from "./card.module.scss";

interface ICardProps {
  slug: string;
  image: string;
  title: string;
  description: string;
  views: number;
  duration: string;
  tags: Array<string>;
}

const Card = ({
  title = "Texto prueba",
  shortDescription,
  description,
  preview = "",
  image,
  slug = "",
  tags = [],
  views,
  type,
  external,
  published_at,
}: any) => {
  let adminURL = "";
  if (type == "blog") {
    type = "blog";
    adminURL = `/${type}/editar/${slug}`;
  } else if (type == "curso") {
    type = "cursos";
    adminURL = `/${type}/${slug}/editar`
  } else if (type === "video") {
    type = "video";
  }

  

  return (
    <Link
      href={external ? external : adminURL}
      target={`${external ? "_blank" : ""}`}
      className={style.card}
    >
      <div className={style.image}>
        <img src={preview || image} alt={title} />
        <small className={style.time}>1:36:23</small>
      </div>
      <div className="course-information">
        <h3 className={style.title} title={title}>
          {title}
        </h3>
        <p className={style.description}>{shortDescription || description}</p>
        <div className={style.tags}>
          {tags.map((tag: string, index: number) => {
            return (
              <div key={index} className={style.tag}>
                {tag}
              </div>
            );
          })}
        </div>
        <div className={`${style.type} ${style[type]}`}>{type}</div>
        <div className={style.views}>
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <g id="surface67128308">
              <path d="M 12 4 C 4 4 1 12 1 12 C 1 12 4 20 12 20 C 20 20 23 12 23 12 C 23 12 20 4 12 4 Z M 12 6 C 17.277344 6 19.945312 10.265625 20.808594 11.996094 C 19.945312 13.714844 17.253906 18 12 18 C 6.722656 18 4.054688 13.734375 3.191406 12.003906 C 4.058594 10.285156 6.746094 6 12 6 Z M 12 8 C 9.789062 8 8 9.789062 8 12 C 8 14.210938 9.789062 16 12 16 C 14.210938 16 16 14.210938 16 12 C 16 9.789062 14.210938 8 12 8 Z M 12 10 C 13.105469 10 14 10.894531 14 12 C 14 13.105469 13.105469 14 12 14 C 10.894531 14 10 13.105469 10 12 C 10 10.894531 10.894531 10 12 10 Z M 12 10 " />
            </g>
          </svg>

          <small>{views} vistas</small>
        </div>
      </div>
    </Link>
  );
};

export default Card;

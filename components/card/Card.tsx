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
  publishTime,
}: any) => {
  if (type == "blog") {
    type = "blog";
  } else if (type == "curso") {
    type = "cursos";
  } else if (type === "video") {
    type = "video";
  }
  console.log(external);
  return (
    <Link
      href={external ? external : `/${type}/${slug}`}
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
        {type === "video" ? (
          <div className={style.date}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

            <small>{publishTime}</small>
          </div>
        ) : (
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
        )}
      </div>
    </Link>
  );
};

export default Card;

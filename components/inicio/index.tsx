import Head from "next/head";
import Link from "next/link";
import CardPost from "../card-post/CardPost";
import CardCourse from "../card-course/CardCourse";
import style from "./inicio.module.scss";
import CardProject from "../card-project/CardProject";
import { useState } from "react";
const HomePage = ({ posts, videos }: any) => {
  const [projects] = useState([
    {
      id: "01",
      name: "Watssy",
      description: "",
      imagePreview:
        "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x8xqr7tcnxkketccvdsh.PNG",
      liveDemo: "https://watssy.com/",
      repository: "https://github.com",
    },
    {
      id: "02",
      name: "Arca de Papel",
      description: "",
      imagePreview:
        "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mwb3ehmkevixf4z879yf.PNG",
      liveDemo: "https://arcadepapel.net/",
      repository: "https://github.com",
    },
    {
      id: "03",
      name: "Arca Virtual",
      description: "",
      imagePreview:
        "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s58flwjb7lhe7emtz3zx.PNG",
      liveDemo: "https://arcavirtual.net/plataforma",
      repository: "https://github.com",
    },
    {
      id: "04",
      name: "Toolky",
      description: "",
      imagePreview:
        "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s58flwjb7lhe7emtz3zx.PNG",
      liveDemo: "https://arcavirtual.net/plataforma",
      repository: "https://github.com",
    },
  ]);
  return (
    <>
      <Head>
        <title>CodeChappie - Contenido tecnológico</title>
        <meta name="title" content="CodeChappie - Contenido tecnológico" />
        <meta
          name="description"
          content="CodeChappie es una organización enfocada en enseñar y compartir el conocimiento. Además de diseñar y desarrollar soluciónes tecnológicas."
        />
      </Head>
      <div className={style.homePage}>
        <div className={style.hero__content}>
          <div className={style.hero__text}>
            {/* <h1>Cursos, tutoriales, contenido tecnológico y desarrollo web 🤖⚡</h1> */}
            <h1>
              Hola mundo, <br /> yo soy{" "}
              <span className={style.highlighted}>CodeChappie</span>
            </h1>
            <p>
              En esta web encontrarás cursos, tutoriales y mucho contenido
              relacionado al mundo de la informática. Adquiere una nueva
              habilidad, aprende algo nuevo.
            </p>

            <Link  href="/cursos" className={style.courses__btn}>
              Ver cursos
            </Link>
          </div>

          {/* <div className={style.mini_grid}>
                        <div className={style.mini_grid__item}>
                            <img src="https://pnggrid.com/wp-content/uploads/2021/05/White-Facebook-F-Logo-533x1024.png" alt="" />
                        </div>
                        <div className={style.mini_grid__item}>
                            <img src="https://cdn.logojoy.com/wp-content/uploads/2018/07/03145533/twitchicon2.png" alt="" />
                        </div>
                        <div className={style.mini_grid__item}>
                            <img src="https://pnggrid.com/wp-content/uploads/2021/07/White-YouTube-Logo-Transparent.png" alt="" />
                        </div>
                        <div className={style.mini_grid__item}>
                            content
                        </div>
                    </div> */}
          <div className={style.video}>
            <iframe
              id="ytplayerhero"
              width="100%"
              height="100%"
              typeof="text/html"
              src="https://www.youtube.com/embed/5lmFAjPk9Vg?autoplay=1&modestbranding=1&color=white"
              frameBorder="0"
              allowFullScreen={true}
            />
            <img
              className={style.img_absolute_bottom_right}
              src="https://shuffle.dev/atis-assets/elements/wing-green-down.svg"
              alt=""
            />
            <img
              className={style.img_absolute_bottom_left}
              src="https://shuffle.dev/atis-assets/elements/bullets-gray-left.svg"
              alt=""
            />
            <img
              className={style.img_absolute_top}
              src="https://shuffle.dev/atis-assets/elements/bullets-gray-left.svg"
              alt=""
            />
            <img
              className={style.img_absolute_top_center}
              src="https://shuffle.dev/atis-assets/elements/green-dark-up.svg"
              alt=""
            />
          </div>
        </div>

        <div className={style.new__courses}>
          <div className="main__text">
            <h2>Últimos cursos</h2>
            <p>
              Estos son los últimos cursos que he creado. Cuentan con videos,
              contenido de apoyo, código fuente, ejemplos prácticos, etc.{" "}
            </p>
          </div>
          <div className={style.cards__container}>
            <CardCourse />
            <CardCourse />
            <CardCourse />
          </div>
          <Link  href="/cursos" className={style.more__courses__btn}>
            <img
              loading="lazy"
              src="/assets/icons/more-posts.svg"
              alt="más artículos icono"
            />
            <span>Ver más cursos</span>
          </Link>
        </div>

        <div className={style.last__posts}>
          <div className="main__text">
            <h2>Últimas publicaciones</h2>
            <p>
              Estas son las ultimas publicaciones relacionadas a la informatica,
              que escribo en mi tiempo libre.
            </p>
          </div>
          <div className={style.last__posts__container}>
            {posts.map((post: any) => (
              <CardPost key={post.id} {...post} />
            ))}
          </div>
          <Link  href="/publicaciones" className={style.more__posts__btn}>
            <img
              loading="lazy"
              src="/assets/icons/more-posts.svg"
              alt="más artículos icono"
            />
            <span>Ver más publicaciones</span>
          </Link>
        </div>

        <div className={style.projects}>
          <div className="main__text">
            <h2>Proyectos</h2>
            <p>
              Estos son algunos proyectos en los que trabajé recientemente.
              ¿Tienes algun proyecto en mente? Envíame un{" "}
              <a
                href="mailto:codechappie@gmail.com"
                style={{ color: "#0099ff" }}
              >
                correo electrónico
              </a>{" "}
              o
              <Link  href="/enlaces" style={{ color: "#0099ff" }}>
                contáctame.
              </Link>
            </p>
          </div>
          <div className={style.projects__container}>
            {projects.map((project: any) => (
              <CardProject key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

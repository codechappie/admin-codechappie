import Link from 'next/link';
import { useState } from 'react';
import style from './links.module.scss';
import githubIcon from '../../public/assets/images/logos/github-icon.svg'
import linkedinIcon from '../../public/assets/images/logos/linkedin-icon.svg'
import youtubeIcon from '../../public/assets/images/logos/youtube-icon.svg'
import facebookIcon from '../../public/assets/images/logos/facebook.svg'
import Head from 'next/head';

const LinksPage = () => {
    const [links] = useState([
        {
            name: "GitHub",
            description: "GitHub es la web donde podrás encontrar el código de los tutoriales o cursos que realizo.",
            url: "https://github.com/codechappie",
            image: "/assets/images/logos/github-icon.svg",
        },
        {
            name: "LinkedIn",
            description: "En esta red social comparto publicaciones relacionadas al mundo de la informática.",
            url: "https://www.linkedin.com/company/codechappie",
            image: "/assets/images/logos/linkedin-icon.svg",
        },
        {
            name: "YouTube",
            description: "En este canal se suben cursos, tutoriales y contendido relacionado a la informática.",
            url: "https://youtube.com/c/codechappie",
            image: "/assets/images/logos/youtube-icon.svg",
        },
        {
            name: "Facebook",
            description: "En esta página comparto videos y fotos relacionados al desarrollo de software.",
            url: "https://facebook.com/codechappie",
            image: "/assets/images/logos/facebook.svg",
        },
        {
            name: "Instagram",
            description: "En esta red social publico fotos y reels relacionados al desarrollo de software.",
            url: "https://instagram.com/codechappie",
            image: "/assets/images/logos/instagram-icon.svg",
        },
        {
            name: "Twitter",
            description: "En esta red social comparto algunos tweets y threads que te pueden parecer interesantes.",
            url: "https://twitter.com/codechappie",
            image: "/assets/images/logos/twitter.svg",
        },
        {
            name: "Twitch",
            description: "En Twitch suelo hacer directos hablando de algún tema o haciendo algunos proyectos propios",
            url: "https://twitch.tv/codechappie",
            image: "/assets/images/logos/twitch.svg",
        },
        {
            name: "Dev.to",
            description: "En esta red social escribimos algunos tutoriales y articulos sobre desarrollo de software.",
            url: "https://dev.to/codechappie",
            image: "/assets/images/logos/dev-icon.svg",
        },
        {
            name: "Discord",
            description: "Existe un servidor en Discord donde puedes compartir recursos, experiencias con personas con intereses similares.",
            url: "https://discord.gg/Mm8UvgR83P",
            image: "/assets/images/logos/discord-icon.svg",
        },
    ])
    return (
        <div className={style.links__page}>
             <Head>
                <title>CodeChappie - Enlaces 🛠️</title>
                <meta name="title" content="CodeChappie - Enlaces 🛠️" />
                <meta
                    name="description"
                    content="En este apartado podras encontrar enlaces de algunas redes sociales o sitios web que suelo utilizar."
                />
            </Head>
            <h1>Enlaces</h1>
            <div className={style.links__container}>

                {
                    links.map((item: any) => (
                        <Link key={item.name} href={item.url} className={style.link__card}>
                            
                                <div className={style.image}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className={style.detail}>
                                    <h2 className="title">{item.name}</h2>
                                    <p>{item.description}</p>
                                </div>
                            
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default LinksPage
import Head from 'next/head'
import CardResource from '../../components/card-resource/CardResource'
import style from './resources.module.scss'
const ResourcesPage = () => {
    return (
        <div className={style.resources__page}>
            <Head>
                <title>CodeChappie - Recursos 🛠️</title>
                <meta name="title" content="CodeChappie - Recursos 🛠️" />
                <meta name="description" content="En este apartado podras encontrar recursos informáticos." />
            </Head>
            <div className="main__text">
                <h1>Recursos</h1>
                <p>Como desarrolladores nosotros usamos herramientas que nos facilitan nuestro día a día tanto como el trabajo o en projectos personales.</p>
            </div>
            <form>
                <div className={style.searcher__container}>
                    <div className={style.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            height="30px" viewBox="0 0 24 24"
                            width="30px">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </div>
                    <input type="text" name="" placeholder="Buscar cursos..." />
                    <button>
                        Buscar
                    </button>
                </div>
            </form>
            <div className={style.resources__container}>
                <CardResource />
                <CardResource />
                <CardResource />
            </div>
        </div>
    )
}
export default ResourcesPage
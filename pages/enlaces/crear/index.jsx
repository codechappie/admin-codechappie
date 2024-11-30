import Button from '@/components/button/Button';
import InputImg from '@/components/input-img/InputImg';
import Input from '@/components/input/Input';
import { useForm } from '@/lib/hooks/useForm';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import style from './create-link.module.scss';

const CreateLinks = () => {

    const sizeData = [
        { key: "size1x1", label: "Format 1x1" },
        { key: "size1x2", label: "Format 1x2" },
        { key: "size2x1", label: "Format 2x1" },
        { key: "size2x2", label: "Format size2x2" },
        { key: "embed", label: "Format Embed" },
    ];

    const widgetStyleData = [
        { key: "simple", label: "Simple" },
        { key: "github", label: "GitHub" },
        { key: "simpleGraph", label: "Simple Graph" },
        { key: "embedStyle", label: "Embed Style" },
        { key: "imageWidget", label: "Image Widget" },
    ]

    const typeData = [
        { key: "simple", label: "Simple" },
        { key: "github", label: "GitHub" },
        { key: "discord", label: "Discord" },
        { key: "facebook", label: "Facebook" },
        { key: "twitch", label: "Twitch" },
        { key: "linkedin", label: "Linkedin" },
        { key: "youtube", label: "Youtube" },
        { key: "twitter", label: "Twitter" },
        { key: "instagram", label: "Instagram" },
        { key: "tiktok", label: "Tiktok" },
        { key: "embed", label: "Embed" },
        { key: "imageWidget", label: "ImageWidget" },
    ]

    const linkFormInitialState = {
        name: '',
        widgetStyle: 'simple',
        type: 'simple',
        username: '',
        position: 0,
        size: 'size1x1',
        url: '',
        background: '#000000',
        backgroundImage: 'empty',
        image: '',
        embedUrl: '',
        views: 0,
        public: true,
    }

    const [image, setImage] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

    const [linkForm, handleInputChange, resetLinkForm] = useForm(linkFormInitialState);
    const {
        name,
        widgetStyle,
        type,
        username,
        position,
        size,
        url,
        background,
        embedUrl,
        views,
        public: isPublic
    } = linkForm;


    const createNewEntry = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/link', {
                name,
                widgetStyle,
                type,
                position,
                ...(username && { username }),
                ...(size && { size }),
                ...(url && { url }),
                ...(background && { background }),
                ...(backgroundImage && { backgroundImage }),
                ...(image && { image }),
                ...(embedUrl && { embedUrl }),
                views,
                public: isPublic
            }).then(({ data }) => {
                if (data.success) {
                    alert("Post created successfully");
                }
                // resetPostForm();
                // router.push('/blog')
            });

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={style.create__blog}>

            <form onSubmit={createNewEntry}>
                <h2>Crear una nueva entrada</h2>
                <Link href="/enlaces">
                    Retroceder
                </Link>
                <div className={style.three__cols}>

                    <select
                        name="widgetStyle"
                        className={style.select}
                        onChange={handleInputChange}>
                        {
                            widgetStyleData.map(({ key, label }) => (
                                <option key={key} value={key}>{label}</option>
                            ))
                        }
                    </select>

                    <select
                        className={style.select}
                        name="size"
                        onChange={handleInputChange}
                    >

                        {
                            sizeData.map(({ key, label }) => (
                                <option key={key} value={key}>{label}</option>
                            ))
                        }
                    </select>


                    <select
                        name="size"
                        className={style.select}
                        onChange={handleInputChange}
                    >

                        {
                            typeData.map(({ key, label }) => (
                                <option key={key} value={key}>{label}</option>
                            ))
                        }
                    </select>

                </div>


                {
                    (widgetStyle === "simple") && (
                        <>
                            <div className={style.two_cols}>
                                <Input
                                    value={name}
                                    name="name"
                                    onchange={handleInputChange}
                                    leftlabel="Título"
                                    placeholder="Título" />

                                <Input
                                    value={username}
                                    name="username"
                                    onchange={handleInputChange}
                                    leftlabel="Usuario"
                                    placeholder="Usuario" />
                            </div>

                            <div className={style.three__cols}>
                                <Input
                                    value={position}
                                    disabled
                                    name="position"
                                    onchange={handleInputChange}
                                    leftlabel="Posición"
                                    placeholder="Posición" />

                                <Input
                                    value={url}
                                    name="url"
                                    onchange={handleInputChange}
                                    leftlabel="Url Externa"
                                    placeholder="Url Externa" />

                                <Input
                                    value={background}
                                    name="background"
                                    type="color"
                                    onchange={handleInputChange}
                                    leftlabel="Color del Fondo"
                                    placeholder="Color del fondo"
                                />
                            </div>

                            <div className={style.two_cols}>
                                <InputImg
                                    val={backgroundImage}
                                    setter={setBackgroundImage}
                                    leftlabel="Imagen de fondo"
                                />

                                <InputImg
                                    val={image}
                                    setter={setImage}
                                    leftlabel="Imagen de Ícono"
                                />
                            </div>
                        </>
                    )
                }

                {
                    (widgetStyle === "github") && (
                        <>
                            <div className={style.two_cols}>
                                <Input
                                    value={name}
                                    name="name"
                                    onchange={handleInputChange}
                                    leftlabel="Título"
                                    placeholder="Título" />

                                <Input
                                    value={username}
                                    name="username"
                                    onchange={handleInputChange}
                                    leftlabel="Usuario"
                                    placeholder="Usuario" />
                            </div>

                            <div className={style.three__cols}>
                                <Input
                                    value={position}
                                    disabled
                                    name="position"
                                    onchange={handleInputChange}
                                    leftlabel="Posición"
                                    placeholder="Posición" />

                                <Input
                                    value={url}
                                    name="url"
                                    onchange={handleInputChange}
                                    leftlabel="Url Externa"
                                    placeholder="Url Externa" />

                                <Input
                                    value={background}
                                    name="background"
                                    type="color"
                                    onchange={handleInputChange}
                                    leftlabel="Color del Fondo"
                                    placeholder="Color del fondo"
                                />
                            </div>

                            <div className={style.two_cols}>
                                <InputImg
                                    val={backgroundImage}
                                    setter={setBackgroundImage}
                                    leftlabel="Imagen de fondo"
                                />

                                <InputImg
                                    val={image}
                                    setter={setImage}
                                    leftlabel="Imagen de Ícono"
                                />
                            </div>
                        </>
                    )
                }

                {
                    widgetStyle === "embedStyle" && (
                        <div className={style.formCard}>
                            <Input
                                value={name}
                                name="name"
                                onchange={handleInputChange}
                                leftlabel="Título"
                                placeholder="Título del iframe" />
                            <Input
                                value={embedUrl}
                                name='embedUrl'
                                leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                }
                                onchange={handleInputChange}
                                leftlabel="Iframe"
                                placeholder="URL de Iframe" />
                        </div>
                    )
                }

                {/* <div className={style.first__row}>
                    <Input
                        value={author}
                        name='author'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        onchange={handleInputChange}
                        leftlabel="Autor"
                        placeholder="Nombre de usuario" />
                </div> */}


                {/* <Input
                        value={author}
                        name='author'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        onchange={handleInputChange}
                        leftlabel="Autor"
                        placeholder="Nombre de usuario" />


                    <Input
                        id='title'
                        leftlabel="Título"
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        }
                        name='title'
                        onchange={(e) => {
                            handleInputChange(e);
                            setSlug(generateSlug(e.target.value))
                        }}
                        value={title}
                        placeholder='Ingresa un título...'

                    />
                    <Input
                        id='slug'
                        name='slug'
                        onchange={(e) => setSlug(e.target.value)}
                        value={slug}
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        }
                        leftlabel="Slug de la entrada"
                        placeholder="nueva-entrada"


                    />
                </div>
                <Textarea
                    name='description'
                    onchange={handleInputChange}
                    value={description}
                    leftlabel="Descripción"
                    placeholder="Coloca una breve descripción..."
                /> */}
                {/* <div className={style.first__row}>

                    <InputImg
                        val={thumbnailsImg}
                        setter={setThumbnailsImg}
                        leftlabel="Miniatura del blog" />

                    <InputImg
                        val={authorImg}
                        setter={setAuthorImg}
                        leftlabel="Imagen del autor" />




                    <InputTag id="keywords" values={keywords} setValues={setKeywords} leftlabel="Keywords" placeholder="Curso html, aprende Java, que es TypeScript" maxLength={10} />

                    <InputTag id="tags" values={tags} setValues={setTags} leftlabel="Tags" placeholder="Etiquetas" maxLength={5} />

               */}


                <Button type='submit' className={style.button} text="Crear entrada" ></Button>
            </form>
        </div >
    )
}

export default CreateLinks
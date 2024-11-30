"use client"
import { nFormatter } from '@/lib/Utils';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import style from './links.module.scss';
import { useRouter } from 'next/router';

const renderContent1x1 = (item: any, data: any) => {
    if (item.widgetStyle === "simpleGraph") {
        const { imageProfile, subs } = data;
        return <div className={`${item.widgetStyle && style[item.widgetStyle]}`}>
            <div className={style.header}>
                <div className={style.username}>
                    {imageProfile && (<img className={style.profileImage} src={imageProfile} alt="" />)}
                </div>
                <img className={style.youtubeLogo} src={item.image} alt="" />
            </div>
            <div className={style.body}>
                {subs && <h3>{nFormatter(subs, true, 1)}</h3>}
                <span>
                    seguidores
                </span>
            </div>
            <svg
                width="100%"
                height="100%"
                id="svg"
                viewBox="0 0 1440 590"
                xmlns="http://www.w3.org/2000/svg"
                className={`${style.chartwave} transition duration-300 ease-in-out delay-150`}
            >
                <path
                    d="M 0,600 L 0,225 C 95.60714285714286,194.64285714285714 191.21428571428572,164.28571428571428 305,186 C 418.7857142857143,207.71428571428572 550.75,281.5 688,279 C 825.25,276.5 967.7857142857142,197.7142857142857 1094,176 C 1220.2142857142858,154.2857142857143 1330.107142857143,189.64285714285717 1440,225 L 1440,600 L 0,600 Z"
                    stroke="none"
                    strokeWidth={0}
                    fill="#ffffff"
                    fillOpacity={1}
                    className="transition-all duration-300 ease-in-out delay-150 path-0"
                />
            </svg>
        </div>
    }

    if (
        item.widgetStyle === "simple" ||
        item.widgetStyle === "github"
    ) return renderSimpleContent(item);

    if (item.widgetStyle === "embedStyle") {
        return <div className={style[item.widgetStyle]}>
            <iframe
                id="ytplayer"
                src={item.embedUrl}
                allowFullScreen
            ></iframe>
        </div>;
    }

    if (item.widgetStyle === "imageWidget") return renderImageContent(item);
}

const setLevel = (level: number) => {
    if (level === 0) {
        return "level0"
    } else if (level === 1) {
        return "level1"
    } else if (level > 1 && level <= 3) {
        return "level2"
    } else {
        return "level3"
    }
}

const renderContent1x2 = (item: any, data: any) => {
    if (item.widgetStyle === "simpleGraph") {
        const { subs } = data;
        return <div className={`${item.widgetStyle && style[item.widgetStyle]} `}>
            <div className={style.header}>
                <img className={style.logo} src={item.image} alt="" />
            </div>
            <div className={style.body}>
                <h3>{nFormatter(subs, true, 1)} subs</h3>
            </div>
        </div>
    } else if (item.widgetStyle === "github") {
        const { name, contributions, subs } = data;

        return <div className={`${item.widgetStyle && style[item.widgetStyle]} `}>
            <div className={style.header}>
                <img className={style.logo} src={item.image} alt="" />
                <h3 className={style.username}>{name}</h3>
                <button className={style.button}>
                    Seguir
                </button>
            </div>
            <div className={style.body}>
                <div className={style.contributions__grid}>
                    {
                        contributions && contributions.map(({ contributionCount }: any, index: number) => {
                            return <div key={index} className={`${style.box__day} ${style[setLevel(contributionCount)]}`}></div>
                        })
                    }
                </div>
            </div>
        </div>
    } else if (item.widgetStyle === "embedStyle") {
        return <div className={style[item.widgetStyle]}>
            <iframe
                id="ytplayer"
                src={item.embedUrl}
                allowFullScreen
            ></iframe>
        </div>;
    } else {
        return <div>
            <img src={item.image} alt="" />
        </div>
    }

}

const renderContent2x1 = (item: any, data: any) => {
    if (item.widgetStyle === "simpleGraph") {
        const { name, imageProfile, subs } = data;
        return <div className={`${item.widgetStyle && style[item.widgetStyle]} `}>
            <div className={style.header}>
                <div className={style.username}>
                    <img className={style.profileImage} src={imageProfile} alt="" />
                    <h5 className={style.name}>{name}</h5>
                </div>
                <img className={style.youtubeLogo} src={item.image} alt="" />
            </div>
            <div className={style.body}>
                {subs && <h3>{nFormatter(subs, true, 1)} subs</h3>}
            </div>
            <svg
                width="100%"
                height="100%"
                id="svg"
                viewBox="0 0 1440 590"
                xmlns="http://www.w3.org/2000/svg"
                className={`${style.chartwave} transition duration-300 ease-in-out delay-150`}
            >
                <path
                    d="M 0,600 L 0,225 C 95.60714285714286,194.64285714285714 191.21428571428572,164.28571428571428 305,186 C 418.7857142857143,207.71428571428572 550.75,281.5 688,279 C 825.25,276.5 967.7857142857142,197.7142857142857 1094,176 C 1220.2142857142858,154.2857142857143 1330.107142857143,189.64285714285717 1440,225 L 1440,600 L 0,600 Z"
                    stroke="none"
                    strokeWidth={0}
                    fill="#ffffff"
                    fillOpacity={1}
                    className="transition-all duration-300 ease-in-out delay-150 path-0"
                />
            </svg>
        </div>
    } else if (item.widgetStyle === "embedStyle") {
        return <div className={style[item.widgetStyle]}>
            <iframe
                id="ytplayer"
                src={item.embedUrl}
                allowFullScreen
            ></iframe>
        </div>;
    } else {
        return <div>
            <img src={item.image} alt="" />
        </div>
    }

}

const renderContent = (item: any, data: any) => {
    if (!data && item.widgetStyle !== "embedStyle") return renderSimpleContent(item);

    if (item.size === "size1x1") {
        return renderContent1x1(item, data);
    }

    if (item.size === "size1x2") {
        return renderContent1x2(item, data)
    }

    if (item.size === "size2x1") {
        return renderContent2x1(item, data);
    }

    if (item.size === "size2x2") {

        if (item.widgetStyle === "embedStyle") {
            return <div className={style[item.widgetStyle]}>
                <iframe
                    id="ytplayer"
                    src={item.embedUrl}
                    allowFullScreen
                ></iframe>
            </div>;
        } else {
            return <img src={item.image} alt="" />
        }

    }

    if (item.size === "embed") {
        return <div className={style[item.widgetStyle]}>
            <iframe
                id="ytplayer"
                src={item.embedUrl}
                allowFullScreen
            ></iframe>
        </div>
    }
}

const renderSimpleContent = (item: any) => {
    return <div className={style.simple}>
        <div className={style.body}>
            <img className={style.logo} src={item.image} alt="" />
            <h3>{item.username}</h3>
        </div>
    </div>
}

const renderImageContent = (item: any) => {
    return <div className={style.image}>
        <div className={style.body}>
            <img className={style.logo} src={item.image} alt="" />
        </div>
    </div>
}

const CardLink = ({ item }: any) => {
    const router = useRouter();
    const [data, setData] = useState<any>();

    useEffect(() => {
        getDataToRender();
    }, [])

    const getDataToRender = async () => {
        if (item.type === "youtube") {
            await getData("https://mixerno.space/api/youtube-channel-counter/user/UCgANZIFfnwnBLMwtC5HzlsQ")
        } else if (item.type === "tiktok") {
            await getData("https://mixerno.space/api/tiktok-user-counter/user/codechappie")
        } else if (item.type === "github") {
            try {
                const data = await axios.get("https://api.github.com/users/codechappie");
                const stats = await axios.get("https://github-readme-activity-graph.vercel.app/data?username=codechappie");

                setData({
                    name: data.data.name,
                    imageProfile: data.data.avatar_url,
                    subs: data.data.followers,
                    contributions: stats.data.contributions
                })
            } catch (error) {
                setData(null)
            }
        } else if (item.type === "imageWidget") {
            setImageData(item);
        }
    }


    async function getData(url: string) {
        try {
            const boxData = await axios.get(url);

            setData({
                name: boxData.data.user[0].count,
                imageProfile: boxData.data.user[1].count,
                subs: boxData.data.counts[0].count,
            });
        } catch (error) {
            setData(null);
        }
    }

    async function setImageData(item: any) {
        setData({
            item,
        })
    }

    const handleDownPosition = async (item: any) => {
        document.querySelectorAll(".btn").forEach(el => {
            el.setAttribute("disabled", "true")
        });
        try {
            await axios.put(`/api/link`, {
                position: item.position,
                direction: "down"
            }).then(async ({ data }: any) => {
                if (data.success) {
                    window.location.href = '/enlaces';
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className={`${style.box} ${style[item.size]} ${style[item.type]}`}
            style={{
                background: item.background,
                ...item.position && { order: item.position },
                ...item.backgroundImage && { backgroundImage: `url(${item.backgroundImage})`, backgroundSize: "cover" }
            }}>
            <div className={style.position}>
                <button className="btn" onClick={() => handleDownPosition(item)}>Down</button>
                {item.position}
                <button className="btn">Up</button>
            </div>
            {renderContent(item, data)}
        </div>
    )
}

export default CardLink
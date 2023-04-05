import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from "react"
import OptionMenu from '../option-menu/OptionMenu'
import style from './navbar.module.scss'

interface IExpandedMenu {
    setExpandedMenu: Dispatch<SetStateAction<boolean>>;
    showExpandedMenu: boolean;
}
export const Navbar: FC<IExpandedMenu> = ({ setExpandedMenu, showExpandedMenu }) => {
    return (
        <nav className={style.navbar}>
            <div className={style.navbar__container}>
                <Link href="/" onClick={() => setExpandedMenu(false)} className={style.logo}>
                   
                        <svg width="50"
                            viewBox="0 0 69 56"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M7.62343 37.0098H0V9.88811C0.0977363 9.51142 0.938269 8.75804 2.34567 8.75804C3.75308 8.75804 4.59361 9.51142 4.69134 9.88811V27.9692H7.33023C7.33023 18.0811 9.96911 0 34.5987 0C59.2282 0 61.2807 18.3636 61.2807 27.9692H63.9196V9.88811C64.0173 9.51142 64.8578 8.75804 66.2652 8.75804C67.6726 8.75804 68.5132 9.51142 68.6109 9.88811V37.0098H61.2807C61.2807 50.2881 54.5369 55.0909 34.5987 55.0909C14.6605 55.0909 7.62343 50.0056 7.62343 37.0098ZM56.2961 26.8392C55.1233 5.93287 42.1244 4.99114 34.5987 4.8028C29.6141 4.8028 24.0431 5.36783 21.9907 13.2783C21.111 20.3413 27.5616 22.3189 27.5616 22.3189C27.5616 22.3189 33.4258 25.1441 45.4474 24.2965C51.5884 23.8636 51.898 31.0769 51.898 31.0769C51.898 31.0769 53.4796 39.4069 49.2591 42.6601C44.861 46.0504 32.5462 45.9248 25.8024 45.2028C23.1635 44.9203 17.5925 43.2289 17.5925 36.4448C17.5925 28.4871 16.9577 28.499 15.292 28.5301C15.1837 28.5322 15.0709 28.5343 14.9537 28.5343C13.1944 28.5343 12.0216 29.3818 12.3148 37.0098C12.6188 44.9199 15.2469 50.5706 34.5987 50.5706C53.9505 50.5706 57.4041 46.5899 56.2961 26.8392Z" />
                            <path fill="#FFFFFF" d="M31.08 14.6909L35.1849 6.21539V14.6909H31.08Z" />
                            <path fill="#FFFFFF" d="M37.5308 12.4308L33.4258 20.9064V12.4308H37.5308Z" />
                        </svg>
                    
                </Link>

                <div className={style.icon__menu}>
                    <Link href="/cursos" onClick={() => setExpandedMenu(false)} className={style.icon__item}>
                        
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="35px" viewBox="0 0 24 24"
                                width="35px">
                                <path d="M0 0h24v24H0V0z"
                                    fill="none" />
                                <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66l-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
                            </svg>
                            <span className={style.tooltip}>
                                Cursos
                            </span>
                        
                    </Link>
                    <Link href="/publicaciones" onClick={() => setExpandedMenu(false)} className={style.icon__item}>
                       
                            <svg xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="32px"
                                viewBox="0 0 24 24"
                                width="32px">
                                <g><rect fill="none" height="24" width="24" x="0" /></g>
                                <g><path d="M18.15,1.35l-4,4C14.05,5.45,14,5.57,14,5.71v8.17c0,0.43,0.51,0.66,0.83,0.37l4-3.6c0.11-0.09,0.17-0.23,0.17-0.37V1.71 C19,1.26,18.46,1.04,18.15,1.35z M22.47,5.2C22,4.96,21.51,4.76,21,4.59v12.03C19.86,16.21,18.69,16,17.5,16 c-1.9,0-3.78,0.54-5.5,1.58V5.48C10.38,4.55,8.51,4,6.5,4C4.71,4,3.02,4.44,1.53,5.2C1.2,5.36,1,5.71,1,6.08v12.08 c0,0.76,0.81,1.23,1.48,0.87C3.69,18.4,5.05,18,6.5,18c2.07,0,3.98,0.82,5.5,2c1.52-1.18,3.43-2,5.5-2c1.45,0,2.81,0.4,4.02,1.04 C22.19,19.4,23,18.93,23,18.17V6.08C23,5.71,22.8,5.36,22.47,5.2z" /></g>
                            </svg>
                            <span className={style.tooltip}>
                                Publicaciones
                            </span>
                       
                    </Link>
                    <Link href="/videos" onClick={() => setExpandedMenu(false)} className={style.icon__item}>
                        
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="32px" viewBox="0 0 24 24"
                                width="32px">
                                <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z" />
                            </svg>
                            <span className={style.tooltip}>
                                Videos
                            </span>
                        
                    </Link>
                    <Link href="/enlaces" onClick={() => setExpandedMenu(false)} className={style.icon__item}>
                       
                            <svg xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="35px" viewBox="0 0 24 24"
                                width="35px">
                                <rect fill="none" height="24" width="24" />
                                <path d="M7,4c0-1.11-0.89-2-2-2S3,2.89,3,4s0.89,2,2,2S7,5.11,7,4z M10.19,4.5L10.19,4.5c-0.41,0-0.76,0.25-0.92,0.63 C8.83,6.23,7.76,7,6.5,7h-3C2.67,7,2,7.67,2,8.5V11h6V8.74c1.43-0.45,2.58-1.53,3.12-2.91C11.38,5.19,10.88,4.5,10.19,4.5z M19,17 c1.11,0,2-0.89,2-2s-0.89-2-2-2s-2,0.89-2,2S17.89,17,19,17z M20.5,18h-3c-1.26,0-2.33-0.77-2.77-1.87 c-0.15-0.38-0.51-0.63-0.92-0.63h0c-0.69,0-1.19,0.69-0.94,1.33c0.55,1.38,1.69,2.46,3.12,2.91V22h6v-2.5C22,18.67,21.33,18,20.5,18 z M17.25,11.09c0,0,0-0.01,0.01,0c-1.06,0.27-1.9,1.11-2.17,2.17c0,0,0-0.01,0-0.01C14.98,13.68,14.58,14,14.11,14 c-0.55,0-1-0.45-1-1c0-0.05,0.02-0.14,0.02-0.14c0.43-1.85,1.89-3.31,3.75-3.73c0.04,0,0.08-0.01,0.12-0.01c0.55,0,1,0.45,1,1 C18,10.58,17.68,10.98,17.25,11.09z M18,6.06c0,0.51-0.37,0.92-0.86,0.99c0,0,0,0,0,0c-3.19,0.39-5.7,2.91-6.09,6.1c0,0,0,0,0,0 C10.98,13.63,10.56,14,10.06,14c-0.55,0-1-0.45-1-1c0-0.02,0-0.04,0-0.06c0-0.01,0-0.02,0-0.03c0.5-4.12,3.79-7.38,7.92-7.85 c0,0,0.01,0,0.01,0C17.55,5.06,18,5.51,18,6.06z" />
                            </svg>
                            <span className={style.tooltip}>
                                Enlaces
                            </span>
                        
                    </Link>

                    <Link href="/blog" onClick={() => setExpandedMenu(false)} className={style.icon__item}>
                        
                            <svg xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="35px" viewBox="0 0 24 24"
                                width="35px" fill="#000000">
                                <rect fill="none" height="24" width="24" />
                                <path d="M19,5v9l-5,0l0,5H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h10l6-6V5C21,3.9,20.1,3,19,3z M12,14H7v-2h5V14z M17,10H7V8h10V10z" />
                            </svg>
                            <span className={style.tooltip}>
                                Blog
                            </span>
                        
                    </Link>
                </div>

                <OptionMenu showExpandedMenu={showExpandedMenu} setExpandedMenu={setExpandedMenu} />
            </div>
        </nav>
    )
}

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import style from "./expanded-menu.module.scss";

interface IExpandedMenu {
  showExpandedMenu: boolean;
  setExpandedMenu: Dispatch<SetStateAction<boolean>>;
}

export const ExpandedMenu: FC<IExpandedMenu> = ({
  showExpandedMenu,
  setExpandedMenu,
}) => {
  useEffect(() => {
    window.onclick = function (event: any) {
      if (!event.target.matches("#floatMenu") && showExpandedMenu) {
        var dropdowns: any = document.querySelector("#floatMenu");
        if (dropdowns.classList.contains(`${style.show}`)) {
          setExpandedMenu(false);
        }
      }
    };
    if (showExpandedMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [setExpandedMenu]);

  return (
    <div
      id="floatMenu"
      className={`${style.expanded__menu} ${
        showExpandedMenu ? `${style.show}` : ""
      }`}
    >
      <div className={style.expanded__menu__container}>
        <div className={style.columns}>
          <div className={style.column}>
            {/* <div className={style.title}>CodeChappie</div> */}
            <div className={style.item} onClick={() => setExpandedMenu(false)}>
              <Link href="/">Inicio</Link>
            </div>
            <div className={style.item} onClick={() => setExpandedMenu(false)}>
              <Link href="/blog">Crear blog</Link>
            </div>
            <div className={style.item} onClick={() => setExpandedMenu(false)}>
              <Link href="/cursos">Crear curso</Link>
            </div>
            <div className={style.item} onClick={() => setExpandedMenu(false)}>
              <button onClick={() => signIn("github")}>Iniciar sesión</button>
            </div>
            <div className={style.item} onClick={() => setExpandedMenu(false)}>
              <button onClick={() => signOut()}>Cerrar sessión</button>
            </div>
          </div>
        </div>
        <div className={style.social__networking__sites}>
          <a href="https://www.github.com/codechappie" className={style.link}>
            <img
              src="/assets/icons/logos/youtube-icon-mini.svg"
              alt="youtube"
            />
          </a>
          <a href="https://www.github.com/codechappie" className={style.link}>
            <img src="/assets/icons/logos/github-icon-mini.svg" alt="github" />
          </a>
          <a href="https://www.github.com/codechappie" className={style.link}>
            <img src="/assets/icons/logos/dev-icon-mini.svg" alt="devto" />
          </a>
          <a href="https://www.github.com/codechappie" className={style.link}>
            <img
              src="/assets/icons/logos/linkedin-icon-mini.svg"
              alt="linkedin"
            />
          </a>
          <a href="https://www.github.com/codechappie" className={style.link}>
            <img
              src="/assets/icons/logos/instagram-icon-mini.svg"
              alt="instagram"
            />
          </a>
          <a href="https://www.github.com/codechappie" className={style.link}>
            <img
              src="/assets/icons/logos/twitter-icon-mini.svg"
              alt="twitter"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

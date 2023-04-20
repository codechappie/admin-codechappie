import { useRouter } from "next/router";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { ExpandedMenu } from "../expanded-menu/ExpandedMenu";
import SearchForm from "../search-form/search-form";
import style from "./option-menu.module.scss";
interface IExpandedMenu {
  showExpandedMenu: boolean;
  setExpandedMenu: Dispatch<SetStateAction<boolean>>;
  session: any;
}
const OptionMenu: FC<IExpandedMenu> = ({
  showExpandedMenu,
  setExpandedMenu,
  session,
}) => {
  const router = useRouter();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [theme, setTheme] = useState("");
  const searchInputRef = useRef<any>();
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "theme__dark";
    setTheme(currentTheme);
    if (currentTheme === "theme__dark") {
      document.body.className = "theme__dark";
    }
    if (currentTheme === "theme__ligth") {
      document.body.className = "theme__ligth";
    }
  }, [theme]);

  const changeTheme = () => {
    if (theme === "theme__dark") {
      setTheme("theme__ligth");
      localStorage.setItem("theme", "theme__ligth");
    }
    if (theme === "theme__ligth") {
      setTheme("theme__dark");
      localStorage.setItem("theme", "theme__dark");
    }
  };

  const searchContentHandler = (e: any) => {
    if (session) {
      e.preventDefault();
      router.push(
        `/contenido${`${
          searchInputRef.current.value.trim() === "" ||
          !searchInputRef.current.value.trim()
            ? "?"
            : `?q=${searchInputRef.current.value.trim()}&`
        }`}type=todo`
      );
      searchInputRef.current.value = "";
      setShowSearchForm(!showSearchForm);
    }
  };

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        console.log("wwww");
        let ele: any = document.querySelectorAll("#search_input")[0];
        ele.focus();
      }, 1);
    }
  }, [showSearchForm]);

  return (
    <>
      <div className={style.optionMenu}>
        <div className={style.container}>
          {session && (
            <div className={style.menu__item} title="Buscador">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                enableBackground="new 0 0 24 24"
                viewBox="0 0 124 124"
                width="32px"
                height="32px"
                fill="#ffffff"
                onClick={() => {
                  setShowSearchForm(!showSearchForm);
                }}
              >
                <g>
                  <path d="M48.85,58.41l-4.22,0.9c-1.42,0.3-2.82-0.57-3.18-1.97l-1.63-5.81l-19.08,5.15l0.1,0.37c0.24,0.88,0.11,1.78-0.3,2.51 c-0.41,0.75-1.1,1.35-1.97,1.62c-3.16,0.98-6.74,1.93-9.8,3.05c-0.17,0.05-0.35,0.09-0.52,0.1c-0.73,0.1-1.44-0.05-2.05-0.38 c-0.73-0.4-1.32-1.09-1.59-1.96l-0.01-0.02l0,0L4.6,61.96c-0.03-0.09-0.05-0.17-0.06-0.26L0.12,45.62 c-0.24-0.88-0.11-1.77,0.3-2.51l0-0.01l0,0c0.41-0.74,1.09-1.34,1.97-1.61l9.75-3.03c0.15-0.05,0.3-0.08,0.45-0.1 c0.76-0.13,1.51,0.01,2.15,0.36c0.74,0.41,1.33,1.09,1.6,1.95c0.01,0.04,0.02,0.08,0.04,0.13L35.4,35.8l-1.44-5.12 c-0.4-1.41,0.41-2.88,1.8-3.31l44.09-13.72l-0.36-1.27c-0.44-1.37,0.28-2.86,1.65-3.36l24.01-8.87l0.17-0.05 c1.43-0.42,2.93,0.4,3.35,1.83l12.53,42.24c0.06,0.16,0.1,0.34,0.13,0.52c0.22,1.48-0.81,2.85-2.29,3.07l-26.02,3.83 c-1.33,0.19-2.62-0.62-2.99-1.95L89.85,49l-18.37,4.19c0.48,2.62,0.02,5.24-1.15,7.48c-0.47,0.89-1.05,1.72-1.74,2.47l27.71,55.54 c0.67,1.34,0.12,2.96-1.22,3.63c-1.34,0.67-2.96,0.12-3.63-1.22L75.76,89.65H62.61l0.49,30.49c0.02,1.49-1.17,2.72-2.66,2.74 c-1.49,0.02-2.72-1.17-2.74-2.66l-0.49-30.58H43.71l-15.02,30.52c-0.66,1.34-2.28,1.89-3.62,1.23c-1.34-0.66-1.89-2.28-1.23-3.62 l15.68-31.86c0.05-0.12,0.11-0.24,0.17-0.35L51,62.58c-0.91-1.12-1.62-2.42-2.07-3.87l-0.01-0.03 C48.9,58.59,48.87,58.5,48.85,58.41L48.85,58.41z M73.06,84.23l-9.01-18.06c-0.18,0.07-0.37,0.13-0.56,0.19l-0.02,0 c-0.41,0.13-0.82,0.23-1.23,0.31l0.28,17.56H73.06L73.06,84.23z M57.12,84.23l-0.28-17.8c-0.5-0.14-0.98-0.32-1.45-0.52 l-9.02,18.32H57.12L57.12,84.23z M63.59,60.36c0.05-0.04,0.1-0.08,0.16-0.11c0.76-0.56,1.37-1.28,1.8-2.1 c0.74-1.41,0.94-3.1,0.43-4.74c-0.51-1.64-1.64-2.92-3.05-3.66c-1.37-0.72-3.01-0.93-4.61-0.47c-0.09,0.03-0.18,0.06-0.27,0.08 c-1.58,0.53-2.81,1.63-3.53,3c-0.72,1.37-0.93,3.01-0.47,4.61c0.03,0.09,0.06,0.18,0.08,0.27c0.53,1.58,1.63,2.81,3,3.53 c1.37,0.72,3.01,0.93,4.61,0.47c0.09-0.03,0.18-0.06,0.27-0.08C62.59,60.96,63.12,60.69,63.59,60.36L63.59,60.36z M69.25,48.16 l19.08-4.35l-7.09-24.92L39.87,31.75l1.44,5.11c0.01,0.04,0.03,0.09,0.04,0.13l0.25,0.9l4.38,15.6l2.67-0.57 c0.22-1.08,0.59-2.12,1.1-3.08c1.38-2.63,3.77-4.74,6.84-5.69l0.02,0c3.06-0.95,6.22-0.57,8.85,0.82 C66.91,45.74,68.22,46.82,69.25,48.16L69.25,48.16z M14.8,56.36c-0.15-0.24-0.27-0.5-0.35-0.79l-2.9-10.72l0.01,0l-0.01-0.02 c-0.02-0.09-0.04-0.18-0.06-0.27l-5.37,1.67l3.27,11.9l5.43-1.69L14.8,56.36L14.8,56.36z M17.79,46l1.5,5.47l19.04-5.14l-1.44-5.18 L36.86,41L17.79,46L17.79,46z" />
                </g>
              </svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1" x="0px" y="0px"
                        viewBox="0 0 100 85"
                        enableBackground="new 0 0 50 50"
                        fill="#ffffff"
                        xmlSpace="preserve"><g>
                            <path d="M35,9.9L18.5,5.1c-1.2-0.4-2.5,0.3-2.8,1.6L11.8,20c-0.4,1.2,0.3,2.5,1.6,2.8l16.5,4.8c1.2,0.4,2.5-0.3,2.8-1.6l3.9-13.4   C36.9,11.5,36.2,10.2,35,9.9z" /><polygon points="44.1,14.9 38.8,12.7 34.5,27.3 40.3,28.3  " /><polygon points="63.5,34.6 67.3,33.2 74.7,35.4 77,27.4 69.6,25.3 67.2,22 65.4,21.5 67.4,14.9 65.2,14.3 63.2,20.9 46.1,15.9    42.5,28.5  " /><polygon points="87.3,25.1 87.8,25.2 88.3,23.3 85.3,22.4 82.6,21.7 82.2,21.5 81.6,23.4 82.1,23.6 80.7,28.5 78.5,27.9 75.3,39.1    87.8,30.6 85.9,30  " /><circle cx="70.7" cy="39.1" r="3.5" /><path d="M44.4,30.8l-1.3,4.5l7.4,2.2l4.3,9l5.4,1.6l3.9-1.2l0.9-3.1l-2.5-3.4l-2.3-0.7l1.1-3.9L44.4,30.8z M60.2,43.8   c-0.2,0.6-0.9,1-1.5,0.8c-0.6-0.2-1-0.9-0.8-1.5c0.2-0.6,0.9-1,1.5-0.8C60,42.5,60.4,43.2,60.2,43.8z" /><rect x="58" y="13.1" transform="matrix(0.9603 0.279 -0.279 0.9603 6.526 -16.4198)" width="5.9" height="3.2" /><rect x="67.5" y="15.4" transform="matrix(-0.279 0.9603 -0.9603 -0.279 104.8436 -44.526)" width="3.2" height="3.4" /><path d="M65.7,49.1l-3.4,1.3l6.5,16.4l-7.7,3.5V50.7h-3.6v19.7l-7.9-3.6l7-16.3l-3.3-1.4L38.4,83.4c-0.4,0.9,0,2,0.9,2.4l0,0   c0.9,0.4,2,0,2.4-0.9l6.6-15.3l9.1,4.1v19.5c0,1,0.8,1.8,1.8,1.8h0c1,0,1.8-0.8,1.8-1.8V73.7l8.9-4l6.2,15.5c0.4,0.9,1.4,1.4,2.4,1   c0.9-0.4,1.4-1.4,1-2.4L65.7,49.1z" />
                        </g>
                    </svg> */}

              <div
                className={`${style.menu__item__content} ${
                  showSearchForm ? `${style.active}` : ""
                }`}
              >
                <div
                  className={style.overlay}
                  onClick={() => {
                    setShowSearchForm(!showSearchForm);
                  }}
                ></div>
                <div className={style.search__form__container}>
                  <div
                    className={style.close__button}
                    onClick={() => setShowSearchForm(!showSearchForm)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      width="35px"
                      viewBox="0 0 24 24"
                      className={style.search__icon}
                      onClick={() => setShowSearchForm(!showSearchForm)}
                    >
                      <path d="M7,18a1,1,0,0,1-.707-1.707l10-10A.99989.99989,0,0,1,17.707,7.707l-10,10A.99676.99676,0,0,1,7,18Z" />
                      <path d="M17,18a.99676.99676,0,0,1-.707-.293l-10-10A.99989.99989,0,0,1,7.707,6.293l10,10A1,1,0,0,1,17,18Z" />
                    </svg>
                  </div>
                  <SearchForm
                    buttonSearchText="Buscar"
                    inputPlaceholder="Buscar contenido..."
                    searchHandler={(e: any) => searchContentHandler(e)}
                    searchInputRef={searchInputRef}
                  />
                </div>
              </div>
            </div>
          )}
          <div className={style.menu__item} onClick={changeTheme} title="Tema">
            {theme === "theme__dark" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 0 24 24"
                width="32px"
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M18 9.52V6h-3.52L12 3.52 9.52 6H6v3.52L3.52 12 6 14.48V18h3.52L12 20.48 14.48 18H18v-3.52L20.48 12 18 9.52zm-6 7.98c-3.03 0-5.5-2.47-5.5-5.5S8.97 6.5 12 6.5s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z"
                  opacity=".3"
                />
                <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
              </svg>
            )}
            {theme === "theme__ligth" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="32px"
                viewBox="0 0 24 24"
                width="32px"
                fill="#ffffff"
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <g>
                    <path
                      d="M8.1,14.15C9.77,14.63,11,16.17,11,18c0,0.68-0.19,1.31-0.48,1.87c0.48,0.09,0.97,0.14,1.48,0.14 c1.48,0,2.9-0.41,4.13-1.15c-2.62-0.92-5.23-2.82-6.8-5.86C7.74,9.94,7.78,7.09,8.29,4.9c-2.57,1.33-4.3,4.01-4.3,7.1c0,0,0,0,0,0 c0.01,0,0.01,0,0.02,0C5.66,12,7.18,12.83,8.1,14.15z"
                      opacity=".3"
                    />
                    <path d="M19.78,17.51c-2.47,0-6.57-1.33-8.68-5.43C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12 c0,0.14,0.02,0.28,0.02,0.42C2.61,12.16,3.28,12,3.98,12c0,0,0,0,0,0c0-3.09,1.73-5.77,4.3-7.1C7.78,7.09,7.74,9.94,9.32,13 c1.57,3.04,4.18,4.95,6.8,5.86c-1.23,0.74-2.65,1.15-4.13,1.15c-0.5,0-1-0.05-1.48-0.14c-0.37,0.7-0.94,1.27-1.64,1.64 c0.98,0.32,2.03,0.5,3.11,0.5c3.5,0,6.58-1.8,8.37-4.52C20.18,17.5,19.98,17.51,19.78,17.51z" />
                    <path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z" />
                  </g>
                </g>
              </svg>
            )}
          </div>
          <div
            className={`${style.menu__item} ${style.close__btn}`}
            onClick={() => setExpandedMenu(!showExpandedMenu)}
            title="Menu"
          >
            {showExpandedMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="42px"
                width="42px"
                viewBox="0 0 24 24"
              >
                <path d="M7,18a1,1,0,0,1-.707-1.707l10-10A.99989.99989,0,0,1,17.707,7.707l-10,10A.99676.99676,0,0,1,7,18Z" />
                <path d="M17,18a.99676.99676,0,0,1-.707-.293l-10-10A.99989.99989,0,0,1,7.707,6.293l10,10A1,1,0,0,1,17,18Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="38px"
                viewBox="0 0 24 24"
                width="38px"
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <ExpandedMenu
        showExpandedMenu={showExpandedMenu}
        setExpandedMenu={setExpandedMenu}
      />
    </>
  );
};

export default OptionMenu;

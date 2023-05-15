import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Input.module.scss";

interface Props {
  val?: string;
  setter?: any;
  leftlabel?: string;
}

const InputImg = ({ val, setter, leftlabel }: Props) => {
  const [imgFile, setImgFile] = useState<File | any>();
  const [activeContent, setActiveContent] = useState(0);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setImgFile(e.target.files?.[0]);
  };

  const uploadImg = async () => {
    try {
      const formdata = new FormData();
      formdata.set("file", imgFile);

      await axios("/api/upload", {
        method: "POST",
        data: formdata,
      }).then(({ data }) => {
        if (data.result) {
          console.log("Foto subida correctamente!", data.result[0]);
          setter(`http://localhost:3000/files/${data.result[0]}`);
          return data.result[0];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label
        className={`${styles.chappie__input_img}
       ${styles.type__image}`}
      >
        <label className={styles.left__label}>{leftlabel}</label>
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setActiveContent(0)}
            className={activeContent == 0 ? styles.selected : ""}
          >
            URL
          </button>
          <button
            disabled
            type="button"
            className={activeContent == 1 ? styles.selected : ""}
            onClick={() => setActiveContent(1)}
          >
            Subir Archivo
          </button>
        </div>
        <div className={styles.content}>
          {activeContent === 0 && (
            <div className={styles.inputContent}>
              <div className={styles.first__col}>
                <input
                  className={styles.main__input}
                  type="text"
                  defaultValue={val}
                  onChange={(e) => setter(e.target.value)}
                />
              </div>

              {val?.trim() && (
                <div className={styles.image}>
                  <img src={val} alt="" />
                </div>
              )}
            </div>
          )}
          {activeContent === 1 && (
            <div className={styles.inputContent}>
              <div className={styles.second__col}>
                <div className={styles.upload__area}>
                  <div className={styles.image__area}>
                    <input
                      type="file"
                      value={val}
                      onChange={handleFileChange}
                    />
                    Elegir archivo
                  </div>
                  {imgFile && <span>{imgFile.name}</span>}
                </div>
                <button type="button" onClick={uploadImg}>
                  Subir archivo
                </button>
              </div>
              <div className={styles.image}>
                {val?.trim() && <img src={val} alt="" />}
              </div>
            </div>
          )}
        </div>
      </label>
    </>
  );
};

export default InputImg;

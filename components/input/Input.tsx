import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import { useState } from "react";

interface Props {
  id?: string;
  name?: string;
  leftlabel?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  leftContent?: string | React.ReactElement;
  rightContent?: string;
  onchange?: any;
  disabled?: boolean;
}

const Input = ({
  id,
  name,
  type = "text",
  disabled = false,
  leftlabel,
  placeholder,
  value,
  leftContent,
  rightContent,
  onchange,
}: Props) => {
  const [active, setActive] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [img, setimg] = useState("");

  let bothContent = "";

  if (leftContent) {
    bothContent = `${styles.leftContent}`;
  }
  if (rightContent) {
    bothContent = `${styles.rightContent}`;
  }
  if (leftContent && rightContent) {
    bothContent = `${styles.bothContent}`;
  }
  const showDatePicker = (id: string) => {
    let element: HTMLInputElement | any = document.getElementById(id);
    element?.showPicker();
  };

  const setFile = (value: any) => {
    console.log("VAAAAA", value.target);
    if (value?.target?.value) {
      const fr: any = new FileReader();
      let file: any = document.querySelector("input[name='images']");
      if (file) {
        file = file.files[0];
      }
      fr.readAsArrayBuffer(file);
      fr.onload = function () {
        // you can keep blob or save blob to another position
        const blob = new Blob([fr.result]);

        // url for download
        const url = URL.createObjectURL(
          blob
          // { type: file.type }
        );
        setimg(url);
        // let imagen: any = document.getElementById("im");

        // if (imagen) {
        //   imagen.value = url;
        // }
      };
    }
  };

  return type === "image" ? (
    <label
      htmlFor="img"
      className={`${styles.chappie__input} ${styles.type__image}`}
    >
      <div className={styles.image__area}>Subir imagen</div>
      {/* {img && <img className={styles.image} src={img} alt="" />} */}
      <input type="text" id="im" value={value} />
      <input
        id="img"
        style={{ display: "none" }}
        type="file"
        name={name}
        value={value}
        // onChange={(e) => setFile(e)}
        onChange={onchange}
      />
    </label>
  ) : (
    <div className={styles.chappie__input}>
      <div className={styles.left__label}>{leftlabel}</div>
      <div
        onClick={() => {
          if (type == "datetime-local" && id) {
            showDatePicker(id);
          }
        }}
        className={`${styles.container} ${bothContent} ${
          active ? styles.active : ""
        }`}
      >
        {leftContent ? (
          <div className={styles.lftContent}>{leftContent}</div>
        ) : null}
        <input
          id={id}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
          type={type}
          name={name}
          placeholder={placeholder}
          className={styles.active}
          value={value}
          onChange={onchange}
          disabled={disabled}
        />

        {rightContent ? (
          <div className={styles.rghtContent}>{rightContent}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Input;

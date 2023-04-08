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
  leftContent?: string;
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

  return (
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

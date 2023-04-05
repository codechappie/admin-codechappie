import React from "react";
import { useState } from "react";
import styles from "./Textarea.module.scss";

interface Props {
  name?: any;
  leftlabel?: string;
  placeholder?: string;
  value?: string;
  onchange?: any;
}

const Textarea = ({ leftlabel,name, placeholder, value, onchange }: Props) => {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.chappie__textarea}>
      <div className={styles.left__label}>{leftlabel}</div>

      <div className={`${styles.container} ${active ? styles.active : ""}`}>
        <textarea
          name={name}
          placeholder={placeholder}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
          onChange={onchange}
          defaultValue={value}
        ></textarea>
      </div>
    </div>
  );
};

export default Textarea;

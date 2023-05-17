import React, { useState } from "react";
import style from "./input-tag.module.scss";
interface Props {
  id: string;
  leftlabel: string;
  placeholder?: string;
  maxLength: number;
  values: [string],
  setValues: any,
}
const InputTag = ({ id, leftlabel, placeholder, maxLength, values, setValues }: Props) => {

  const addTagToTags = (e: any) => {
    let value = e.target.value.trim();
    if (values.length >= 5) {
      return;
    }
    if ((e.code === "Comma" || e.code === "Enter") && value !== "") {
      value = value.replaceAll(",", "");
      let found = values.find((tag) => tag === value);
      if (found) {
        e.target.value = "";
        return;
      }
      let newTags: any = [...values, value];
      setValues(newTags);
      e.target.value = "";
    }
  };
  const deleteTag = (el: string) => {
    let newTags = values.filter((tag) => tag !== el);
    setValues(newTags);
  };
  return (
    <>
      <label htmlFor={id} className={style.chappie__input__tag}>
        <label className={style.label}>{leftlabel}</label>
        <div className={style.tags}>
          {values.length < 1 ? (
            <span className={style.placeholder}>{placeholder}</span>
          ): ""}
          {values &&
            values.map((el, index) => (
              <div key={el + index} className={style.tag}>
                <small>{el}</small>
                <span onClick={() => deleteTag(el)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={16}
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            ))}
          {maxLength > values.length && (
            <input
              id={id}
              disabled={values.length >= maxLength ? true : false}
              type="text"
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                }
              }}
              onKeyUp={(e) => {
                e.preventDefault();
                addTagToTags(e);
              }}
            />
          )}
        </div>
      </label>
    </>
  );
};

export default InputTag;

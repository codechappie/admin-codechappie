import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import styles from "./Select.module.scss";
const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

interface Props {
  values: [
    {
      text: string;
      onclick: any;
      class: string;
    }
  ];
  editor: any;
}

export default function Select({ values, editor }: Props) {
  const [selected, setSelected] = useState(values[0]);

  const validation = (validate = "headings") => {
    if (validate == "headings") {
      if (editor.isActive("heading", { level: 1 })) {
        return "h1";
      } else if (editor.isActive("heading", { level: 2 })) {
        return "h2";
      } else if (editor.isActive("heading", { level: 3 })) {
        return "h3";
      } else if (editor.isActive("heading", { level: 4 })) {
        return "h4";
      } else if (editor.isActive("heading", { level: 5 })) {
        return "h5";
      } else {
        return "h6";
      }
    }
  };

  return (
    <div className={styles.chappie__select}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="">
          <Listbox.Button className="">
            <span className="">{validation("headings")}</span>
            <span className="">
              <ChevronUpDownIcon className="" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave={styles.opacity100}
            leaveFrom={styles.opacity100}
            leaveTo={styles.opacity0}
          >
            <Listbox.Options className={styles.listbox}>
              {values.map((element: any, personIdx: number) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${styles.listoption} ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={element.text}
                  onClick={element.onclick}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {element.text}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

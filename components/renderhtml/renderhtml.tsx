import { useEffect, useState } from "react";

import Prism from "prismjs";
const Renderhtml = ({ html }: any) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [htmlte, sethtmlte] = useState<any>();
  console.log(html)
  useEffect(() => {
    setDomLoaded(true);
    setTimeout(() => {
      Prism.highlightAll();
    }, 1);
  }, []);

  useEffect(() => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    newDiv.querySelectorAll("pre")?.forEach((el, ind) => {
      el.id = "codesample__" + ind;
      const toolDiv = document.createElement("div");
      toolDiv.setAttribute("class", "tools");
      toolDiv.innerHTML = `
        <span class="tooltip">¡Texto copiado ✨!</span>
        <button id="copy__button__${ind}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
        </button>
      `;

      el.appendChild(toolDiv);
    });

    sethtmlte(newDiv.innerHTML);

    newDiv.remove();
  }, [html]);

  useEffect(() => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = html;
    newDiv.querySelectorAll("pre")?.forEach((el, ind) => {
      document
        .getElementById(`copy__button__${ind}`)
        ?.addEventListener("click", () => {
          let tooltip = document.querySelector(`#codesample__${ind} .tooltip`);
          tooltip?.classList.add("show");
          var text = el.innerText.trim();
          navigator.clipboard.writeText(text);
          setTimeout(() => {
            tooltip?.classList.remove("show");
          }, 3000);
        });
    });
  }, [htmlte]);
  return (
    <>
      {domLoaded && (
        <div
          className="html__content"
          dangerouslySetInnerHTML={{ __html: htmlte }}
        ></div>
      )}
    </>
  );
};

export default Renderhtml;

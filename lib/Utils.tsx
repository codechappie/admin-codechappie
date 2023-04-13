import axios from "axios";

export const getTimeForpost = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const calculatePagesCount = (pageSize: any, totalCount: any) => {
  // we suppose that if we have 0 items we want 1 empty page
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

export const incrementView = async (
  id: string,
  type:string,
  views: number,
  setNumOfViews: any
) => {
  try {
    await axios
      .put(`/api/${type}/${id}`, {
        views: views + 1,
      })
      .then(({ data }) => {
        console.log(data)
        setNumOfViews(data[type].views);
      });
  } catch (error) {
    console.log(error);
  }
};

export const paginate = (array: any, page_size: any, page_number: any) => {
  page_number = page_number + 1;
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export const updateHistory = (lastUrl: string) => {
  (() => {
    let history: any = [];
    let sess = sessionStorage.getItem("lastseen");
    if (sess) {
      history = JSON.parse(sess);
    }
    let historyArray = history ? history : [];

    historyArray.push(lastUrl);

    sessionStorage.setItem("lastseen", JSON.stringify(historyArray));
  })();
};

export const generateSlug = (title: string) => {
  let str = title.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

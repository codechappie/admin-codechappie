"use client";

import InputImg from "@/components/input-img/InputImg";
import { useEffect, useState } from "react";

function HomePage() {
  const [file, setFile] = useState<File | undefined>();
  const [img, setImg] = useState();

  useEffect(() => {
    console.log(img);
  }, [img]);

  return <InputImg val={img} setter={setImg} />;
}

export default HomePage;

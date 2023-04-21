import { useRouter } from "next/router";
import React from "react";

const CoursePage = () => {
  const router = useRouter();

  console.log(router.query.courseId);

  return <div>coursePage {router.query.courseId}</div>;
};

export default CoursePage;
CoursePage.auth = true;
import Head from "next/head";
import style from "./admin.module.scss";
const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Codechappie - Admin</title>
        <meta name="title" content="CodeChappie - Admin" />
      </Head>
      <div className={style.homePage}></div>
    </>
  );
};

export default AdminPage;

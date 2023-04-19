import AdminPage from "@/components/admin";

const index = () => {
  return <AdminPage />;
};

// export const getStaticProps = async () => {

//   const headers = {
//     'api-key': process.env.DEVTO_API_KEY,
//   }

//   const { data } = await axios.get("https://dev.to/api/articles/me/all?page=1&per_page=6", { headers });
//   const videos = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_KEY}&channelId=UCgANZIFfnwnBLMwtC5HzlsQ&part=snippet,id&order=date&maxResults=6&type=video`);
//   return {
//     props: {
//       posts: data,
//       videos: videos.data.items,
//     }
//   }
// }

export default index;

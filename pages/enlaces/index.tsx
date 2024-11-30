import dbConnect from '@/lib/dbConnect';
import Link from '@/models/Link';
import React from 'react'
import styles from './links.module.scss'
import CardLink from '@/components/card-link/CardLink';

const LinksPage = ({ links }: any) => {
  return (
    <div className={styles.linksPage}>
        <div className={styles.links__container}>
                {(links && links.length > 0) && links.map((item: any, index: any) => (
                    <CardLink key={index} item={item} index={index} />
                ))}
            </div>
    </div>
  )
}


export async function getServerSideProps({ params, res }: any) {
  try {
    await dbConnect();

    const Links = await Link.find({
      public: { $ne: false },
    }).sort({
      position: 1,
    });

    const LinksFiltered = Links.map((doc: any) => {
      const link = doc.toObject();
      link._id = `${doc._id}`;
      return link;
    });

    return {
      props: {
        links: LinksFiltered,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        // TODO: REDIRECT TO BLOG NOT FOUND
        destination: "/",
      },
    };
  }
}


export default LinksPage
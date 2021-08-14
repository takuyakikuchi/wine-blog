import dayjs from 'dayjs'
import DefaultErrorPage from 'next/error'
import Link from "next/link";
import Head from "next/head";
import { client } from "../../libs/client";

import styles from "../../styles/Blog.module.css";

// Todo: update type
export default function BlogId({ blog }: any) {
  if (!blog) {
    <DefaultErrorPage statusCode={404} />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{blog?.title || 'タイトルなし'}</title>
        <meta name="description" content="Blog post" />
      </Head>
      <main className={styles.main}>
        <h1>{blog?.title || 'タイトルなし'}</h1>
        {blog?.publishedAt && <p>{dayjs(blog.publishedAt).format('YYYY-MM-DD')}</p> }
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog?.body}`,
          }}
        />
      </main>
      <footer className={styles.footer}>
        <Link href="/">Back to home</Link>
      </footer>
    </div>
  );
}

export const getStaticPaths = async () => {
  const data: any = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: true };
};

export const getStaticProps = async (context: any) => {
const id = context.params.id;
const draftKey = context.previewData?.draftKey
  ? { draftKey: context.previewData.draftKey }
  : {};

const data = await client.get({ endpoint: "blog", contentId: id, queries: draftKey, });

return {
  props: {
    blog: data,
    ...draftKey
  },
};
};
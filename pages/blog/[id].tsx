import dayjs from 'dayjs'
import DefaultErrorPage from 'next/error'
import Link from "next/link";
import Head from "next/head";
import { client } from "../../libs/client";

import styles from "../../styles/Blog.module.css";

// Todo: update type
export default function BlogId({ blog }: any) {
  // TODO: put this in env file later
  const ogpUrl = 'https://og-image-five-woad.vercel.app';

  if (!blog) {
    <DefaultErrorPage statusCode={404} />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{blog?.title || 'タイトルなし'}</title>
        <meta name="description" content="Blog post" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_takuyakikuchi" />
        <meta property="og:title" content="My Wine Blog" />
        <meta property="og:description" content={`${blog?.title}(${dayjs(blog?.publishedAt).format('YYYY-MM-DD')})`} />
        <meta property="twitter:image" content={`${ogpUrl}/**${blog?.title}**.png?theme=light&md=1&fontSize=100px&background=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1571656721197-d8f16e3b90d3%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1887%26q%3D80`} />
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

import { client } from "../../libs/client";

import styles from "../../styles/Blog.module.css";

// Todo: update type
export default function BlogId({ blog }: any) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const data: any = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
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

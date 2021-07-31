import { client } from "../libs/client";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ blog }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Wine Blog</title>
        <meta name="description" content="My wine blog" />
        {/* Todo: Upate the favicon later! */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>My Wine Blog</h1>

        <p className={styles.description}>
          I write a blog to record tasting comments and some learnings about wine!
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{blog[0].title}</h2>
            <p>Created at</p>
            <p>生産者</p>
            <p>AOC</p>
            <p>Vintage</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Wine Name</h2>
            <p>Created at</p>
            <p>生産者</p>
            <p>AOC</p>
            <p>Vintage</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Wine Name</h2>
            <p>Created at</p>
            <p>生産者</p>
            <p>AOC</p>
            <p>Vintage</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Wine Name</h2>
            <p>Created at</p>
            <p>生産者</p>
            <p>AOC</p>
            <p>Vintage</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        {/* ? Link to Twitter, Github? */}
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  // Todo: type should be changed
  const data: any = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

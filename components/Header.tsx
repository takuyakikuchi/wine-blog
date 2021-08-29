import styles from '@/styles/Home.module.scss';

export default function Header() {
  return (
    <>
      <h1 className={styles.title}>My Wine Blog</h1>
      <p className={styles.description}>
        I write a blog to record tasting comments and some learnings about wine!
      </p>
    </>
  );
}

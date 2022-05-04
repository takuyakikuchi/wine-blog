import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import ListItem from '@/components/ListItem';
import Pagination from '@/components/Pagination';
import { microcms } from '@/libs/microcms';
import { Blog, Post } from '@/types/blog';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';

type Props = {
  blog: Post[];
  currentPage?: number;
  totalCount: number;
};

export default function Home({ blog, currentPage = 1, totalCount }: Props) {
  return (
    <PageWrapper>
      <Head>
        <title>My Wine Blog</title>
        <meta name='description' content='My wine blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MaxWidthWrapper>
        <Header>
          <h1>My Wine Blog</h1>
          <p>I write a blog to record tasting comments and some learnings about wine!</p>
        </Header>

        <Main>
          <List>{blog && blog.map((post: Post) => <ListItem key={post.id} post={post} />)}</List>
        </Main>

        <Pagination currentPage={currentPage} totalCount={totalCount} />
      </MaxWidthWrapper>
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data: Blog = await microcms.get({ endpoint: 'blog' });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export const PageWrapper = styled.div`
  flex-grow: 1;
  padding: 32px 0;

  && > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

export const Header = styled.header`
  text-align: center;

  /* https://courses.joshwcomeau.com/css-for-js/05-responsive-css/16-fluid-calculator */
  h1 {
    font-size: clamp(2rem, 3vw + 1rem, 4rem);
  }

  p {
    font-size: clamp(1rem, 2.2vw + 0rem, 1.5rem);
  }
`;

export const Main = styled.main`
  width: 100%;
  flex-grow: 1;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

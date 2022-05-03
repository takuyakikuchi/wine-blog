import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { microcms } from '@/libs/microcms';
import { Blog, Post } from '@/types/blog';
import Card from 'src/components/home/Card';
import { Pagination } from 'src/components/home/Pagination';
import MaxWidthWrapper from 'src/components/ui/MaxWidthWrapper';

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
          <ListWrapper>
            {blog && blog.map((post: Post) => <Card key={post.id} post={post} />)}
          </ListWrapper>

          <Pagination currentPage={currentPage} totalCount={totalCount} />
        </Main>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding-top: 32px;
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 32px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px 0;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
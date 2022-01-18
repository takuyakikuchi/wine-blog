import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Card from '@/components/card/Card';
import Footer from '@/components/footer/Footer';
import { Pagination } from '@/components/pagination/Pagination';
import { microcms } from '@/libs/microcms';
import { Blog, Post } from '@/types/blog';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 0 8px;
  padding-top: 16px;
`;

export const Header = styled.header`
  text-align: center;

  h1 {
    font-size: 4rem;
  }
  p {
    font-size: 1.5rem;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
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
  width: 80%;

  @media (max-width: 600px) {
    width: 95%;
  }
`;

type Props = {
  blog: Post[];
  currentPage?: number;
  totalCount: number;
};

export default function Home({ blog, currentPage = 1, totalCount }: Props) {
  return (
    <Wrapper>
      <Head>
        <title>My Wine Blog</title>
        <meta name='description' content='My wine blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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

      <Footer />
    </Wrapper>
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

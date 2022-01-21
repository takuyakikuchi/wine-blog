import dayjs from 'dayjs';
import { GetStaticProps, GetStaticPaths } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { microcms } from '@/libs/microcms';
import { Post, Blog } from '@/utils/types/blog';

const OGP_URL = 'https://og-image-takuyakikuchi.vercel.app';
const OGP_IMAGE_URL =
  'https://images.unsplash.com/photo-1548025396-689d647d00c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1734&q=80';

export default function BlogId({ post }: { post: Post }) {
  if (!post) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { title, body, publishedAt } = post;

  return (
    <Wrapper>
      <Head>
        <title>{title || 'タイトルなし'}</title>
        <meta name='description' content='Blog post' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@_takuyakikuchi' />
        <meta property='og:title' content='My Wine Blog' />
        <meta
          property='og:description'
          content={`${title}(${dayjs(publishedAt).format('YYYY-MM-DD')})`}
        />
        <meta
          property='twitter:image'
          content={`${OGP_URL}/**${title}**.png?theme=dark&md=1&fontSize=100px&background=${OGP_IMAGE_URL}`}
        />
      </Head>

      <Header>
        <h1>{title || 'タイトルなし'}</h1>
        {publishedAt && <p>{dayjs(publishedAt).format('YYYY-MM-DD')}</p>}
      </Header>

      <Main>
        <div
          dangerouslySetInnerHTML={{
            __html: `${body}`,
          }}
        />
      </Main>

      <footer>
        <Link href='/'>Back to home</Link>
      </footer>
    </Wrapper>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Blog = await microcms.get({ endpoint: 'blog' });
  const paths = data.contents.map((post: Post) => `/blog/${post.id}`);
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context;

  if (!params?.id) {
    throw new Error('Error: ID not found');
  }
  const id = params.id.toString();

  const isPreview = (item: any): item is { draftKey: string } => {
    return !!(item?.draftKey && typeof item.draftKey === 'string');
  };

  const draftKey = isPreview(previewData) ? { draftKey: previewData.draftKey } : {};

  const data = await microcms.get({ endpoint: 'blog', contentId: id, queries: draftKey });
  return {
    props: {
      post: data,
      ...draftKey,
    },
  };
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  padding: 32px 8px;
`;

export const Header = styled.header`
  text-align: center;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  flex-grow: 1;
  width: 80%;
  padding: 16px 0;

  img {
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    width: 90%;
  }
`;

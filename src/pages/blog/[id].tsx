import { GetStaticProps, GetStaticPaths } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { toJapanDate } from '@/libs/dayjs';
import { microcms } from '@/libs/microcms';
import { Post, Blog } from '@/types/blog';

const OGP_URL = 'https://og-image-takuyakikuchi.vercel.app';
const OGP_IMAGE_URL =
  'https://images.unsplash.com/photo-1548025396-689d647d00c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1734&q=80';

export default function BlogId({ post }: { post: Post }) {
  if (!post) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { title, body, publishedAt } = post;

  return (
    <PageWrapper>
      <Head>
        <title>{title || 'タイトルなし'}</title>
        <meta name='description' content='Blog post' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@_takuyakikuchi' />
        <meta property='og:title' content='My Wine Blog' />
        <meta property='og:description' content={`${title}(${toJapanDate(publishedAt)})`} />
        <meta
          property='twitter:image'
          content={`${OGP_URL}/**${title}**.png?theme=dark&md=1&fontSize=100px&background=${OGP_IMAGE_URL}`}
        />
      </Head>

      <MaxWidthWrapper>
        <Header>
          <h1>{title || 'タイトルなし'}</h1>
          {publishedAt && <p>{toJapanDate(publishedAt)}</p>}
        </Header>

        <Main>
          <div
            dangerouslySetInnerHTML={{
              __html: `${body}`,
            }}
          />

          <Link href='/' passHref>
            <BackToHome>Back to home</BackToHome>
          </Link>
        </Main>
      </MaxWidthWrapper>
    </PageWrapper>
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

export const PageWrapper = styled.div`
  flex-grow: 1;
  padding: 32px 0;
`;

export const Header = styled.header`
  line-height: 2.5;
  text-align: center;
  h1 {
    font-size: clamp(1.5rem, 1.7vw + 1rem, 2.5rem);
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  img {
    height: 400px;
    width: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  a {
    align-self: center;
    color: ${({ theme }) => theme.colorTheme.textColor};

    &:hover {
      color: ${({ theme }) => theme.colorTheme.primaryColor};
    }
  }
`;

export const BackToHome = styled.a`
  color: ${({ theme }) => theme.colorTheme.textColor};

  &:hover {
    color: ${({ theme }) => theme.colorTheme.primaryColor};
  }
`;

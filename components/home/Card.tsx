import Link from 'next/link';
import styled from 'styled-components';
import { toJapanDate } from '@/utils/helper/dayjs';
import { Post } from '@/utils/types/blog';

export default function Card({ post }: { post: Post }) {
  const tastingContents = (
    <>
      <p>生産者: {post.producer}</p>
      <p>生産国: {post.country}</p>
      <p>原産地呼称: {post.aoc}</p>
      <p>ヴィンテージ: {post.vintage}</p>
      <p>ぶどう品種: {post.grapes ? post.grapes.join(', ') : ''}</p>
    </>
  );

  return (
    // passHref: https://nextjs.org/docs/messages/link-passhref
    <Link href={`/blog/${post.id}`} passHref>
      <CardAnchor>
        <h2>{post.title}</h2>
        {post.blogType.includes('テイスティング') && tastingContents}
        <p>投稿日: {toJapanDate(post.publishedAt)}</p>
      </CardAnchor>
    </Link>
  );
}

export const CardAnchor = styled.a`
  display: block;
  padding: 24px;
  color: inherit;
  text-decoration: none;
  border: 1px solid hsl(0deg 0% 92%);
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  h2 {
    font-size: 1rem;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media ${({ theme }) => theme.breakingPoints.tabletAndUp} {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

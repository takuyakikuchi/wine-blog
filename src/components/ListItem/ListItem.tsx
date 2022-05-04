import Link from 'next/link';
import styled from 'styled-components';
import { toJapanDate } from '@/libs/dayjs';
import { Post } from '@/types/blog';

export default function ListItem({ post }: { post: Post }) {
  return (
    // passHref: https://nextjs.org/docs/messages/link-passhref
    <Link href={`/blog/${post.id}`} passHref>
      <Card>
        <h2>{post.title}</h2>
        <p>生産者: {post.producer}</p>
        <p>生産国: {post.country}</p>
        <p>原産地呼称: {post.aoc}</p>
        <p>ヴィンテージ: {post.vintage}</p>
        <p>ぶどう品種: {post.grapes ? post.grapes.join(', ') : ''}</p>
        <p>投稿日: {toJapanDate(post.publishedAt)}</p>
      </Card>
    </Link>
  );
}

export const Card = styled.li`
  display: block;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colorTheme.lightGray};
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  h2 {
    font-size: 1rem;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colorTheme.primaryColor};
    border-color: ${({ theme }) => theme.colorTheme.primaryColor};
  }

  @media ${({ theme }) => theme.breakingPoints.tabletAndUp} {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

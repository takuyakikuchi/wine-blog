import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import styled from 'styled-components';
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
        <p>投稿日: {dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</p>
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
    font-size: 1.5rem;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    h2 {
      font-size: 1rem;
    }
  }
`;

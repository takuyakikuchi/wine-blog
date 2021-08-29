import Link from 'next/link';

export const PER_PAGE = 10;

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  const pages = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <ul>
      {pages(1, totalPages).map((page) => (
        <li key={page}>
          <Link href={`/blog/page/${page}`}>
            <a>{page}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

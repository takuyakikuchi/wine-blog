import Link from 'next/link';
import RcPagination, { PaginationProps } from 'rc-pagination';

export const PER_PAGE = 10;

type Props = {
  currentPage: number;
  totalCount: number;
};

export const Pagination = ({ currentPage, totalCount }: Props) => {
  const itemRender: PaginationProps['itemRender'] = (page, type, element) => {
    switch (type) {
      case 'page': {
        return (
          <Link href={`/blog/page/${page}`}>
            <a>{page}</a>
          </Link>
        );
      }
      case 'prev': {
        return <Link href={`/blog/page/${page}`}>{element}</Link>;
      }
      case 'next': {
        return <Link href={`/blog/page/${page}`}>{element}</Link>;
      }
      default:
        return element;
    }
  };

  return <RcPagination itemRender={itemRender} total={totalCount} />;
};

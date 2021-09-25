import { useRouter } from 'next/router';
import RcPagination, { PaginationProps } from 'rc-pagination';
import styles from '@/styles/Pagination.module.scss';

export const PER_PAGE = 10;

const getElement = (page: number, type: string) => {
  switch (type) {
    case 'page':
      return page;
    case 'prev':
      return '<';
    case 'next':
      return '>';
    case 'jump-prev':
    case 'jump-next':
      return '...';
    default:
      return null;
  }
};

const isPageDisabled = (page: number, currentPage: number) => page === 0 || page === currentPage;
const isCurrentPage = (page: number, type: string, currentPage: number) =>
  page === currentPage && type === 'page';

type Props = {
  currentPage: number;
  totalCount: number;
};

export const Pagination = ({ currentPage, totalCount }: Props) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/blog/page/${page}`);
  };

  const itemRender: PaginationProps['itemRender'] = (page, type) => {
    return (
      <div
        onClick={isPageDisabled(page, currentPage) ? () => {} : () => handlePageChange(page)}
        className={`${styles.item}
          ${isPageDisabled(page, currentPage) ? ` ${styles.disabled}` : ''}
          ${isCurrentPage(page, type, currentPage) ? ` ${styles.active}` : ''}`}
      >
        {getElement(page, type)}
      </div>
    );
  };

  return <RcPagination className={styles.container} itemRender={itemRender} total={totalCount} />;
};

import { useRouter } from 'next/router';
import RcPagination, { PaginationProps } from 'rc-pagination';
import { ReactElement, ReactNode } from 'react';
import styles from '@/styles/Pagination.module.scss';

export const PER_PAGE = 10;

type Props = {
  currentPage: number;
  totalCount: number;
};

export const Pagination = ({ currentPage, totalCount }: Props) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/blog/page/${page}`);
  };

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

  const isDisabled = (page: number) => page === 0 || page === currentPage;
  const isCurrentPage = (page: number, type: string) => page === currentPage && type === 'page';

  const itemRender: PaginationProps['itemRender'] = (page, type) => {
    return (
      <div
        onClick={isDisabled(page) ? () => {} : () => handlePageChange(page)}
        className={`${styles.item}
          ${isDisabled(page) ? ` ${styles.disabled}` : ''}
          ${isCurrentPage(page, type) ? ` ${styles.active}` : ''}`}
      >
        {getElement(page, type)}
      </div>
    );
  };

  return <RcPagination className={styles.container} itemRender={itemRender} total={totalCount} />;
};

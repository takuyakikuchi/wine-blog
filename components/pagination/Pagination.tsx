import { useRouter } from 'next/router';
import RcPagination from 'rc-pagination';
import styles from './Pagination.module.scss';

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

  const itemRender: any = (page: any, type: any) => {
    return (
      <div
        onClick={isPageDisabled(page, currentPage) ? () => {} : () => handlePageChange(page)}
        className={`${styles.item}
          ${isPageDisabled(page, currentPage) ? ` ${styles.disabled}` : ''}
          ${isCurrentPage(page, type, currentPage) ? ` ${styles.active}` : ''}`}
      >
        <span>{getElement(page, type)}</span>
      </div>
    );
  };

  return <RcPagination className={styles.container} itemRender={itemRender} total={totalCount} />;
};

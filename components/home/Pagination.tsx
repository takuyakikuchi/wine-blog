import { useRouter } from 'next/router';
import RcPagination from 'rc-pagination';
import styled from 'styled-components';
import { PER_PAGE } from '@/utils/constants';

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

  const itemRender = (page: number, type: string) => {
    return (
      <Item
        active={isCurrentPage(page, type, currentPage)}
        disabled={isPageDisabled(page, currentPage)}
        onClick={isPageDisabled(page, currentPage) ? () => {} : () => handlePageChange(page)}
      >
        <span>{getElement(page, type)}</span>
      </Item>
    );
  };

  return <StyledRcPagination itemRender={itemRender} total={totalCount} />;
};

export const StyledRcPagination = styled(RcPagination)`
  display: flex;
  gap: 8px;
  list-style: none;
`;

export const Item = styled.div<{ active: boolean; disabled: boolean }>`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  ${(props) => {
    if (props.active) {
      return `
        color: ${props.theme.colors.primary};
        border-color: ${props.theme.colors.primary};
      `;
    }

    if (props.disabled) {
      return `
        color: ${props.theme.colors.lightGray};
      `;
    }
  }}

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

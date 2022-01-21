import Image from 'next/image';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Wrapper>
      <Twitter>
        <span>Maintained by</span>
        <a href='https://twitter.com/_takuyakikuchi' target='_blank' rel='noopener noreferrer'>
          <span>@_takuyakikuchi</span>
          <Image src='/twitter.svg' alt='Twitter Logo' width={16} height={16} />
        </a>
      </Twitter>
    </Wrapper>
  );
}

export const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const Twitter = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  a {
    display: inline-flex;
    gap: 4px;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }
`;

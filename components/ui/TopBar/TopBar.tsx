import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';

export default function TopBar({ children }: { children: ReactNode }) {
  return (
    <div>
      <MaxWidthWrapper>
        <TopBarWrapper>
          <Link href='/' passHref>
            <Logo>My Wine Blog</Logo>
          </Link>
          {children}
        </TopBarWrapper>
      </MaxWidthWrapper>
    </div>
  );
}

export const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`;

export const Logo = styled.div`
  text-transform: uppercase;
  font-weight: bold;

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colorTheme.primaryColor};
  }
`;

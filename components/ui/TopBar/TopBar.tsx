import { ReactNode } from 'react';
import styled from 'styled-components';

export default function TopBar({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export const Wrapper = styled.div``;

import { ReactNode } from 'react';
import styled from 'styled-components';

export default function MaxWidthWrapper({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export const Wrapper = styled.div`
  --max: calc(1100 / 16 * 1rem);

  width: min(95%, var(--max));
  max-width: var(--max);
  margin-left: auto;
  margin-right: auto;
`;

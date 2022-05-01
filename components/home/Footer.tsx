import Image from 'next/image';
import styled from 'styled-components';
import { event, GA_TRACKING_ID } from '../../libs/gtag';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';

export default function Footer() {
  const handleTwitterClick = () => {
    if (!GA_TRACKING_ID) return;

    event({
      action: 'click',
      label: 'redirect-to-twitter',
    });
  };

  return (
    <FooterWrapper>
      <MaxWidthWrapper>
        <ContentWrapper>
          <Copyright>©︎takuyakikuchi 2022</Copyright>
          <ContactAt
            href='https://twitter.com/_takuyakikuchi'
            target='_blank'
            rel='noopener noreferrer'
            onClick={handleTwitterClick}
          >
            <span>Contact @</span>
            <Image src='/twitter.svg' alt='Twitter Logo' width={16} height={16} />
          </ContactAt>
          <p>
            このサイトはGoogle Analyticsを使用しています。
            <a
              href='https://policies.google.com/technologies/partner-sites?hl=ja'
              target='_blank'
              rel='noopener noreferrer'
            >
              詳しく見る
            </a>
          </p>
        </ContentWrapper>
      </MaxWidthWrapper>
    </FooterWrapper>
  );
}

export const FooterWrapper = styled.footer`
  width: 100%;
  padding: 24px;
  border-top: 1px solid ${({ theme }) => theme.colorTheme.lightGray};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colorTheme.textColor};

    &:hover {
      text-decoration: revert;
      color: ${({ theme }) => theme.colorTheme.primaryColor};
    }
  }
`;

export const Copyright = styled.span`
  display: inline-block;
`;

export const ContactAt = styled.a`
  display: inline-flex;
  gap: 4px;
  align-items: center;
`;

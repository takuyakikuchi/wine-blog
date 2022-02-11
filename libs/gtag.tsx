import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Measure pageviews
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

/**
 * Measure GA Events
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
// export const event = ({ action, category, label, value }) => {
//   window.gtag('event', action, {
//     event_category: category,
//     event_label: label,
//     value: value,
//   });
// };

/**
 * Google Analytics
 * When the router URL changes, fires the pageview function to measure pageviews.
 */
export const useGAPageview = () => {
  const router = useRouter();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

/**
 * Global Site Tag - Google Analytics
 * https://developers.google.com/tag-platform/gtagjs/install#create_your_own_tag
 */
export const GoogleAnalytics = () => (
  <>
    {GA_TRACKING_ID && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy='afterInteractive'
        />
        <Script
          id='gtag-init'
          defer
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </>
    )}
  </>
);

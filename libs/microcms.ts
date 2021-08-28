import { createClient } from 'microcms-js-sdk';

export const microcms = createClient({
  serviceDomain: 'wine-blog',
  apiKey: process.env.MICRO_CMS_API_KEY || '',
});

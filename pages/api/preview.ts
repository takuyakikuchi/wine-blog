import type { NextApiRequest, NextApiResponse } from 'next';
import { microcms } from '@/libs/microcms';
import { Post } from '@/utils/types/blog';

const preview = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const contentId = req?.query?.slug ? `${req.query.slug}` : '';
  const draftKey = req?.query?.draftKey ? `${req.query.draftKey}` : '';

  if (!draftKey) {
    return res.status(404).json({ message: 'Invalid draftKey' });
  }

  const content: Post = await microcms.get({
    endpoint: 'blog',
    contentId,
    queries: { draftKey },
  });

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end('Preview mode enabled');
};

export default preview;

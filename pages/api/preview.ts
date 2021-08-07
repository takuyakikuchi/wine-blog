import { client } from "../../libs/client";

// Todo: update type
const preview = async (req: any, res: any) => {
  if (!req.query.slug) {
    return res.status(404).end();
  }

  const content: any = await client.get({
    endpoint: "blog",
    contentId: req.query.slug,
    queries: {draftKey: req.query.draftKey}
  }).then().catch(error => null);

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

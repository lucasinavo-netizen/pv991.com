// Vietnam affiliate redirect. Keep the partner URL out of public HTML.
const TARGET = "https://www.v123888.com/agent/AUKMEH";

export default function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.redirect(302, TARGET);
}

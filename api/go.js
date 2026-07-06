const TARGET = 'https://www.myan99.me/m/home?affiliateCode=seom202';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.redirect(302, TARGET);
}

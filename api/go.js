const TARGET = 'https://www.rr95k.com/?ch=0cf28df51e';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.redirect(302, TARGET);
}

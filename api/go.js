const A = 'https://www.rr95k.com/?ch=0cf28df51e';
const B = 'https://www.mm38aa.com/m/home?affiliateCode=lu0001';

export default function handler(req, res) {
  const target = req.query.to === 'mm38' ? B : A;
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.redirect(302, target);
}

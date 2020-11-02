const vpns = [
  '66.70.179.26',
  '89.187.169.29',
  '139.99.69.33',
  '185.59.221.67',
  '185.180.13.68',
  '89.187.170.178'
];

export default (req, res) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = forwardedFor ? forwardedFor.split(',')[0] : req.connection.remoteAddress;
  res.statusCode = 200
  res.json({ 
    ip,
    isVPN: vpns.includes(ip),
  })
}

export default (req, res) => {
  res.statusCode = 200
  res.json({ 
    location: 'New York',
    isVPN: false
  })
}

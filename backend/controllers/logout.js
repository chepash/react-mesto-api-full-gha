module.exports.logout = (req, res) => {
  res.clearCookie('jwt', { domain: 'localhost', path: '/' })
    .send({ message: 'Logged out successfully' })
    .end();
};

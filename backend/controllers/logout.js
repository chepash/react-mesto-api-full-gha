module.exports.logout = (req, res) => {
  res.clearCookie('jwt', { path: '/' })
    .send({ message: 'Logged out successfully' })
    .end();
};

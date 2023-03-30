module.exports.logout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: 'Logged out successfully' })
    .end();
};

function Footer() {
  return (
    <footer className="footer section section_size_narrow">
      <p className="footer__copyright">
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;

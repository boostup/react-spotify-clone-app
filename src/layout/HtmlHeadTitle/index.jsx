const HtmlHeadTitle = ({ title }) => {
  var defaultTitle = process.env.REACT_APP_HTML_HEAD_TITLE;

  document.title = title ? `${title} - ${defaultTitle}` : defaultTitle;
  return null;
};

export default HtmlHeadTitle;

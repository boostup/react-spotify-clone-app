import { REACT_APP_HTML_HEAD_TITLE } from "../../utils/constants";

const HtmlHeadTitle = ({ title }) => {
  var defaultTitle = REACT_APP_HTML_HEAD_TITLE;

  document.title = title
    ? title + " - " + REACT_APP_HTML_HEAD_TITLE
    : defaultTitle;

  return null;
};

export default HtmlHeadTitle;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth } from "../../redux/auth/selectors";
import { startAuth } from "../../redux/auth/actions";

import HtmlHeadTitle from "../HtmlHeadTitle";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import Loading from "../../components/Loading";

import "./MainLayoutPageWrapper.css";

function MainLayoutPageWrapper({ title, isLoading, children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector(selectAuth);

  useEffect(() => {
    /**
     * STARTING AUTOMATIC AUTHORIZATION PROCESS HERE
     */
    dispatch(startAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authState.success === false) {
      history.replace({
        pathname: "/login",
        state: { error: authState.error },
      });
    }
  }, [history, authState]);

  const [bodyComponentScrollValue, setBodyComponentScrollValue] = useState(0);

  const handleScroll = (e) => {
    setBodyComponentScrollValue(e.target.scrollTop);
  };

  return (
    <div className="mainLayout">
      <HtmlHeadTitle title={title} />
      <Sidebar className="mainLayout__sidebar sidebar" />
      <Header
        className="mainLayout__header header"
        {...{ bodyComponentScrollValue }}
      />
      <Body onScroll={handleScroll} className="mainLayout__body body">
        {isLoading ? <Loading /> : children}
      </Body>
      <Footer className="mainLayout__footer footer" />
    </div>
  );
}

export default MainLayoutPageWrapper;

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { selectAuth, selectAuthUser } from "../../redux/auth/selectors";
import { selectHeader } from "../../redux/header/selectors";
import { selectSidebarPlaylists } from "../../redux/sidebar/selectors";
import {
  toggleDisplayItemToolbar,
  toggleHeaderScrolled,
} from "../../redux/header/actions";
import { startAuth } from "../../redux/auth/actions";
import { getSidebarPlaylistsAync } from "../../redux/sidebar/async-actions";
import { selectItemPage } from "../../redux/item-page/selectors";

import HtmlHeadTitle from "../HtmlHeadTitle";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import Loading from "../../components/Loading";

import "./MainLayoutPageWrapper.css";

function MainLayoutPageWrapper({
  title,
  dispatch,
  useSelector,
  isLoading = false,
  onDataRequest = () => ({ type: null }),
  children,
}) {
  const authState = useSelector(selectAuth);
  const history = useHistory();

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

  useEffect(() => {
    if (authState.success === true) {
      //Get data for layout components (ie Header, sidebar, footer, etc)

      //Get data specific to this page
      dispatch(onDataRequest());
    }
  }, [dispatch, onDataRequest, authState.success]);

  const user = useSelector(selectAuthUser);
  const userAvatar = user?.images[0].url;
  const userName = user?.display_name;
  const {
    //
    headerScrolled,
    displayItemToolbar,
    displaySearchBar,
  } = useSelector(selectHeader);
  const sidebarPlaylists = useSelector(selectSidebarPlaylists);
  const { isItemPage, item } = useSelector(selectItemPage);
  const itemName = item?.name;
  const itemURI = item?.uri;

  useEffect(() => {
    !sidebarPlaylists && getSidebarPlaylistsAync(dispatch);
  }, [dispatch, sidebarPlaylists]);

  const handleScroll = (e) => {
    const shouldDisplayHeaderBackground =
      e.target.scrollTop >= 70 ? true : false;
    if (headerScrolled !== shouldDisplayHeaderBackground)
      dispatch(toggleHeaderScrolled(shouldDisplayHeaderBackground));

    //ItemBanner component height + ItemToolbar component height = 473px
    const candDisplayPlaylistToolbar =
      isItemPage && e.target.scrollTop >= 473 ? true : false;
    if (displayItemToolbar !== candDisplayPlaylistToolbar) {
      console.log(
        "displayItemToolbar",
        displayItemToolbar,
        "candDisplayPlaylistToolbar",
        candDisplayPlaylistToolbar
      );
      dispatch(toggleDisplayItemToolbar(candDisplayPlaylistToolbar));
    }
  };

  return (
    <div className="mainLayout">
      <HtmlHeadTitle title={title} />
      <Sidebar
        className="mainLayout__sidebar sidebar"
        playlists={sidebarPlaylists}
      />
      <Header
        className={`mainLayout__header header  ${
          headerScrolled ? "scrolled" : "top"
        }`}
        {...{ dispatch, useSelector }}
        {...{ userAvatar, userName }}
        {...{ displaySearchBar, displayItemToolbar }}
        {...{
          isItemPage,
          itemName,
          itemURI,
        }}
      />
      <Body onScroll={handleScroll} className="mainLayout__body body">
        {isLoading ? <Loading /> : children}
      </Body>
      <Footer
        {...{ dispatch, useSelector }}
        className="mainLayout__footer footer"
      />
    </div>
  );
}

export default MainLayoutPageWrapper;

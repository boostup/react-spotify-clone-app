import React, { Component } from "react";
import NotFoundPage from "pages/NotFoundPage";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <NotFoundPage message="An error has occured." />
        </div>
      );
    }

    return this.props.children;
  }
}

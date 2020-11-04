import React from "react";
import MainLayout from "../../layout/MainLayout";

import "./YourLibrary.css";

function MyLibrary() {
  return (
    <MainLayout title="Your Library">
      <div className="myLibrary">
        <h1>My Library</h1>
      </div>
    </MainLayout>
  );
}

export default MyLibrary;

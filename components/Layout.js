import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};

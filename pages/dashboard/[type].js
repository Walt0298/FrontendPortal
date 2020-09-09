import React from "react";
import withSession from "../../lib/session";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Dashboard";
import Home from "../../components/Home";
import List from "../../components/List";
import FormReport from "../../components/FormReport";
import Usuarios from "../../components/Usuarios";
import FormUser from "../../components/FormUser";

const DashBoard = ({ user }) => {
  const router = useRouter();
  const { type } = router.query;
  if (type === "home") {
    return (
      <Layout user={user}>
        <Home user={user} />
      </Layout>
    );
  }
  if (type === "create") {
    return (
      <Layout user={user}>
        <h2>Create</h2>
        <FormReport user={user} type="create" />
      </Layout>
    );
  }
  if (type === "inventory") {
    return (
      <Layout user={user}>
        <h2 style={{ color: "black", padding: "20px" }}>Reportes</h2>;
        <Link href="create">
          <button className="report__button">Crear Reporte</button>
        </Link>
        <List />
      </Layout>
    );
  }
  if (type === "sales") {
    return (
      <Layout user={user}>
        <h2 style={{ color: "black", padding: "20px" }}>Reportes</h2>;
        <Link href="create">
          <button className="report__button">Crear Reporte</button>
        </Link>
        <List type="sales" />
      </Layout>
    );
  }
  if (type === "buys") {
    return (
      <Layout user={user}>
        <h2 style={{ color: "black", padding: "20px" }}>Reportes</h2>;
        <Link href="create">
          <button className="report__button">Crear Reporte</button>
        </Link>
        <List type="sales" />
      </Layout>
    );
  }
  if (type === "edit") {
    return (
      <Layout user={user}>
        <FormReport type="edit" />
      </Layout>
    );
  }
  if (type === "edit-user") {
    return (
      <Layout user={user}>
        <FormUser />
      </Layout>
    );
  }
  if (type === "users" && user.isLoggedIn) {
    return (
      <Layout user={user}>
        <Usuarios />
      </Layout>
    );
  } else {
    return <h1>404 Error</h1>;
  }
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default DashBoard;

DashBoard.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    login: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

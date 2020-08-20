import React from "react";
import { useState } from "react";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import Form from "../components/Form";
import fetchJson from "../lib/fetchJson";

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: "/dashboard/home",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Get form data
    let email = e.currentTarget.email.value;
    let password = e.currentTarget.password.value;

    const body = {
      email: email,
      password: password,
    };

    try {
      await mutateUser(
        fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <Layout>
      <div className="form_container">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default Login;

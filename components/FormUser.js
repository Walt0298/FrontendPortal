import { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import Router from "next/router";

const FormUser = () => {
  const { mutateUser, user } = useUser({
    redirectTo: "/dashboard/home",
    redirectIfFound: false,
  });
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData.name) throw Error("No User in Local Storage");
    setName(userData.name);
    setPhoto(userData.photo);
    setEmail(userData.email);
    setId(userData.id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      id,
      name: e.target.name.value,
      photo: e.target.photo.value,
      role: e.target.role.value,
      email: e.target.email.value,
    };
    try {
      await mutateUser(
        fetchJson("/api/update-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((res) => {
          Router.push("/dashboard/users");
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  };
  return (
    <div className="container">
      <h1 className="report__title">Actualizar Usuario</h1>
      <form className="form_container" onSubmit={handleSubmit} id="user">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.value)}
          placeholder="Nombre del Usuario"
          className="report__input"
        />
        <input
          type="text"
          name="photo"
          value={photo}
          onChange={(e) => setPhoto(e.value)}
          placeholder="Foto"
          className="report__input"
          required
        />
        <div className="report__type">
          <select name="role" form="user">
            <option value="USER">Usuario</option>
            {user && user.role === "ADMIN" && (
              <>
                <option value="BOSS">Jefe</option>
                <option value="ADMIN">Administrador</option>
              </>
            )}
          </select>
        </div>
        <textarea
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.value)}
        />
        <hr />
        <button type="submit" className="report__action">
          Actualiza
        </button>
        <hr />
      </form>

      <style jsx="true">
        {`
          .report__title {
            color: black;
          }
          .report__action {
            background: black;
            margin: 20px;
            height: 50px;
            color: white;
            font-size: 20px;
            letter-spacing: 5px;
            border-radius: 30px;
            outline: none;
            border: none;
            cursor: pointer;
            transition: 1s;
          }
          .report__action:hover {
            background: #ff6600;
          }
          .report__type {
            border: 1px solid black;
            border-radius: 4px;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 40px;
            margin: 0.3rem 0 1rem;
          }
          .report__type > select {
            background-color: transparent;
            padding: 8px;
            margin: 0.3rem 0 1rem;
            outline: 0;
            border: none;
            border-radius: 4px;
            width: 100%;
          }
          .report__input,
          textarea {
            border: 2px solid black;
          }
        `}
      </style>
    </div>
  );
};

export default FormUser;

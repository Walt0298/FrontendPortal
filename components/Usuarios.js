import { useState, useEffect } from "react";
import Router from "next/router";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const { mutateUser, user } = useUser({
    redirectTo: "/login",
    redirectIfFound: false,
  });

  useEffect(() => {
    const getUsers = async() => {
      mutateUser(
        await fetchJson("/api/get-users", {
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          setUsers(res.users && res.users.filter(u=>u.company===user.company));
        })
      );
    };
    try {
      if (user) getUsers();
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  }, [user]);
  const handleToEdit = (e) => {
    localStorage.setItem("user", e.target.dataset.user);
    Router.push("/dashboard/edit-user");
  };

  return (
    <div className="grid">
      <span>
        <b>Avatar</b>
      </span>
      <span>
        <b>Nombre</b>
      </span>
      <span>
        <b>Correo</b>
      </span>
      <span>
        <b>Acciones</b>
      </span>
      {users ? (
        users.map((data) => (
          <>
            <span style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={
                  data.photo ||
                  `https://robohash.org/${data.email}?set=set4&size=48x48`
                }
                width="48px"
                height="48px"
              />
            </span>
            <span>{data.name}</span>
            <span>{data.email}</span>
            <span>
              {user && user.role !== "USER" ? (
                <button
                  className="report__button"
                  data-user={JSON.stringify(data)}
                  onClick={handleToEdit}
                >
                  Editar
                </button>
              ) : (
                "No puedes editar"
              )}
            </span>
          </>
        ))
      ) : (
        <span>No hay usuarios aun</span>
      )}
      <style jsx="true">{`
        .grid {
          margin: 10px;
          background-color: white;
          color: black;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid gray;
          border-right: 1px solid gray;
        }

        .grid span {
          padding: 5px;
          border-left: 1px solid gray;
          border-bottom: 1px solid gray;
        }
        .modal-parent {
          background: rgba(0, 0, 0, 0.5);
          position: fixed;
          z-index: 2;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          justify-content: center;
          align-items: center;
        }
        .modal-parent iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <style global="true">
        {`
        .report__button{
          background:black;
        margin:20px;
        height:30px;
        color:white;
        font-size:15px;
        border-radius:30px;
        outline:none;
        border:none;
        cursor:pointer;
        transition:1s;
        }
        .report__button:hover{
          background:#ff6600
        }
      `}
      </style>
    </div>
  );
};

export default React.memo(Usuarios);

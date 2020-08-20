import { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import Router from "next/router";

const FormReport = ({ type }) => {
  const { mutateUser } = useUser({
    redirectTo: "/dashboard/list",
    redirectIfFound: false,
  });
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    if (type === "edit") {
      const report = JSON.parse(localStorage.getItem("report"));
      if (!report || !report.name) throw Error("No Report in Local Storage");
      setName(report.name);
      setURL(report.link);
      setId(report.id);
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      id,
      name: e.target.name.value,
      link: e.target.url.value,
    };
    try {
      await mutateUser(
        fetchJson(
          type === "create" ? "/api/create-report" : "/api/update-report",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        ).then((res) => {
          console.log(res);
          Router.push("/dashboard/list");
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  };
  return (
    <div className="container">
      {type=== "create" ? <h1 className="report__title">Crear Reporte</h1 > : <h1 className="report__title">Actualizar Reporte</h1>}
      <form className="form_container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.value)}
          placeholder="Nombre del Reporte"
          className="report__input"
        />
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setURL(e.value)}
          placeholder="Link a Power BI"
          className="report__input"
        />
        <button type="submit" className="report__action">
          {type === "create" ? "Crear" : "Actualiza"}
        </button>
        <hr />
        {url.includes("app.powerbi.com/reportEmbed") && (
          <a
            href={"https://powerbi.microsoft.com/en-us/landing/signin/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Edita in Power BI
          </a>
        )}
      </form>

      <style jsx="true">{`
        .report__title{
          color:black;
        }
        .report__action{
          background:black;
          margin:20px;
          height:50px;
          color:white;
          font-size:20px;
          letter-spacing:5px;
          border-radius:30px;
          outline:none;
          border:none;
          cursor:pointer;
          transition:1s;
        }
        .report__action:hover{
          background:#ff6600
        }
        .report__input{
          border:2px solid black;
        }
      `}

      </style>
    </div>
  );
};

export default FormReport;

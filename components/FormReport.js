import { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import Router from "next/router";

const FormReport = ({ type }) => {
  const { mutateUser, user } = useUser({
    redirectTo: "/dashboard/home",
    redirectIfFound: false,
  });
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [url, setURL] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (type === "edit") {
      const report = JSON.parse(localStorage.getItem("report"));
      if (!report || !report.name) throw Error("No Report in Local Storage");
      setName(report.name);
      setURL(report.link);
      setId(report.id);
      setDescription(report.description)
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      id,
      name: e.target.name.value,
      link: e.target.url.value,
      type: e.target.type.value,
      description: e.target.description.value,
      company: user.company
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
          Router.push("/dashboard/home");
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  };

  return (
    <div className="container">
      {type === "create" ? (
        <h1 className="report__title">Crear Reporte</h1>
      ) : (
        <h1 className="report__title">Actualizar Reporte</h1>
      )}
      <form className="form_container" onSubmit={handleSubmit} id="report">
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
          required
        />
        <div className="report__type">
          <select name="type" form="report">
            <option value="sales">Ventas</option>
            <option value="inventory">Inventario</option>
            <option value="buys">Compras</option>
          </select>
        </div>
        <textarea
          name="description"
          placeholder="Describe el reporte"
          value={description}
          onChange={(e) => setDescription(e.value)}
        />
        <hr />
        <button type="submit" className="report__action">
          {type === "create" ? "Crear" : "Actualiza"}
        </button>
        <hr />
        {url && url.includes("app.powerbi.com/reportEmbed") && (
          <a
            href={"https://powerbi.microsoft.com/en-us/landing/signin/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Edita in Power BI
          </a>
        )}
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

export default FormReport;

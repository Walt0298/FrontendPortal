import { useState, useEffect } from "react";
import Router from "next/router";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import Modal from "./Modal";

const List = () => {
  const [reports, setReports] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const { mutateUser } = useUser({
    redirectTo: "/login",
    redirectIfFound: false,
  });

  useEffect(() => {
    const getreports = async () => {
      await mutateUser(
        fetchJson("/api/get-reports", {
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          console.log(res);
          setReports(res.reports);
        })
      );
    };
    try {
      getreports();
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }, []);
  const handleToEdit = (e) => {
    console.log(e.target.dataset.report);
    localStorage.setItem("report", e.target.dataset.report);
    Router.push("/dashboard/edit");
  };

  const handleToggleModal = (url) => {
    setModalInfo(url);
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);
  return (
    <div className="grid">
      <span>
        <b>ID</b>
      </span>
      <span>
        <b>Reporte</b>
      </span>
      <span>
        <b>Creado</b>
      </span>
      <span>
      <b>Acciones</b>
      </span>
      {reports &&
        reports.map((report) => (
          <>
            <span>{report.id}</span>
            <span>{report.name}</span>
            <span>{report.date}</span>
            <span>
              <button className="report__button" onClick={(_) => handleToggleModal(report.link)}>
                Ver
              </button>{" "}
              <button
                className="report__button"
                data-report={JSON.stringify(report)}
                onClick={(e) => handleToEdit(e)}
              >
                Editar
              </button>
            </span>
          </>
        ))}
      <div
        className="modal-parent"
        style={{ display: isOpenModal ? "flex" : "none" }}
      >
        <Modal onClose={closeModal} show={isOpenModal}>
          {modalInfo && modalInfo.includes("app.powerbi.com/reportEmbed") && (
            <iframe
              width="100%"
              height="100%"
              src={modalInfo}
              frameborder="0"
              allowFullScreen="true"
            ></iframe>
          )}
        </Modal>
      </div>
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
      <style global="true">{`
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

export default List;

import React from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import { version } from '../package.json';

const Layout = ({ user, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutateUser } = useUser();
  const router = useRouter();
  const toggleAside = (_) => setIsOpen(!isOpen);

  return (
    <div className="grid-container">
      <div className="menu-icon" onClick={toggleAside}>
        <strong> &#9776;</strong>
      </div>
      <header className="header">
        <div className="header_search">{version}</div>
        <div className="header_avatar">
          {user?.isLoggedIn ? (
            <ul>
              <li>
                <img
                  src={
                    user.photoURL ||
                    `https://robohash.org/${user.email}?set=set4&size=100x100`
                  }
                  width="45px"
                  alt="Avatar"
                />
                <a>{user.displayName || user.email}</a>
              </li>
              <li>
                <a
                  className="logout"
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    await mutateUser(fetchJson("/api/logout"));
                    router.push("/login");
                  }}
                >
                  Salir
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link href="/login">
                  <a>Ingresar</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a>Registrarse</a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>
      <aside className={`aside ${isOpen && "active"}`}>
        <img src="/nisira.png" className="dash__logo" />
        <div className="aside_close-icon" onClick={toggleAside}>
          <strong>&times;</strong>
        </div>
        <ul className="aside_list">
          <Link href="/dashboard/home">
            <li className="aside_list-item">
            <img src="https://img.icons8.com/cotton/64/000000/combo-chart--v2.png" className="dash__icon" />
              <a>Principal</a>
            </li>
          </Link>
          {user && user.role === "ADMIN" && (
            <Link href="/dashboard/users">
              <li className="aside_list-item">
              <img src="https://img.icons8.com/cotton/64/000000/business-group.png" className="dash__icon" />
                <a>Usuarios</a>
              </li>
            </Link>
          )}
          <li className="aside_list-item">
            <details>
              <summary>
              <img src="https://img.icons8.com/cotton/64/000000/report-file--v1.png" className="dash__icon" />
                Reportes
              </summary>
              <div className="reportes">
                <Link href="/dashboard/sales">
                  <h4 className="reporte">Reporte Ventas</h4>
                </Link>
                <Link href="/dashboard/inventory">
                  <h4 className="reporte">Reporte Almacen</h4>
                </Link>
                <Link href="/dashboard/buys">
                  <h4 className="reporte">Reporte Compras</h4>
                </Link>
              </div>
            </details>
          </li>
        </ul>
      </aside>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="footer_copyright">&copy;2020</div>
        <div className="footer_byline">Made with &hearts;</div>
      </footer>
      <style global="true">{`
      .dash__logo{
        width:50%;
        margin:0px 50px;
      }
      details summary::-webkit-details-marker { display:none; }
      summary{
        display: list-item;
        
      }
      .dash__icon{
        width:30%;
        padding:10px;
      }
      summary:focus{
        border:none;
        outline:none;
        box-shadow:none;
        width:100%;
      }
      .reportes{
        display:flex;
        flex-direction:column;
        text-decoration:none;
        margin:10px 0px;
        
      }
      .reporte{
        padding:1px 0px;
        font-weigth:0;
        border-bottom:1px solid white;
      }
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
          body {
            margin: 0;
            padding: 0;
            color: white;
            box-sizing: border-box;
            font-family: monospace;
            font-size: 15px;
          }
          body div {
            margin: 0;
            padding: 0;
          }
        `}</style>
      <style jsx="true">{`
        .header ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        li .logout {
          padding: 0 10px;
          background-color: #ff6600;
          color: white;
          font-weigth: 900;
        }

        li img {
          background-color: white;
          border-radius: 50%;
          margin: 0 5px;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
        }

        .grid-container {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 50px 1fr 50px;

          grid-template-areas:
            "header"
            "main"
            "footer";
          height: 100vh;
        }

        .header {
          grid-area: header;
          background-color: black;
        }

        .aside {
          grid-area: aside;
          background-color: black;
        }

        .main {
          grid-area: main;
          background-color: white;
        }
        .footer {
          grid-area: footer;
          background-color: whitesmoke;
        }

        /* flexing header and footer*/
        .header,
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: darkblue;
          padding: 0 15px;
        }

        /* flexing aside */
        .aside {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 240px;
          position: fixed;
          overflow-y: auto;
          z-index: 2;
          transform: translateX(-245px);
        }

        .aside.active {
          transform: translateX(0);
        }

        .aside_list {
          padding: 0;
          margin-top: 85px;
          list-style-type: none;
        }

        .aside_list-item {
          padding: 20px 20px 20px 40px;
          color: white;
          text-decoration: none;
        }

        .aside_list-item:hover {
          background-color: #ff6600;
          cursor: pointer;
        }

        /* responsive layout */
        @media only screen and (min-width: 750px) {
          .grid-container {
            display: grid;
            grid-template-columns: 240px 1fr;
            grid-template-rows: 50px 1fr 50px;
            grid-template-areas:
              "aside header"
              "aside main"
              "aside footer";
            height: 100vh;
          }

          .aside {
            display: flex;
            flex-direction: column;
            position: relative;
            transform: translateX(0);
          }
        }

        .menu-icon {
          position: fixed;
          display: flex;
          top: 2px;
          left: 8px;
          align-items: center;
          justify-content: center;
          z-index: 1;
          cursor: pointer;
          padding: 12px;
          color: white;
        }

        .header_search {
          margin-left: 24px;
          color: white;
        }

        .aside_close-icon {
          position: absolute;
          visibility: visible;
          top: 20px;
          right: 20px;
          cursor: pointer;
        }
        @media only screen and (min-width: 750px) {
          .aside_close-icon {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;

import React from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

const Header = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  return (
    <header >
      <nav>
        <ul>
          <li>
          </li>
          {!user?.isLoggedIn && (
            <div>
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
            </div>
          )}
          {user?.isLoggedIn && (
            <>
              <li>
                <Link href="/dashboard/home">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <a
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
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding: 0 10px;
          justify-content: space-between;
        }

        li:first-child {
          marging-left: 20px;
        }

        ul>div {
          display: flex;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        a {
          background-color: #092425;
          color: white;
          padding: 5px 10px;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          min-width:100%;
          padding: 0.2rem;
          color: #fff;
          background-color: #092425;
        }
      `}</style>
    </header>
  );
};

export default Header;

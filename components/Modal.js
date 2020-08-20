import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <div className="content">{this.props.children}</div>
        <div className="actions">
          <button className="close" onClick={this.onClose}>
            Cerrar
          </button>
        </div>
        <style jsx>{`
          .modal {
            width: 80%;
            height: auto;
            border: 1px solid #ccc;
            transition: 1.1s ease-out;
            box-shadow: -2rem 2rem 2rem rgba(0, 0, 0, 0.2);
            filter: blur(0);
            transform: scale(1);
            opacity: 1;
            visibility: visible;
            z-index: 10;
            position: absolute;
          }
          .modal.off {
            opacity: 0;
            visibility: hidden;
            filter: blur(8px);
            transform: scale(0.66);
            box-shadow: 1rem 0 0 rgba(0, 0, 0, 0.2);
          }

          .close {
            position: absolute;
            right: 32px;
            bottom: 32px;
            width: 32px;
            height: 32px;
            opacity: 0.3;
          }
          .close:hover {
            opacity: 1;
          }
          .close:before,
          .close:after {
            position: absolute;
            left: 15px;
            content: " ";
            height: 33px;
            width: 2px;
            background-color: red;
          }
          .close:before {
            transform: rotate(45deg);
          }
          .close:after {
            transform: rotate(-45deg);
          }
          @supports (offset-rotation: 0deg) {
            offset-rotation: 0deg;
            offset-path: path("M 250,100 S -300,500 -700,-200");
            .modal.off {
              offset-distance: 100%;
            }
          }
          @media (prefers-reduced-motion) {
            .modal {
              offset-path: none;
            }
          }
          .modal h2 {
            border-bottom: 1px solid #ccc;
            padding: 1rem;
            margin: 0;
          }
          .modal .content {
            position: relative;
            padding-bottom: 56.25%;
          }
          .modal .actions {
            border-top: 1px solid #ccc;
            background: #eee;
            padding: 0.5rem 1rem;
          }
          .modal .actions button {
            border: 0;
            background: #78f89f;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            line-height: 1;
          }
          #centered-toggle-button {
            position: absolute;
          }
        `}</style>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

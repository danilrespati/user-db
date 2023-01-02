import React from "react";

const DeleteModal = ({
  handleDeleteFalse,
  handleDeleteTrue,
  fullName,
}: any) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Warning!</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleDeleteFalse}
          ></button>
        </header>
        <section className="modal-card-body">
          Are you sure you want to delete {fullName}?
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleDeleteTrue}>
            Confirm
          </button>
          <button className="button" onClick={handleDeleteFalse}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;

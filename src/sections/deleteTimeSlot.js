import { Modal, ModalHeader, ModalFooter, ModalButton } from "baseui/modal";
import React from "react";

export const Delete = (props) => {
  return (
    <Modal onClose={props.handleClose} isOpen={props.isOpen} size={500}>
      <ModalHeader>Are you sure you want delete?</ModalHeader>
      {/* <ModalBody>Are you sure you want delete?</ModalBody> */}
      <ModalFooter>
        <ModalButton onClick={props.handleClose}>Cancel</ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

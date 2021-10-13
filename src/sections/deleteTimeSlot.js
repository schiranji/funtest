import { Modal, ModalHeader, ModalFooter, ModalButton } from "baseui/modal";
import React from "react";
import { requestBase } from "../utils";
import { toaster } from "baseui/toast";

export const Delete = (props) => {
  const HandleDelete = async () => {
    const url = `/auth/groupEvent/event/delete/timeslot/${props.eventManagementData.eventId}/${props.data.uid}`;
    try {
      const response = await requestBase.delete(url);
      if (response.data.statusDescription === "Success") {
        toaster.positive(<p>Schedule has been update.</p>);
      } else {
        toaster.negative(<p>something went wrong.</p>);
      }
    } catch (e) {
      toaster.negative(<p>something went wrong.</p>);
    }
    setTimeout(() => {
      props.handleClose();
      props.pageRefresh();
    }, 100);
  };
  return (
    <Modal onClose={props.handleClose} isOpen={props.isOpen} size={500}>
      <ModalHeader>Are you sure you want delete?</ModalHeader>
      {/* <ModalBody>Are you sure you want delete?</ModalBody> */}
      <ModalFooter>
        <ModalButton onClick={props.handleClose}>Cancel</ModalButton>
        <ModalButton onClick={HandleDelete}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

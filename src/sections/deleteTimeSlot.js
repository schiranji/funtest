import { Modal, ModalHeader, ModalFooter, ModalButton } from "baseui/modal";
import React from "react";
import { Button, KIND } from "baseui/button";
import { requestBase } from "../utils";
import { toaster } from "baseui/toast";

export const Delete = (props) => {
  const HandleDelete = async (uid) => {
    const a = props.gridApi.getSelectedNodes();
    var p = [];
    a.forEach((element) => {
      const url = `/auth/groupEvent/event/delete/timeslot/${props.eventManagementData.eventId}/${element.data.uid}`;
      p.push(requestBase.delete(url));
    });

    try {
      Promise.all(p)
        .then((values) => {
          toaster.positive(<p>Schedule has been update.</p>);
          setTimeout(() => {
            props.handleClose();
            props.pageRefresh();
          }, 100);
        })
        .catch(() => {
          toaster.negative(<p>something went wrong.</p>);
          setTimeout(() => {
            props.handleClose();
            props.pageRefresh();
          }, 100);
        });
    } catch (e) {
      toaster.negative(<p>something went wrong.</p>);
    }
  };
  return (
    <Modal onClose={props.handleClose} isOpen={props.isOpen} size={500}>
      <ModalHeader>Are you sure you want delete?</ModalHeader>
      {/* <ModalBody>Are you sure you want delete?</ModalBody> */}
      <ModalFooter>
        <ModalButton kind={KIND.minimal} onClick={props.handleClose}>
          Cancel
        </ModalButton>
        <ModalButton onClick={() => HandleDelete(props.data.uid)}>
          Okay
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

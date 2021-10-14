import React, { useState } from "react";
import { handleWithAnyFunction, requestBase } from "../utils";
import SectionBody from "../components/SectionBody";
import SectionHeader from "../components/SectionHeader";
import { Row, Col } from "reactstrap";
import SubSection from "../components/Subsection";
import ActionButton from "../components/ActionButton";
import GuestList from "../components/GuestList";
import { toaster } from "baseui/toast";

const Guests = ({ formikProps, whenAny, eventManagementData }) => {
  const { handleSubmit } = formikProps;
  const [isloading, setLoading] = useState(false);

  const [isloadinghandleSendReminder, setLoadinghandleSendReminder] = useState(
    false
  );
  const [isloadinghandleReminder, setLoadinghandleReminder] = useState(false);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  const handleReminder = () => {
    setLoadinghandleReminder(true);
    try {
      requestBase({
        url: `/auth/event/eventManagement/update/remindRSVP/${eventManagementData.eventId}`, //your url
        method: "POST",
      }).then((response) => {
        setLoadinghandleReminder(false);
      });
    } catch (e) {
      setLoadinghandleReminder(false);
      toaster.negative(<p>something went wrong.</p>);
    }
  };
  const handleSendReminder = () => {
    setLoadinghandleSendReminder(true);
    try {
      requestBase({
        url: `/auth/event/eventManagement/update/remindEvent/${eventManagementData.eventId}`, //your url
        method: "POST",
      }).then((response) => {
        setLoadinghandleSendReminder(false);
      });
    } catch (e) {
      setLoadinghandleSendReminder(false);
      toaster.negative(<p>something went wrong.</p>);
    }
  };
  const handleExport = () => {
    setLoading(true);
    try {
      requestBase({
        url: `/auth/event/eventManagement/view/exportInvitees/${eventManagementData.eventId}`, //your url
        method: "POST",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invitees.${new Date().toString()}.csv`); //or any other extension
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      });
    } catch (e) {
      toaster.negative(<p>something went wrong.</p>);
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader>
        <h1>Guests</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <GuestList setDirty={whenAny}></GuestList>
          </SubSection>
          <Row>
            <Col>
              <ActionButton type="submit">Save Changes</ActionButton>
              <ActionButton
                isLoading={isloadinghandleReminder}
                onClick={handleReminder}
              >
                Remind RSVP
              </ActionButton>
              <ActionButton
                isLoading={isloadinghandleSendReminder}
                onClick={handleSendReminder}
              >
                Send Reminders
              </ActionButton>
              <ActionButton isLoading={isloading} onClick={handleExport}>
                Export To Excel
              </ActionButton>
            </Col>
          </Row>
        </form>
      </SectionBody>
    </>
  );
};

export default Guests;

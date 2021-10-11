import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import ActionButton from "../components/ActionButton";
import { handleWithAnyFunction, requestBase } from "../utils";
import SectionHeader from "../components/SectionHeader";
import SectionBody from "../components/SectionBody";
import SubSection from "../components/Subsection";
import TimeSlotGenerator from "../components/TimeSlotGenerator";
import useCall from "../shared/useCall";
import Table from "../shared/table";
import moment from "moment";
import { EditTimeSlot } from "./editTimeSlot";
import { Delete } from "./deleteTimeSlot";

const TimeSlots = ({
  formikProps,
  whenAny,
  eventManagementData,
  eventData,
}) => {
  const { handleSubmit, handleChange } = formikProps;
  const [showDialog, setshowDialog] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [viewOnly, setviewOnly] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [currentSlot, setcurrentSlot] = useState({});
  const startDate = moment(eventData.startDateTime, "YYYY-MM-DD");
  const endDate = moment(eventData.endDateTime, "YYYY-MM-DD");

  const multiEventCol = !startDate.diff(endDate)
    ? []
    : [
        {
          field: "startDate",
          cellRenderer: (props) =>
            moment(new Date(props.data.startDateTime)).format("DD MMM YYYY"),
        },
        {
          field: "endDate",
          cellRenderer: (props) =>
            moment(new Date(props.data.endDateTime)).format("DD MMM YYYY"),
        },
      ];

  const columns = [
    ...multiEventCol,
    {
      field: "startDateTime",
      cellRenderer: (props) =>
        moment(new Date(props.data.startDateTime)).format("h:mma"),
    },
    {
      field: "endDateTime",
      cellRenderer: (props) =>
        moment(new Date(props.data.endDateTime)).format("h:mma"),
    },
    {
      field: "signupName",
    },
    {
      field: "emailAdddress",
    },
    {
      field: "phoneNumber",
    },
  ];
  //const handleWithAny = handleWithAnyFunction(handleChange, whenAny);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  const slotResponse = useCall(
    () =>
      requestBase.get(
        `/auth/groupEvent/event/search/timeslot/${eventManagementData.eventId}`,
        {}
      ),
    [eventManagementData.eventId, refresh],
    []
  );

  const pageRefresh = () => {
    setrefresh(!refresh);
  };

  const viewHandler = (rowdata) => {
    setIsNew(false);
    setviewOnly(true);
    setcurrentSlot(rowdata);
    setshowDialog(true);
  };

  const editHandler = (rowdata) => {
    setIsNew(false);
    setviewOnly(false);
    setcurrentSlot(rowdata);
    setshowDialog(true);
  };

  const deleteHandler = (rowdata) => {
    setIsNew(false);
    setviewOnly(false);
    setcurrentSlot(rowdata);
    setDeleteDialog(true);
  };

  return (
    <>
      <SectionHeader>
        <h1>Time Slots</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <TimeSlotGenerator
              eventManagementData={eventManagementData}
              setDirty={whenAny}
              pageRefresh={pageRefresh}
              handleNew={() => {
                setIsNew(true);
                setshowDialog(true);
                setviewOnly(false);
              }}
            ></TimeSlotGenerator>
          </SubSection>
          <SubSection></SubSection>
          <Row>
            <Col>
              <Table
                columns={columns}
                viewHandler={viewHandler}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
                data={slotResponse.data}
              ></Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionButton type="submit">Save Changes</ActionButton>
            </Col>
          </Row>
          <EditTimeSlot
            data={isNew ? {} : currentSlot}
            handleClose={() => setshowDialog(!showDialog)}
            isOpen={showDialog}
            viewOnly={viewOnly}
            isNew={isNew}
            maxDate={eventData.endDateTime}
            minDate={eventData.startDateTime}
            eventManagementData={eventManagementData}
            pageRefresh={pageRefresh}
          />
          <Delete
            data={currentSlot}
            handleClose={() => setDeleteDialog(!showDeleteDialog)}
            isOpen={showDeleteDialog}
            viewOnly={viewOnly}
            pageRefresh={pageRefresh}
            eventManagementData={eventManagementData}
          />
        </form>
      </SectionBody>
    </>
  );
};

export default TimeSlots;

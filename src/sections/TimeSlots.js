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
import { Button, KIND } from "baseui/button";
import Export from "baseui/icon/arrow-up";
import { EVENT_TYPE } from "../utils";

const TimeSlots = ({
  formikProps,
  whenAny,
  eventManagementData,
  eventData,
}) => {
  const { handleSubmit, handleChange } = formikProps;
  const [showDialog, setshowDialog] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [isloading, setLoading] = useState(false);

  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [viewOnly, setviewOnly] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [currentSlot, setcurrentSlot] = useState({});
  const startDate = moment(eventData.startDateTime, "YYYY-MM-DD");
  const endDate = moment(eventData.endDateTime, "YYYY-MM-DD");
  const [paginationSize, setPaginationSize] = useState(5);
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  const eventTyepe =
    eventData.eventType === EVENT_TYPE.group ? "groupEvent" : "event";
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
      headerName: "Start Time",
      cellRenderer: (props) =>
        moment(new Date(props.data.startDateTime)).format("h:mma"),
    },
    {
      field: "endDateTime",
      headerName: "End Time",
      cellRenderer: (props) =>
        moment(new Date(props.data.endDateTime)).format("h:mma"),
    },
    {
      field: "signupName",
      headerName: "Name",
      cellRenderer: (props) =>
        props.data.signupName ? props.data.signupName : "Available",
    },
    {
      field: "emailAdddress",
      headerName: "Email",
      cellRenderer: (props) =>
        props.data.emailAdddress ? props.data.emailAdddress : "Available",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      cellRenderer: (props) =>
        props.data.emailAdddress ? props.data.emailAdddress : "Available",
    },
  ];
  //const handleWithAny = handleWithAnyFunction(handleChange, whenAny);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  const slotResponse = useCall(
    () =>
      requestBase.get(
        `/auth/${eventTyepe}/event/search/timeslot/${eventManagementData.eventId}`,
        {}
      ),
    [eventManagementData.eventId, refresh],
    []
  );
  const handleDownload = () => {
    setLoading(true);
    try {
      requestBase({
        url: `/auth/${eventTyepe}/event/export/timeslot/${eventManagementData.eventId}`, //your url
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `timeslot.${new Date().toString()}.csv`); //or any other extension
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
    }
  };
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

  const onPageSizeChanged = (e) => {
    console.log("newPageSize", e.target.value);
    setPaginationSize(e.target.value);
    if (gridApi) {
      gridApi.setDomLayout(e.target.value < 11 ? "autoHeight" : "normal");
      document.querySelector("#myGrid").style.height =
        e.target.value < 11 ? "" : "500px";
    }
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
              eventData={eventData}
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
              <Button
                style={{ marginRight: "10px" }}
                isLoading={isloading}
                onClick={handleDownload}
                kind={KIND.primary}
                endEnhancer={() => <Export size={24} />}
              >
                Export
              </Button>
              Page Size:
              <select
                style={{
                  width: "10%",
                  marginLeft: "5px",
                  marginBottom: "5px",
                }}
                onChange={onPageSizeChanged}
                id="page-size"
              >
                <option value="5" selected={paginationSize === "5"}>
                  5
                </option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table
                onGridReady={onGridReady}
                columns={columns}
                viewHandler={viewHandler}
                editHandler={editHandler}
                data={slotResponse.data}
                pagination={true}
                paginationPageSize={paginationSize}
                viewDelete={true}
                ActionRow="FIRST"
                IsCheckBox={true}
                rowSelection="multiple"
              ></Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionButton type="submit">Save Changes</ActionButton>
              <ActionButton onClick={deleteHandler}>Delete</ActionButton>
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
            gridApi={gridApi}
            data={currentSlot}
            isOpen={showDeleteDialog}
            viewOnly={viewOnly}
            pageRefresh={pageRefresh}
            eventManagementData={eventManagementData}
            handleClose={() => setDeleteDialog(!showDeleteDialog)}
          />
        </form>
      </SectionBody>
    </>
  );
};

export default TimeSlots;

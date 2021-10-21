import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { useFormikContext, Formik } from "formik";
import { Button, KIND } from "baseui/button";
import * as Yup from "yup";
import { toaster } from "baseui/toast";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ListHeader } from "./ListUi";
import { HiddenRow } from "../utils";
import Table from "../shared/table";
import { COUNTRY_TYPE } from "../utils";
const GuestListContainer = styled.div`
  margin-bottom: 35px;
`;
const Field = (props) => {
  return props.value ? (
    <span style={{ marginRight: "5px" }}>
      <strong>
        {props.title}
        {" : "}
      </strong>
      <span>{props.value}</span>
    </span>
  ) : (
    <span></span>
  );
};
const statusMode = (key) => {
  switch (key) {
    case "A":
      return "Accepted";
    case "D":
      return "Declined";
    case "M":
      return "Maybe";
    default:
      return "";
  }
};

const columns = [
  {
    headerName: "Name",
    cellRenderer: (props) => `${props.data.firstName}  ${props.data.lastName}`,
    width: 180,
  },
  {
    field: "emailAddress",
    headerName: "Email",
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "rsvpStatus",
    headerName: "Status",
    cellRenderer: (props) => statusMode(props.data.rsvpStatus),
    width: 150,
  },
  {
    field: "rsvpAdultCount",
    headerName: "Adult count",
    width: 150,
  },
  {
    field: "rsvpKidCount",
    headerName: "Kids Count",
    width: 150,
  },
  {
    field: "Viewed",
    headerName: "Viewed",
    width: 100,
  },
];

const GuestList = ({ setDirty, eventManagementData, eventData }) => {
  debugger;
  const { setFieldValue, values } = useFormikContext();
  const { invitees } = values;
  const [selectedInvitee, setSelectedInvitee] = useState({});
  const editHandler = (invitee) => {
    setDirty(true);
    setSelectedInvitee(invitee);
  };
  const deleteHandler = (invitee) => {
    setDirty(true);
    const newValue = invitees.filter((s) => {
      return (
        s.emailAddress !== invitee.emailAddress &&
        s.phoneNumber !== invitee.phoneNumber
      );
    });
    setFieldValue("invitees", [...newValue]);
  };
  const onGridReady = (params) => {
    //params.api.sizeColumnsToFit();
  };
  return (
    <GuestListContainer>
      <Row>
        <Col>
          <Card
            overrides={{
              Root: {
                style: ({ $theme }) => {
                  return {
                    padding: "15px",
                  };
                },
              },
            }}
            title="Guests"
          >
            <StyledAction>
              <p>Send invites to guests</p>
              <Formik
                enableReinitialize
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required("FirstName is required"),
                  lastName: Yup.string().required("LastName is required"),
                  phoneNumber: Yup.string().test(
                    "len",
                    "Email or Phone number is required",
                    function (value) {
                      const { emailAddress } = this.parent;
                      if (!emailAddress) return value != null;
                      return true;
                    }
                  ),
                  emailAddress: Yup.string()
                    .email()
                    .test(
                      "len",
                      "Email or Phone number is required",
                      function (value) {
                        const { phoneNumber } = this.parent;
                        if (!phoneNumber) return value != null;
                        return true;
                      }
                    ),
                })}
                initialValues={{
                  firstName: selectedInvitee.firstName || "",
                  lastName: selectedInvitee.lastName || "",
                  emailAddress: selectedInvitee.emailAddress || "",
                  phoneNumber: selectedInvitee.phoneNumber || "",
                  createdDate: selectedInvitee.createdDate || "",
                  rsvpAdultCount: selectedInvitee.rsvpAdultCount || "",
                  rsvpKidCount: selectedInvitee.rsvpKidCount || "",
                  uid: selectedInvitee.uid || null,
                  eventId: selectedInvitee.eventId || null,
                  id: selectedInvitee.id || null,
                  going: selectedInvitee.going || false,
                  interested: selectedInvitee.interested || false,
                  invited: selectedInvitee.invited || false,
                  liked: selectedInvitee.liked || false,
                  scheduled: selectedInvitee.scheduled || false,
                  shared: selectedInvitee.shared || false,
                  viewed: selectedInvitee.viewed || false,
                }}
                onSubmit={(newInviteeValues, { resetForm }) => {
                  setDirty(true);

                  const toInsert =
                    selectedInvitee === null
                      ? invitees
                      : invitees.filter((s) => {
                          return (
                            s.phoneNumber !== selectedInvitee.phoneNumber &&
                            s.emailAddress !== selectedInvitee.emailAddress
                          );
                        });

                  const existing = toInsert.filter((s) => {
                    return (
                      s.phoneNumber === selectedInvitee.phoneNumber ||
                      s.emailAddress === selectedInvitee.emailAddress
                    );
                  });

                  if (existing.length > 0) {
                    toaster.warning(
                      <p>A invitee with that email or phone already exists!</p>
                    );
                    return;
                  }

                  const newValue = [...toInsert, { ...newInviteeValues }];

                  setFieldValue("invitees", newValue);

                  resetForm();
                  setSelectedInvitee({});
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values: newInviteeValues,
                  errors,
                  setFieldValue: setNewinviteeFieldValue,
                }) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl
                          label="First Name"
                          error={errors.firstName}
                        >
                          <Input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={newInviteeValues.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Last Name" error={errors.lastName}>
                          <Input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={newInviteeValues.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Email" error={errors.emailAddress}>
                          <Input
                            name="emailAddress"
                            type="email"
                            placeholder="Email"
                            value={newInviteeValues.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Input>
                        </FormControl>
                      </Col>
                      <Col xs="1">
                        <FormControl label="Country" error={errors.phoneNumber}>
                          <Input
                            name="country"
                            type="tel"
                            placeholder="Country"
                            value={COUNTRY_TYPE[eventData.country]}
                          ></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Phone" error={errors.phoneNumber}>
                          <Input
                            name="phoneNumber"
                            type="tel"
                            placeholder="Phone Number"
                            value={newInviteeValues.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <HiddenRow>
                      <Input
                        name="createdDate"
                        type="text"
                        value={newInviteeValues.createdDate || null}
                        disabled
                      ></Input>
                      <Input
                        name="going"
                        type="text"
                        value={newInviteeValues.going || false}
                        disabled
                      ></Input>
                      <Input
                        name="interested"
                        type="text"
                        value={newInviteeValues.interested || false}
                        disabled
                      ></Input>
                      <Input
                        name="invited"
                        type="text"
                        value={newInviteeValues.invited || false}
                        disabled
                      ></Input>
                      <Input
                        name="liked"
                        type="text"
                        value={newInviteeValues.liked || false}
                        disabled
                      ></Input>
                      <Input
                        name="scheduled"
                        type="text"
                        value={newInviteeValues.scheduled || false}
                        disabled
                      ></Input>
                      <Input
                        name="shared"
                        type="text"
                        value={newInviteeValues.shared || false}
                        disabled
                      ></Input>
                      <Input
                        name="id"
                        type="text"
                        value={newInviteeValues.id || null}
                        disabled
                      ></Input>
                      <Input
                        name="uid"
                        type="text"
                        value={newInviteeValues.uid || null}
                        disabled
                      ></Input>
                      <Input
                        name="viewed"
                        type="text"
                        value={newInviteeValues.viewed || null}
                        disabled
                      ></Input>
                      <Input
                        name="rsvpKidCount"
                        type="number"
                        value={newInviteeValues.rsvpKidCount || null}
                        disabled
                      ></Input>
                      <Input
                        name="rsvpAdultCount"
                        type="number"
                        value={newInviteeValues.rsvpAdultCount || null}
                        disabled
                      ></Input>
                    </HiddenRow>

                    <Row>
                      <Col>
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          kind={KIND.primary}
                        >
                          Save
                          {newInviteeValues.name &&
                            ` "${newInviteeValues.name}"`}
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Formik>
            </StyledAction>
            <StyledBody>
              {invitees && invitees.length > 0 && (
                <ListHeader>Your guest list</ListHeader>
              )}
              <Table
                columns={columns}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
                data={invitees}
                pagination={true}
                paginationPageSize={5}
                viewDelete={true}
                ActionRow="FIRST"
                onGridReady={onGridReady}
              ></Table>
            </StyledBody>
          </Card>
        </Col>
      </Row>
    </GuestListContainer>
  );
};

export default GuestList;

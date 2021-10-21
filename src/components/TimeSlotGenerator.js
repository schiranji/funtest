import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Datepicker } from "baseui/datepicker";
import { Row, Col } from "reactstrap";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { useFormikContext, Formik } from "formik";
import { ListItem } from "baseui/list";
import { Delete } from "baseui/icon";
import { Button, KIND } from "baseui/button";
import * as Yup from "yup";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { requestBase } from "../utils";
import { toaster } from "baseui/toast";
import { TimePicker } from "baseui/timepicker";
import { EVENT_TYPE } from "../utils";

const TimeSlotGeneratorContainer = styled.div`
  margin-bottom: 35px;
`;

const HiddenRow = styled.div`
  display: none;
`;

const TimeSlotGenerator = ({
  setDirty,
  eventManagementData,
  eventData,
  handleNew,
  pageRefresh,
}) => {
  const { setFieldValue, values } = useFormikContext();
  const { startTime, endTime } = values;
  const eventTyepe =
    eventData && eventData.eventType === EVENT_TYPE.group
      ? "groupEvent"
      : "event";
  return (
    <TimeSlotGeneratorContainer>
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
            title="Time Slot Generator"
          >
            <StyledAction>
              <p>Generate time slots!</p>
              <Formik
                enableReinitialize
                validationSchema={Yup.object().shape({
                  templateStartDate: Yup.date().required(),
                  templateEndDate: Yup.date().required(),
                  timeSlotGap: Yup.number().required(),
                  timeSlotLength: Yup.number().required(),
                })}
                initialValues={{
                  templateStartDate: startTime,
                  templateEndDate:
                    endTime === null
                      ? new Date(startTime.getTime() + 15 * 60000)
                      : endTime,
                  timeSlotGap: 5,
                  timeSlotLength: 30,
                }}
                onSubmit={async (newGiftValues, { resetForm }) => {
                  setDirty(true);

                  try {
                    const r = await requestBase.post(
                      `/auth/${eventTyepe}/event/create/generateTimeSlots/${eventManagementData.eventId}`,
                      newGiftValues,
                      {}
                    );
                    const response = r.data;
                    if (response.statusCode === 15) {
                      toaster.warning(
                        "More than 100 slots! Check start and end dates and try again."
                      );
                      return;
                    }

                    if (response.statusCode === 0) {
                      pageRefresh();
                      setFieldValue("timeSlots", response.data.results);
                    }
                  } catch (e) {
                    toaster.negative(e.response.data.messages.join(","));
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values: generatorValues,
                  errors,
                  setFieldValue: setInnerFieldValue,
                }) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl
                          label="Start Date"
                          error={errors.templateStartDate}
                        >
                          <Datepicker
                            formatString="MM/dd/yyyy HH:mm"
                            timeSelectStart
                            minDate={startTime}
                            maxDate={generatorValues.templateEndDate}
                            value={generatorValues.templateStartDate}
                            onChange={({ time, date }) => {
                              setInnerFieldValue("templateStartDate", date);
                            }}
                            onBlur={handleBlur}
                          ></Datepicker>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl
                          label="End Date"
                          error={errors.templateEndDate}
                        >
                          <Datepicker
                            formatString="MM/dd/yyyy HH:mm"
                            timeSelectStart
                            minDate={generatorValues.templateStartDate}
                            maxDate={endTime !== null ? endTime : null}
                            value={generatorValues.templateEndDate}
                            onChange={({ time, date }) => {
                              setInnerFieldValue("templateEndDate", date);
                            }}
                            onBlur={handleBlur}
                          ></Datepicker>
                        </FormControl>
                      </Col>

                      <Col>
                        <FormControl
                          label="Length of each slot (minutes)"
                          error={errors.timeSlotLength}
                        >
                          <Input
                            name="timeSlotLength"
                            type="number"
                            error={errors.timeSlotLength}
                            value={generatorValues.timeSlotLength}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl
                          label="Time between slots"
                          error={errors.timeSlotGap}
                        >
                          <Input
                            name="timeSlotGap"
                            type="number"
                            error={errors.timeSlotGap}
                            value={generatorValues.timeSlotGap}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          kind={KIND.primary}
                          style={{ "margin-right": "10px" }}
                        >
                          Generate
                        </Button>

                        <Button
                          type="button"
                          onClick={handleNew}
                          kind={KIND.primary}
                        >
                          Create Timeslot
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Formik>
            </StyledAction>
            <StyledBody></StyledBody>
          </Card>
        </Col>
      </Row>
    </TimeSlotGeneratorContainer>
  );
};

export default TimeSlotGenerator;

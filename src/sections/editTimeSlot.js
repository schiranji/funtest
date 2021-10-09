import React from "react";
import { FormControl } from "baseui/form-control";
import { Formik, Form } from "formik";
import { Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalFooter } from "baseui/modal";
import { Datepicker } from "baseui/datepicker";
import { Button, KIND } from "baseui/button";

export const EditTimeSlot = (props) => {
  return (
    <Modal onClose={props.handleClose} isOpen={props.isOpen} size={1000}>
      <ModalHeader>Edit TimeSlot</ModalHeader>
      <Formik
        initialValues={{
          startDateTime: new Date(props.data.startDateTime),
          endDateTime: new Date(props.data.endDateTime),
        }}
        validationSchema={null}
        onSubmit={undefined}
      >
        {({ handleBlur, handleSubmit, touched, values: value, errors }) => (
          <Form style={{ margin: 50 }}>
            <Row>
              <Col>
                <FormControl
                  label="startdatetime"
                  error={touched.startDateTime ? errors.startDateTime : null}
                >
                  <Datepicker
                    formatString="MM/dd/yyyy HH:mm"
                    onChange={({ time, date }) => {}}
                    onBlur={handleBlur}
                    value={value.startDateTime}
                    timeSelectStart
                    disabled={props.viewOnly}
                  ></Datepicker>
                </FormControl>
              </Col>
              <Col>
                <FormControl
                  label="endDateTime"
                  error={touched.endDateTime ? errors.endDateTime : null}
                >
                  <Datepicker
                    formatString="MM/dd/yyyy HH:mm"
                    onChange={({ time, date }) => {}}
                    onBlur={handleBlur}
                    value={value.endDateTime}
                    timeSelectStart
                    disabled={props.viewOnly}
                  ></Datepicker>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
          </Form>
        )}
      </Formik>
      <ModalFooter>
        <Button
          style={{ margin: "0px 10px" }}
          type="button"
          onClick={props.handleClose}
          kind={KIND.primary}
        >
          Cancel
        </Button>
        <Button type="button" onClick={null} kind={KIND.primary}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

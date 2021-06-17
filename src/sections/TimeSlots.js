import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Datepicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import FormControl from "../components/FormControl";
import { Select, TYPE } from "baseui/select";
import { FileUploader } from 'baseui/file-uploader'
import ActionButton from '../components/ActionButton';
import { handleWithAnyFunction, requestBase } from '../utils'
import SectionHeader from '../components/SectionHeader';
import SectionBody from '../components/SectionBody';
import { Editor } from 'react-draft-wysiwyg';
import { toaster } from 'baseui/toast';
import { TimePicker } from 'baseui/timepicker';
import { Button, KIND } from 'baseui/button';
import SubSection from '../components/Subsection';
import TimeSlotGenerator from '../components/TimeSlotGenerator';

const TimeSlots = ({formikProps, whenAny, eventData}) => {
  const { handleSubmit, 
    handleBlur, 
    handleChange, 
    values, 
    errors,
    setFieldValue } = formikProps;
  const handleWithAny = handleWithAnyFunction(handleChange, whenAny);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);

  return (
    <>
      <SectionHeader>
        <h1>Time Slots</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <TimeSlotGenerator setDirty={whenAny}></TimeSlotGenerator>
          </SubSection>
          <SubSection>

          </SubSection>
          <Row>
            <Col>
              <ActionButton type="submit">Save Changes</ActionButton>
            </Col>
          </Row>
        </form>
      </SectionBody>
    </>
  )
}

export default TimeSlots;
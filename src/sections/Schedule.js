import React from 'react';
import styled from 'styled-components';
import { handleWithAnyFunction } from '../utils';
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import { Row, Col } from 'reactstrap';
import SubSection from '../components/Subsection';
import ActionButton from '../components/ActionButton';

const Schedule = ({formikProps, whenAny}) => {
  const { handleSubmit } = formikProps;
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);

  return (
    <>
      <SectionHeader>
        <h1>Event Scheduler</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <p>Set up your event's schedule!</p>
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

export default Schedule;

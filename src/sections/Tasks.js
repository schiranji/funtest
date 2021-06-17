import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleWithAnyFunction } from '../utils';
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import { Row, Col } from 'reactstrap';
import SubSection from '../components/Subsection';
import ActionButton from '../components/ActionButton';
import TaskList from '../components/TaskList';

const Tasks = ({formikProps, whenAny}) => {
  const { handleSubmit } = formikProps;
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  
  return (
    <>
      <SectionHeader>
        <h1>Event Tasks</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <p>Manage your event tasks, assign them to people on your team, and get them done!</p>
            <TaskList setDirty={whenAny}></TaskList>
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

export default Tasks;

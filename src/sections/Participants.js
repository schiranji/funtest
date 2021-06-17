import React from 'react';
import { handleWithAnyFunction } from '../utils';
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import { Row, Col } from 'reactstrap';
import SubSection from '../components/Subsection';
import ActionButton from '../components/ActionButton';
import ParticipantList from '../components/ParticipantList';

const Participants = ({formikProps, whenAny}) => {
  const { handleSubmit } = formikProps;
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  

  return (
    <>
      <SectionHeader>
        <h1>Participants and featured guests</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <ParticipantList setDirty={whenAny}></ParticipantList>
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

export default Participants;

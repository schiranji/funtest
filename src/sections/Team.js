import React from 'react';
import { handleWithAnyFunction } from '../utils';
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import { Row, Col } from 'reactstrap';
import SubSection from '../components/Subsection';
import ActionButton from '../components/ActionButton';
import TeamList from '../components/TeamList';

const Team = ({formikProps, whenAny}) => {
  const { handleSubmit } = formikProps;
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);

  return (
    <>
      <SectionHeader>
        <h1>Event management team</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <TeamList setDirty={whenAny}></TeamList>
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

export default Team;

import React from 'react'
import { handleWithAnyFunction } from '../utils';
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import { Row, Col } from 'reactstrap';
import SubSection from '../components/Subsection';
import ActionButton from '../components/ActionButton';
import SponsorList from '../components/SponsorList';
import BoothList from '../components/BoothList';

const Sponsors = ({formikProps, whenAny}) => {
  const { handleSubmit } = formikProps;
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  
  return (
    <>
      <SectionHeader>
        <h1>Sponsorships and Booth Sales</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <SponsorList setDirty={whenAny}></SponsorList>
          </SubSection>
          <SubSection>
            <BoothList setDirty={whenAny}></BoothList>
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

export default Sponsors;
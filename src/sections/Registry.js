import React from 'react'
import { Row, Col } from 'reactstrap';
import ActionButton from '../components/ActionButton';
import { handleWithAnyFunction } from '../utils'
import SectionHeader from '../components/SectionHeader';
import SectionBody from '../components/SectionBody';
import SubSection from '../components/Subsection';
import RegistryList from '../components/RegistryList';

const Registry = ({formikProps, whenAny, eventData}) => {
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
        <h1>Registry</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <SubSection>
            <RegistryList setDirty={whenAny}></RegistryList>
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

export default Registry;
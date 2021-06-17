import React, {useState, useEffect} from 'react'
import SectionHeader from '../components/SectionHeader'
import SectionBody from '../components/SectionBody'
import { Row, Col } from 'reactstrap';
import { Textarea } from "baseui/textarea";
import ActionButton from '../components/ActionButton';
import { handleWithAnyFunction } from '../utils'
import FormControl from '../components/FormControl';

const Accomodations = ({formikProps, whenAny}) => {
  const {handleSubmit, handleBlur, handleChange, values } = formikProps;
  const handleWithAny = handleWithAnyFunction(handleChange, whenAny);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false)

  return (
    <>
      <SectionHeader>
        <h1>Accomodations</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <Row>
            <Col md={8}>
              <FormControl 
                label="Getting to the venue" 
                caption="Any special directions for getting to the venue?">
                <Textarea 
                  name="transportation"
                  type="text"
                  onChange={handleWithAny}
                  onBlur={handleBlur}
                  value={values.transportation}
                  placeholder={"Easiest way to reach..."}></Textarea>
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <FormControl
                label="Parking" 
                caption="Any parking instructions or recommendations?">
                <Textarea 
                  name="parking"
                  type="text"
                  onChange={handleWithAny}
                  onBlur={handleBlur}
                  value={values.parking}
                  placeholder={"Specific parking directions..."}></Textarea>
              </FormControl>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <FormControl
                label="Places to stay" 
                caption="Any plans or recommendations for places to stay?">
                <Textarea 
                  name="placesToStay"
                  type="text"
                  onChange={handleWithAny}
                  onBlur={handleBlur}
                  value={values.placesToStay}
                  placeholder={"Nearby places to stay..."}></Textarea>
              </FormControl>
            </Col>
          </Row>
          
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

export default Accomodations;
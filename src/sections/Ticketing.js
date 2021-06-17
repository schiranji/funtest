import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import FormControl from '../components/FormControl'
import { handleWithAnyFunction } from '../utils';
import { Row, Col } from 'reactstrap';
import { RadioGroup, ALIGN, Radio } from 'baseui/radio';
import { Input } from 'baseui/input';
import ActionButton from '../components/ActionButton';
import { Field } from 'formik';
import ExternalUrls from '../components/ExternalUrls';
import SubSection from '../components/Subsection';
import TicketCategories from '../components/TicketCategories';


const Ticketing = ({formikProps, whenAny}) => {
  const { handleSubmit, handleBlur, handleChange, values, errors, setFieldValue } = formikProps;
  const handleWithAny = handleWithAnyFunction(handleChange, whenAny);
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);
  
  return (
    <>
      <SectionHeader>
        <h1>Ticketing</h1>
      </SectionHeader>
      <SectionBody>
        <form onSubmit={submitWithAny}>
          <Row>
            <Col md={4}>
              <FormControl label="Event invite system">
                <RadioGroup
                  name="rsvpOrTicketed"
                  value={values.rsvpOrTicketed}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "open" || newValue === "ticketed") {
                      setFieldValue("rsvpMaxCount", 0);
                      setFieldValue("rsvpRequired", false)
                    } else {
                      setFieldValue("rsvpRequired", true)
                      // ticketURLs and ticketCategories need to be cleared
                      // maybe do it on submit
                      // 
                    }
                    handleWithAny(e);
                  }}
                  handleBlur={handleBlur}
                  value={values.rsvpOrTicketed}
                  align={ALIGN.vertical}>
                  <Radio 
                    value="open" 
                    description="Open to all, no RSVP required">Open</Radio>
                  <Radio 
                    value="rsvp" 
                    description="RSVP required">RSVP Only</Radio>
                  <Radio 
                    value="ticketed" 
                    description="Free or paid ticket required.">Ticketed</Radio>
                </RadioGroup>
              </FormControl>
            </Col>
            {values.rsvpOrTicketed === "rsvp" && (
              <Col md={4}>
                <Field validate={(value) => {
                  if (!/^\d+$/.test(value)) {
                    return "RSVP count must be a number!"
                  }
                  if (value <= 0) {
                    return "RSVP max must be at least 1!"
                  }
                }} name="rsvpMaxCount">
                  {({field, form: {touched, errors}, meta}) => (
                    <FormControl label="Event capacity" caption="This is the maximum number of people that will be allowed to RSVP." error={errors.rsvpMaxCount}>
                      <Input
                        error={errors.rsvpMaxCount}
                        type="number"
                        {...field}
                        placeholder="Enter max event capacity"></Input>
                    </FormControl>
                  )}
                </Field>
              </Col>
            )}
          </Row>
          
          {values.rsvpOrTicketed === "ticketed" && (
            <SubSection>
              <Row>
                <Col>
                  <h2>Ticket Manager</h2>
                </Col>
              </Row>

              <ExternalUrls setDirty={whenAny}></ExternalUrls>
              <TicketCategories setDirty={whenAny}></TicketCategories>
            </SubSection>
          )}

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

export default Ticketing;
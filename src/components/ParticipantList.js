import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { useFormikContext, Formik } from 'formik';
import { ListItem } from 'baseui/list';
import { Delete } from 'baseui/icon';
import { Button, KIND } from 'baseui/button';
import * as Yup from 'yup';
import { toaster } from 'baseui/toast';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { ListHeader } from './ListUi'

const ParticipantDisplay = styled.div`
  margin-bottom: 35px;
`

const ParticipantListContainer = styled(Row)`
  margin-bottom: 35px;
`

const ParticipantList = ({setDirty}) => {
  const [selectedParticipant, setSelectedParticipant] = useState({});
  const { setFieldValue, values } = useFormikContext();
  const { participants } = values;
  
  return (
    <ParticipantListContainer>
      <Col>
        <Card overrides={{
          Root: {
            style: () => {
              return {
                padding: "15px"
              };
            }
          }
        }}
        title="Participants and Featured Guests">
          <StyledAction>
            <p>Add featured guests and participants to your event!</p>

            <Formik
              enableReinitialize
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                phoneNumber: Yup.string().required(),
                emailAddress: Yup.string().email(),
                website: Yup.string().url(),
              })}
              initialValues={{
                firstName: selectedParticipant.firstName || "",
                lastName: selectedParticipant.lastName || "",
                phoneNumber: selectedParticipant.phoneNumber || "",
                emailAddress:  selectedParticipant.emailAddress || "",
                website:  selectedParticipant.website || "",
              }}
              onSubmit={(newParticipantValues, {resetForm}) => {
                setDirty(true);
                
                const toInsert = selectedParticipant === null 
                  ? participants 
                  : participants.filter((s) => {
                    return (
                      s.phoneNumber !== selectedParticipant.phoneNumber && 
                      s.emailAddress !== selectedParticipant.emailAddress
                    )
                  })
                    
                const existing = toInsert.filter((s) => {
                  return (
                    s.phoneNumber === newParticipantValues.phoneNumber ||
                    s.emailAddress === newParticipantValues.emailAddress 
                  )
                });

                if (existing.length > 0) {
                  toaster.warning(<p>A participant with that email or phone already exists!</p>);
                  return
                }
                
                setFieldValue("participants", [...toInsert, {...newParticipantValues }])

                resetForm();
                setSelectedParticipant({});
              }}>
                {({handleChange, handleBlur, handleSubmit, values: newParticipantValues, errors}) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="First Name" error={errors.firstName}>
                          <Input
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            value={newParticipantValues.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Last Name" error={errors.lastName}>
                          <Input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={newParticipantValues.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Participant Email" error={errors.emailAddress}>
                          <Input
                            name="emailAddress"
                            type="text"
                            placeholder="Participant Email"
                            value={newParticipantValues.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Participant phone number" error={errors.phoneNumber}>
                          <Input
                            name="phoneNumber"
                            type="tel"
                            placeholder="Participant phone number"
                            value={newParticipantValues.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>

                      <Col>
                        <FormControl label="Participant website" error={errors.website}>
                          <Input
                            name="website"
                            type="url"
                            placeholder="Participant website url"
                            value={newParticipantValues.website}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                          Save new participant
                        </Button>
                      </Col>
                    </Row>
                  </>

                )}
            </Formik>
          </StyledAction>
          <StyledBody>
            {participants && participants.length > 0 && 
              <ListHeader>Your participants and featured guests</ListHeader>
            }
            {participants && participants.map((participant) => (
              <ListItem key={participant.phoneNumber}
              endEnhancer={() => (
                <>
                  <Button 
                    kind={KIND.minimal}
                    size="compact"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDirty(true)
                      const newValue = participants.filter((p) => {
                        return p.phoneNumber !== participant.phoneNumber &&
                          p.emailAddress !== participant.emailAddress 
                      })
                      setFieldValue("participants", [...newValue])
                    }}>
                      <Delete size={32}></Delete>
                    </Button>
                  <Button
                    size="compact"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDirty(true);
                      setSelectedParticipant(participant);
                    }}>
                      Edit
                    </Button>
                </>
              )}>
                <ParticipantDisplay>
                  <p>
                    <strong>{participant.firstName} {participant.lastName}</strong>, {participant.emailAddress}, {participant.phoneNumber}
                  </p>
                </ParticipantDisplay>
              </ListItem>
            ))}
          </StyledBody>
          
        </Card>
      </Col>
    </ParticipantListContainer>
  )
}

export default ParticipantList
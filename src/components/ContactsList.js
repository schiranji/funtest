import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { useFormikContext, Formik } from 'formik';
import { ListItem } from 'baseui/list';
import { Delete } from 'baseui/icon';
import { Button, KIND } from 'baseui/button';
import * as Yup from 'yup';
import { toaster } from 'baseui/toast';
import { FormControl } from 'baseui/form-control';
import { Input, MaskedInput } from 'baseui/input';
import { ListHeader } from './ListUi';
import styled from 'styled-components'
import { FileUploader } from 'baseui/file-uploader'
import {EVENT_TYPE, requestBase} from '../utils';


const ContactListContainer = styled(Row)`
  margin-bottom: 35px;
`

const ContactsList = ({setDirty, eventType, eventData}) => {
  const [selectedContact, setSelectedContact] = useState({});
  const { setFieldValue, values } = useFormikContext();
  const { contacts } = values;

  const [uploading, setUploading] = useState(false);
  const [mediaDeleting, setMediaDeleting] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(null)
  const [thumbnailProgress, setThumbnailProgress] = useState(null);
  const [thumbnailProgressMessage, setThumbnailProgressMessage] = useState(null);

  const [uploadReturnUrl, setUploadReturnUrl] = useState(null)

  return (
    <ContactListContainer>
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
        title="Contacts">
          <StyledAction>
            <p>Add contacts for your guests to reach out to if they have any questions. This information will be visible on the event page.</p>

            <Formik
              enableReinitialize
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                emailAddress: Yup.string().email().when(['phoneNumber'], {
                  is: (phoneNumber) => !phoneNumber,
                  then: Yup.string().email().required()
                }),
                phoneNumber: Yup.string().when(['emailAddress'], {
                  is: (email) => !email,
                  then: Yup.string().required()
                }),
              }, [['phoneNumber', 'emailAddress']])}
              initialValues={{
                firstName: selectedContact.firstName || "",
                lastName: selectedContact.lastName || "",
                phoneNumber:  selectedContact.phoneNumber || "",
                emailAddress: selectedContact.emailAddress || "",
                profilePic: selectedContact.profilePic || ""
              }}
              onSubmit={(newContactValues, {resetForm}) => {
                setDirty(true);

                const toInsert = selectedContact === null ? contacts 
                : contacts.filter((s) => {
                  return (
                    s.phoneNumber !== selectedContact.phoneNumber && 
                    s.emailAddress !== selectedContact.emailAddress
                  )
                })
                
                const existing = toInsert.filter((s) => {
                  return (
                    (s.phoneNumber !== null && s.phoneNumber === newContactValues.phoneNumber) ||
                    (s.emailAddress !== null && s.emailAddress === newContactValues.emailAddress)
                  )
                });

                if (existing.length > 0) {
                  toaster.warning(<p>A contact with that email or phone already exists!</p>);
                  return
                }

                if (uploadReturnUrl) {
                  newContactValues.profilePic = uploadReturnUrl;
                }
                
                setFieldValue("contacts", [...toInsert, {...newContactValues }])

                resetForm();
                setSelectedContact({});
              }}>
                {({handleChange, handleBlur, handleSubmit, values: newContactValues, errors, setFieldValue: innerSetFieldValue }) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="First Name" error={errors.firstName}>
                          <Input
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            value={newContactValues.firstName}
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
                            value={newContactValues.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>

                      <Col>
                        <FormControl label="Contact Email" error={errors.emailAddress}>
                          <Input
                            name="emailAddress"
                            type="text"
                            placeholder="Contact Email"
                            value={newContactValues.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Contact phone number" error={errors.phoneNumber}>
                          <MaskedInput
                            name="phoneNumber"
                            type="tel"
                            mask="(999) 999-9999"
                            placeholder="Phone number"
                            value={newContactValues.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}></MaskedInput>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      {newContactValues.profilePic ? (
                        <Col md={3}>
                          <img className="img-fluid" src={newContactValues.profilePic}></img>
                        </Col>
                      ) : (
                        <img></img>
                      )}
                      <Col>
                        <FormControl label="Drop pictures here" error={thumbnailError}>
                          <FileUploader
                            progressAmount={uploading ? thumbnailProgress : null}
                            progressMessage={uploading ? thumbnailProgressMessage : ""}
                            multiple={false}
                            onCancel={() => {
                              setUploading(false)
                            }}
                            onRetry={() => {
                              setUploading(false)
                            }}
                            maxSize={1048576}
                            onDropRejected={() => {
                              setThumbnailError("That file may be too large! Please use images only.");
                              setUploading(false);
                            }}
                            onDropAccepted={async (e) => {
                              setUploading(true);
                              setThumbnailError(null)
                              const formData = new FormData();
                              formData.append("flowChunkNumber", 1)
                              formData.append("flowFilename", e[0].name)
                              formData.append("file", e[0])

                              try {
                                let url = eventType === EVENT_TYPE.regular ? 
                                  `/auth/event/event/edit/uploadPicture/${eventData.id}` :
                                  `/auth/grpEvent/event/edit/uploadPicture/${eventData.id}`
                                  
                                let req = await requestBase.post(url, formData, {
                                  onUploadProgress: (e) => {
                                    let percentage = Math.round(e.loaded * 100 / e.total)
                                    setThumbnailProgress(percentage);
                                    setThumbnailProgressMessage(`${percentage}% done.`)
                                  }
                                })
                                
                                setUploadReturnUrl(req.data.data.filePath)
                                innerSetFieldValue("profilePic", req.data.data.filePath)
                                
                                toaster.positive(<p>Successfully uploaded image!</p>)

                                setUploading(false)
                              } catch (e) {
                                console.log(e)
                                setThumbnailError("Failed to upload")
                                setUploading(false)
                              }
                            }}
                            accept="image/*"></FileUploader>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Button type="button" onClick={(x) => {
                          handleSubmit(x)
                        }} kind={KIND.primary}>
                          Save new contact
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
            </Formik>
          </StyledAction>
          <StyledBody>
            <Row>
              <Col>
                {contacts && contacts.length > 0 && 
                  <ListHeader>Your contacts for this event</ListHeader>
                }
              </Col>
            </Row>

            <Row>
              {contacts && contacts.map((c) => (    
                <Col sm={4} key={c.phoneNumber ? c.phoneNumber : c.emailAddress}>
                  <Card 
                    title={`${c.firstName} ${c.lastName}`}
                    headerImage={c.profilePic || null}>
                    <StyledBody>
                      {c.emailAddress && (
                        <p className="mb-1">
                          Email: {c.emailAddress}
                        </p>
                      )}
                      {c.phoneNumber && (
                        <p>
                          Phone: {c.phoneNumber}
                        </p>
                      )}
                    </StyledBody>
                    
                    <StyledAction className="d-flex flex-column">
                    <Button
                        className="d-block mb-1"
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true);
                          setSelectedContact(c);
                        }}>
                        Edit
                      </Button>
                      <Button 
                        className="d-block"
                        overrides={{
                          BaseButton: {
                            style: ({ $theme }) => ({
                              backgroundColor: $theme.colors.danger,
                              color: "white",
                              ':hover': {
                                backgroundColor: $theme.colors.dangerDark,
                                color: "white",
                              }
                            })
                          }
                        }}
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true)
                          const newValue = contacts.filter((s) => {
                            return s.emailAddress !== c.emailAddress && 
                              s.phoneNumber !== c.phoneNumber
                          })
                          setFieldValue("contacts", [...newValue])
                        }}>
                        Delete
                      </Button>
                    </StyledAction>
                  </Card>
                </Col>
              ))}
            </Row>
          </StyledBody>
        </Card>
      </Col>
    </ContactListContainer>
  )
}

export default ContactsList
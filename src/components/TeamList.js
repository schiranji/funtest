import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Select, TYPE } from "baseui/select";
import { useFormikContext, Formik } from 'formik';
import { ListItem } from 'baseui/list';
import { Delete } from 'baseui/icon';
import { Button, KIND } from 'baseui/button';
import * as Yup from 'yup';
import { toaster } from 'baseui/toast';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { ListHeader } from './ListUi';
import { requestBase } from '../utils';
import styled from 'styled-components';
import InfoPill from './InfoPill';

const GroupTeamPreview = styled.span`
  display: inline-block;
  padding: 2px 10px;
  background-color: #2b2b2b;
  color: #f8f8f8;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
`

const TeamListContainer = styled(Row)`
  margin-bottom: 35px;
`

const TeamList = ({setDirty}) => {
  const [selectedTeamMember, setSelectedTeamMember] = useState({});
  const { setFieldValue, values } = useFormikContext();
  const { eventTeamMembers } = values;
  const [ROLE_OPTIONS, setTeamMemberRoles] = useState([])
  const [TEAM_OPTIONS, setTeamTypes] = useState([])

  useEffect(() => {
    const getDropdownOptions = async () => {
      const req = await requestBase.post(`/getDropDownsOptions`, {
        product: "event",
        type: 'teamMemberRoleType,teamType'
      })
      
      let rolesMapped = req.data.data.teamMemberRoleType.map(r => {
        return {id: r.code, value: r.code}
      })

      let teamTypesMapped = req.data.data.teamType.map(r => {
        return {id: r.code, value: r.code}
      })

      setTeamMemberRoles(rolesMapped)
      setTeamTypes(teamTypesMapped)
    }
    getDropdownOptions();
  }, [])

  return (
    <TeamListContainer>
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
        title="Your team">
          <StyledAction>
            <p>Add and manage team members for your event!</p>

            <Formik
              validateOnBlur
              enableReinitialize
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                userId: Yup.string(),
                emailAddress: Yup.string().email().required(),
                phoneNumber: Yup.string().length(10).required(),
                roles: Yup.array().required(),
                groups: Yup.array().required()
              })}
              initialValues={{
                firstName: selectedTeamMember.firstName || "",
                lastName: selectedTeamMember.lastName || "",
                phoneNumber:  selectedTeamMember.phoneNumber || "",
                emailAddress: selectedTeamMember.emailAddress || "",
                roles: selectedTeamMember.roles || [],
                groups: selectedTeamMember.groups || [],
                userId: selectedTeamMember.userId || "",
              }}
              onSubmit={(newTeamMemberValues, {resetForm, }) => {
                setDirty(true);

                const toInsert = selectedTeamMember === null ? eventTeamMembers 
                : eventTeamMembers.filter((s) => {
                  return (
                    s.phoneNumber !== selectedTeamMember.phoneNumber && 
                    s.emailAddress !== selectedTeamMember.emailAddress
                  )
                })
                
                const existing = toInsert.filter((s) => {
                  return (
                    s.phoneNumber === newTeamMemberValues.phoneNumber ||
                    s.emailAddress === newTeamMemberValues.emailAddress 
                  )
                });

                if (existing.length > 0) {
                  toaster.warning(<p>A team member with that email or phone already exists!</p>);
                  return
                }
                
                setFieldValue("eventTeamMembers", [...toInsert, {...newTeamMemberValues }])

                resetForm();
                setSelectedTeamMember({});
              }}>
                {({handleChange, setFieldValue: innerSetFieldValue, handleBlur, handleSubmit, values: newTeamMemberValues, errors}) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="First Name" error={errors.firstName}>
                          <Input
                            name="firstName"
                            type="text"
                            placeholder="Team member's first name"
                            value={newTeamMemberValues.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Last Name" error={errors.lastName}>
                          <Input
                            name="lastName"
                            type="text"
                            placeholder="Team member's last name"
                            value={newTeamMemberValues.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>

                      <Col>
                        <FormControl label="Email" error={errors.emailAddress}>
                          <Input
                            name="emailAddress"
                            type="text"
                            placeholder="Team member's email"
                            value={newTeamMemberValues.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Phone number" error={errors.phoneNumber}>
                          <Input
                            name="phoneNumber"
                            type="tel"
                            placeholder="Team member's phone number"
                            value={newTeamMemberValues.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Team member roles" error={errors.roles}>
                          <Select
                            options={ROLE_OPTIONS}
                            placeholder="Choose roles"
                            maxDropdownHeight="300px"
                            type={TYPE.search}
                            valueKey="value"
                            labelKey="value"
                            multi
                            onChange={({value}) => {
                              setDirty(true)
                              innerSetFieldValue("roles", value)
                            }}
                            value={newTeamMemberValues.roles}
                          />
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Team assignment" error={errors.groups}>
                          <Select
                            options={TEAM_OPTIONS}
                            placeholder="Choose team"
                            maxDropdownHeight="300px"
                            type={TYPE.search}
                            valueKey="value"
                            labelKey="value"
                            multi
                            onChange={({value}) => {
                              setDirty(true)
                              innerSetFieldValue("groups", value)
                            }}
                            value={newTeamMemberValues.groups}
                          />
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormControl label="User Id">
                          <Input
                            disabled
                            name="userId"
                            type="text"
                            placeholder=""
                            value={newTeamMemberValues.userId || "None"}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                          Save new team member
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
            </Formik>
          </StyledAction>
          <StyledBody>
            {eventTeamMembers && eventTeamMembers.length > 0 && 
              <ListHeader>Your team members for this event</ListHeader>
            }
            {eventTeamMembers && eventTeamMembers.map((c) => (
              <ListItem
                key={c.phoneNumber}
                endEnhancer={() => (
                  <>
                    <Button 
                      kind={KIND.minimal}
                      size="compact"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirty(true)
                        const newValue = eventTeamMembers.filter((s) => {
                          return s.emailAddress !== c.emailAddress && 
                            s.phoneNumber !== c.phoneNumber
                        })
                        setFieldValue("eventTeamMembers", [...newValue])
                      }}>
                      <Delete size={32}></Delete>
                    </Button>
                    <Button
                      size="compact"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirty(true);
                        setSelectedTeamMember(c);
                      }}>
                      Edit
                    </Button>
                  </>
                )}
                overrides={{
                  Content: {
                    style: ({ $theme }) => {
                      return {
                        height: "auto",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      };
                    }
                  }
                }}>
                <div>
                  <p>
                    <strong>{c.firstName} {c.lastName}</strong>, {c.emailAddress}, {c.phoneNumber}
                  </p>
                  <div className="mb-2">
                    <span className="mr-1">
                      Roles: 
                    </span>
                    {c.roles ? c.roles.map((r) => (
                      <InfoPill inline key={r.id}>{r.value}</InfoPill>
                    )) : <span>This team member hasn't been assigned any roles.</span>}
                  </div>
                  <div>
                    Teams: 
                    {c.groups ? c.groups.map((g) => (
                      <InfoPill inline key={g.id}>{g.value}</InfoPill>
                    )) : <span> This team member isn't assigned to any teams.</span>}
                  </div>
                </div>
              </ListItem>
            ))}
          </StyledBody>
        </Card>
      </Col>
    </TeamListContainer>
  )
}

export default TeamList
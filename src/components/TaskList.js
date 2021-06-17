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
import { Textarea } from 'baseui/textarea';
import { Slider } from 'baseui/slider'
import styled from 'styled-components'

const TaskListContainer = styled(Row)`
  margin-bottom: 35px;
` 

const TaskList = ({setDirty}) => {
  const { setFieldValue, values: { eventTasks, eventTeamMembers} } = useFormikContext();

  const [selectedTask, setSelectedTask] = useState({})
  const [teamTypes, setTeamTypes] = useState([])
  const [sliderValue, setSliderValue] = useState([0])

  const eventTeamMembersMapped = eventTeamMembers.map(t => {
    return {id: t.emailAddress, value: t.emailAddress}
  })
  
  useEffect(() => {
    const getTeamTypes = async () => {
      const req = await requestBase.post("/getDropDownsOptions", {
        product: "event",
        type: "teamType"
      })

      let teamsMapped = req.data.data.teamType.map(r => ({id: r.code, value: r.code}))

      setTeamTypes(teamsMapped)
    }

    getTeamTypes();
  }, [])

  return (
    <TaskListContainer>
      <Col>
        <Card overrides={{
          Root: {
            style: () => {
              return {
                padding: "15px"
              }
            }
          }
        }}
        title="Event Tasks">
          <StyledAction>
            <p>Add tasks and assign them to your team. Keep track of how much progress has been made and equipment required for each task!</p>

            <Formik
              validateOnBlur
              enableReinitialize
              validationSchema={Yup.object().shape({
                actualAmount: Yup.number(),
                description: Yup.string(),
                equipment: Yup.string(),
                expectedAmount: Yup.number(),
                memberGroup: Yup.array(),
                name: Yup.string().required(),
                ownerUserId: Yup.array(),
                pctCompleted: Yup.number(),
                taskMembers: Yup.array()
              })}
              initialValues={{
                name: selectedTask.name || "",
                description: selectedTask.description || "",
                equipment: selectedTask.equipment || "",
                expectedAmount: selectedTask.expectedAmount || "",
                memberGroup: selectedTask.memberGroup || [],
                taskMembers: selectedTask.taskMembers || [],
                ownerUserId: selectedTask.ownerUserId || [],
                pctCompleted: selectedTask.pctCompleted || 0,
              }}
              onSubmit={(newTaskValues, {resetForm}) => {
                setDirty(true);

                const toInsert = selectedTask === null ? eventTasks 
                : eventTasks.filter((s) => {
                  return (
                    s.name !== selectedTask.name 
                  )
                })

                const existing = toInsert.filter((s) => {
                  return (
                    s.name === newTaskValues.name
                  )
                });

                if (existing.length > 0) {
                  toaster.warning(<p>A task with that name already exists!</p>);
                  return
                }
                
                setFieldValue("eventTasks", [...toInsert, {...newTaskValues }])

                resetForm();
                setSelectedTask({});
              }}>
                {({handleChange, setFieldValue: innerSetFieldValue, handleBlur, handleSubmit, values: newTaskValues, errors}) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="Task Name" error={errors.name}>
                          <Input
                            name="name"
                            type="text"
                            placeholder="Task name"
                            value={newTaskValues.name}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormControl label="Task description" error={errors.description}>
                          <Textarea
                            name="description"
                            type="text"
                            placeholder="Task description"
                            value={newTaskValues.description}
                            onChange={handleChange}
                            onBlur={handleBlur}></Textarea>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Assign this task to a team" error={errors.memberGroup}>
                          <Select
                            options={teamTypes}
                            placeholder="Choose team"
                            maxDropdownHeight="300px"
                            type={TYPE.select}
                            valueKey="value"
                            labelKey="value"
                            onChange={({value}) => {
                              setDirty(true)
                              innerSetFieldValue("memberGroup", value)
                            }}
                            value={newTaskValues.memberGroup}
                          />
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Task owner" error={errors.ownerUserId}>
                          <Select
                            options={eventTeamMembers}
                            placeholder="Choose an owner for this task"
                            maxDropdownHeight="300px"
                            type={TYPE.select}
                            valueKey="emailAddress"
                            labelKey="emailAddress"
                            onChange={({value}) => {
                              setDirty(true)
                              console.log(value)
                              innerSetFieldValue("ownerUserId", value)
                            }}
                            value={newTaskValues.ownerUserId}
                          />
                        </FormControl>
                      </Col>

                      <Col>
                        <FormControl label="Assign other team members" error={errors.taskMembers}>
                          <Select
                            options={eventTeamMembers}
                            placeholder="Choose other team members"
                            maxDropdownHeight="300px"
                            type={TYPE.select}
                            valueKey="emailAddress"
                            labelKey="emailAddress"
                            multi
                            onChange={({value}) => {
                              setDirty(true)
                              innerSetFieldValue("taskMembers", value)
                            }}
                            value={newTaskValues.taskMembers}
                          />
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Expected amount" error={errors.expectedAmount}>
                          <Input
                            name="expectedAmount"
                            type="number"
                            placeholder="Expected amount"
                            value={newTaskValues.expectedAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Actual amount" error={errors.actualAmount}>
                          <Input
                            name="actualAmount"
                            type="number"
                            placeholder="Actual amount"
                            value={newTaskValues.actualAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Necessary equipment" error={errors.equipment}>
                          <Input
                            name="equipment"
                            type="text"
                            placeholder="Equipment necessary"
                            value={newTaskValues.equipment}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Percent of task completed">
                          <Slider
                            value={sliderValue}
                            onChange={({value}) => value && setSliderValue(value)}
                            onFinalChange={({value}) => {
                              console.log(value)
                              innerSetFieldValue("pctCompleted", value[0])
                            }}></Slider>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                          Save task
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
            </Formik>
          </StyledAction>
          <StyledBody>
            {eventTasks && eventTasks.length > 0 && 
              <ListHeader>Your tasks for this event</ListHeader>
            }
            {eventTasks && eventTasks.map((c) => (
              <ListItem
                key={c.name}
                endEnhancer={() => (
                  <>
                    <Button 
                      kind={KIND.minimal}
                      size="compact"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirty(true)
                        const newValue = eventTasks.filter((s) => {
                          return s.name !== c.name
                        })
                        setFieldValue("eventTasks", [...newValue])
                      }}>
                      <Delete size={32}></Delete>
                    </Button>
                    <Button
                      size="compact"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirty(true);
                        setSelectedTask(c);
                        setSliderValue([c.pctCompleted])
                      }}>
                      Edit
                    </Button>
                  </>
                )}>
                <p>{c.name}</p>
              </ListItem>
            ))} 
          </StyledBody>
        </Card>
      </Col>
    </TaskListContainer>
  )
} 

export default TaskList;
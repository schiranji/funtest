import React, { useState, useEffect } from 'react';
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
import { Select, TYPE } from 'baseui/select';
import { requestBase } from '../utils' 
import { ListHeader } from './ListUi'

const TicketCategoriesContainer = styled.div`
  margin-bottom: 35px;
`

const TicketCategories = ({setDirty}) => {
  const { setFieldValue, values } = useFormikContext();
  const { ticketCategories } = values;
  const [attendeeTypes, setAttendeeTypes] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    const getDropdownOptions = async () => {
      const req = await requestBase.post(`/getDropDownsOptions`, {
        product: "event",
        type: 'attendeeType'
      })
      
      setAttendeeTypes(req.data.data.attendeeType)
    }
    getDropdownOptions();
  }, [])


  return (
    <TicketCategoriesContainer>
      <Row>
        <Col>
          <Card overrides={{
              Root: {
                style: ({ $theme }) => {
                  return {
                    padding: "15px"
                  };
                }
              }
            }}
            title="Ticket Categories">
              <StyledAction>
                <p>Create ticket categories, set prices, and sell entirely through FunZippy!</p>
                <Formik
                  enableReinitialize
                  validationSchema={
                    Yup.object().shape({
                      name: Yup.string().required(),
                      actualPrice: Yup.number().positive().required()
                    })}
                  initialValues={{
                    name: selectedCategory.name || "",
                    attendeeType: selectedCategory.attendeeType || [],
                    actualPrice: selectedCategory.actualPrice || 0.0,
                    salePrice: selectedCategory.salePrice || 0.0,
                    totalCount: selectedCategory.totalCount || 0,
                    groupDiscount: selectedCategory.groupDiscount || 0.0,
                    groupDiscountPercentage: selectedCategory.groupDiscountPercentage || 0.0,
                    groupDiscountPricePerTicket: selectedCategory.groupDiscountPricePerTicket || 0.0,
                  }}
                  onSubmit={(newCategoryValues, {resetForm}) => {
                    setDirty(true);

                    const toInsert = selectedCategory === null ? ticketCategories : ticketCategories.filter((s) => s.name !== selectedCategory.name)
                    
                    const existing = toInsert.filter((s) => s.name === newCategoryValues.name);
                    if (existing.length > 0) {
                      toaster.warning(<p>A ticket category with that name already exists!</p>);
                      return
                    }
                    
                    const newValue = [...toInsert, {...newCategoryValues, attendeeType: newCategoryValues.attendeeType ? newCategoryValues.attendeeType : null}]

                    setFieldValue("ticketCategories", newValue)

                    resetForm();
                    setSelectedCategory({});
                  }}>
                    {({handleChange, handleBlur, handleSubmit, values: newCategoryValues, errors, setFieldValue: setNewCategoryFieldValue}) => (
                      <>
                        <Row>
                          <Col>
                            <FormControl label="Ticket name" error={errors.name}>
                              <Input
                                name="name"
                                type="text"
                                placeholder="Category name"
                                value={newCategoryValues.name}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl label="Ticket regular price" error={errors.actualPrice}>
                              <Input
                                name="actualPrice"
                                type="number"
                                placeholder="Ticket Price"
                                value={newCategoryValues.actualPrice}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl label="Available tickets" error={errors.totalCount}>
                              <Input
                                name="totalCount"
                                type="number"
                                placeholder="Ticket count"
                                value={newCategoryValues.totalCount}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormControl label="Select attendee type">
                              <Select
                                options={attendeeTypes}
                                type={TYPE.search}
                                placeholder="Attendee type"
                                valueKey="value"
                                labelKey="value"
                                value={newCategoryValues.attendeeType}
                                onChange={({value}) => {
                                  if (value.length > 0) {
                                    setNewCategoryFieldValue("attendeeType", value)
                                  } else {
                                    setNewCategoryFieldValue("attendeeType", [])
                                  }
                                }}></Select>
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl label="Sale price" error={errors.salePrice}>
                              <Input
                                name="salePrice"
                                type="number"
                                placeholder="Ticket Price"
                                value={newCategoryValues.salePrice}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl label="Price with group discount" error={errors.groupDiscountPricePerTicket}>
                              <Input
                                name="groupDiscountPricePerTicket"
                                type="number"
                                placeholder="Group discount price"
                                value={newCategoryValues.groupDiscountPricePerTicket}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                              Save{newCategoryValues.name && ` "${newCategoryValues.name}"`}
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                </Formik>
              </StyledAction>
              <StyledBody>
                {ticketCategories && ticketCategories.length > 0 && 
                  <ListHeader>Your ticket categories</ListHeader>
                }
                {ticketCategories && ticketCategories.map((category) => (
                  <ListItem key={category.name}
                  endEnhancer={() => (
                    <>
                      <Button 
                        kind={KIND.minimal}
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true)
                          const newValue = ticketCategories.filter((s) => {
                            return s.name !== category.name
                          })
                          setFieldValue("ticketCategories", [...newValue])
                        }}>
                          <Delete size={32}></Delete>
                        </Button>
                      <Button
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true);
                          setSelectedCategory(category);
                        }}>
                          Edit
                        </Button>
                    </>
                  )}>
                    <span>
                      <strong>{category.name}</strong> {category.attendeeType.length > 0 && (<> | {category.attendeeType[0].value}</>)}
                      <br></br> 
                      Full Price: ${category.actualPrice} | Sale Price: ${category.salePrice} | {category.totalCount} tickets available
                    </span>
                  </ListItem>
                ))}
              </StyledBody>
            </Card>
        </Col>
      </Row>
    </TicketCategoriesContainer>
  )
}

export default TicketCategories;
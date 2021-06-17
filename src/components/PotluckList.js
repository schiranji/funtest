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
import { ListHeader } from './ListUi'
import { Textarea } from 'baseui/textarea';
import { Select, TYPE } from 'baseui/select';
import { HiddenRow, requestBase } from '../utils';

const PotluckListContainer = styled.div`
  margin-bottom: 35px;
`

const PotluckList = ({ setDirty }) => {
  const { setFieldValue, values } = useFormikContext();
  const { potluckItems } = values;
  const [potluckCategories, setPotluckCategories] = useState([])
  const [selectedItem, setselectedItem] = useState({});

  useEffect(() => {
    const getDropdownOptions = async () => {
      const req = await requestBase.post(`/getDropDownsOptions`, {
        product: "event",
        type: 'potluckItemCategory'
      })

      let categoriesMapped = req.data.data.potluckItemCategory.map(r => {
        return { id: r.code, value: r.code }
      })

      setPotluckCategories(categoriesMapped)
    }
    getDropdownOptions();
  }, [])

  return (
    <PotluckListContainer>
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
            title="Portluck menu">
            <StyledAction>
              <p>Create your potluck menu!</p>
              <Formik
                enableReinitialize
                validationSchema={
                  Yup.object().shape({
                    itemName: Yup.string().required(),
                    description: Yup.string().required(),
                    ingredients: Yup.string().required(),
                    count: Yup.number().required(),
                    amount: Yup.number().required(),
                    category: Yup.array().required(),
                  })}
                initialValues={{
                  itemName: selectedItem.itemName || "",
                  description: selectedItem.description || "",
                  ingredients: selectedItem.ingredients || "",
                  count: selectedItem.count || undefined,
                  amount: selectedItem.amount || undefined,
                  category: selectedItem.category || [],
                }}
                onSubmit={(newPotluckItem, { resetForm }) => {
                  setDirty(true);

                  const toInsert = selectedItem === null ? potluckItems
                    : potluckItems.filter((s) => {
                      return (
                        s.itemName !== selectedItem.itemName
                      )
                    })

                  const existing = toInsert.filter((s) => {
                    return (
                      s.itemName === selectedItem.itemName
                    )
                  });

                  if (existing.length > 0) {
                    toaster.warning(<p>A potluck item with that name already exists!</p>);
                    return
                  }

                  const newValue = [...toInsert, { ...newPotluckItem }]

                  setFieldValue("potluckItems", newValue)

                  resetForm();
                  setselectedItem({});
                }}>
                {({ handleChange, handleBlur, handleSubmit, values: newPotluckItem, errors, setFieldValue: innerSetFieldValue }) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="Name" error={errors.itemName}>
                          <Input
                            name="itemName"
                            type="text"
                            placeholder="Name"
                            value={newPotluckItem.itemName}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Item Description" error={errors.description}>
                          <Input
                            name="description"
                            type="text"
                            placeholder="Description"
                            value={newPotluckItem.description}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Item type" error={errors.category}>
                          <Select
                            options={potluckCategories}
                            placeholder="Choose type"
                            valueKey="value"
                            labelKey="value"
                            type={TYPE.select}
                            value={newPotluckItem.category}
                            onChange={({value}) => {
                              setDirty(true)
                              innerSetFieldValue("category", value)
                            }}
                            onBlur={handleBlur}></Select>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Item ingredients" error={errors.ingredients}>
                          <Input
                            name="ingredients"
                            type="text"
                            placeholder="Item ingredients"
                            value={newPotluckItem.ingredients}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Tray count" error={errors.count}>
                          <Input
                            name="count"
                            type="number"
                            placeholder="1"
                            value={newPotluckItem.count}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl label="Amount" error={errors.amount}>
                          <Input
                            name="amount"
                            type="number"
                            placeholder="1"
                            value={newPotluckItem.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <HiddenRow>
                      <Input name="id" type="text" value={newPotluckItem.id || false} disabled></Input>
                      <Input name="count" type="number" value={newPotluckItem.count || 1} disabled></Input>
                      <Input name="claimedCount" type="number" value={newPotluckItem.claimedCount || 0} disabled></Input>
                      <Input name="companyId" type="number" value={newPotluckItem.companyId || null} disabled></Input>
                    </HiddenRow>

                    <Row>
                      <Col>
                        <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                          Save{newPotluckItem.itemName && ` "${newPotluckItem.itemName}"`}
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Formik>
            </StyledAction>
            <StyledBody>
              {potluckItems && potluckItems.length > 0 &&
                <ListHeader>Your potluck items</ListHeader>
              }
              {potluckItems && potluckItems.map((item) => (
                <ListItem key={item.itemName}
                  endEnhancer={() => (
                    <>
                      <Button
                        kind={KIND.minimal}
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true)
                          const newValue = potluckItems.filter((s) => {
                            return s.itemName !== item.itemName
                          })
                          setFieldValue("potluckItems", [...newValue])
                        }}>
                        <Delete size={32}></Delete>
                      </Button>
                      <Button
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true);
                          setselectedItem(item);
                        }}>
                        Edit
                        </Button>
                    </>
                  )}>
                  <span>
                    <strong>{item.itemName}</strong>
                    <br></br>
                    <span>Tray count: {item.count}, Amount: {item.amount}</span>
                  </span>
                </ListItem>
              ))}
            </StyledBody>
          </Card>
        </Col>
      </Row>
    </PotluckListContainer>
  )
}

export default PotluckList;
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
import { HiddenRow } from '../utils';

const RegistryListContainer = styled.div`
  margin-bottom: 35px;
`

const RegistryList = ({setDirty}) => {
  const { setFieldValue, values } = useFormikContext();
  const { giftItems } = values;
  const [selectedGift, setSelectedGift] = useState({});

  return (
    <RegistryListContainer>
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
            title="Gift Registry">
              <StyledAction>
                <p>Create a gift registry!</p>
                <Formik
                  enableReinitialize
                  validationSchema={
                    Yup.object().shape({
                      itemName: Yup.string().required(),
                      description: Yup.string().required(),
                      url: Yup.string().url().required(),
                    })}
                  initialValues={{
                    itemName: selectedGift.itemName || "",
                    description: selectedGift.description || "",
                    url: selectedGift.url || "",
                  }}
                  onSubmit={(newGiftValues, {resetForm}) => {
                    setDirty(true);

                    const toInsert = selectedGift === null ? giftItems 
                    : giftItems.filter((s) => {
                      return (
                        s.itemName !== selectedGift.itemName
                      )
                    })
                    
                    const existing = toInsert.filter((s) => {
                      return (
                        s.itemName === selectedGift.itemName
                      )
                    });
    
                    if (existing.length > 0) {
                      toaster.warning(<p>A gift with that name already exists!</p>);
                      return
                    }

                    const newValue = [...toInsert, {...newGiftValues}]

                    setFieldValue("giftItems", newValue)

                    resetForm();
                    setSelectedGift({});
                  }}>
                    {({handleChange, handleBlur, handleSubmit, values: newGiftValues, errors, setFieldValue: setNewinviteeFieldValue}) => (
                      <>
                        <Row>
                          <Col>
                            <FormControl label="Name" error={errors.itemName}>
                              <Input
                                name="itemName"
                                type="text"
                                placeholder="Name"
                                value={newGiftValues.itemName}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl label="Link to buy" error={errors.url}>
                              <Input
                                name="url"
                                type="url"
                                placeholder="Link to buy"
                                value={newGiftValues.url}
                                onChange={handleChange}
                                onBlur={handleBlur}></Input>
                            </FormControl>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <FormControl label="Gift Description" error={errors.description}>
                              <Textarea
                                name="description"
                                placeholder="Gift Description"
                                value={newGiftValues.description}
                                onChange={handleChange}
                                onBlur={handleBlur}></Textarea>
                            </FormControl>
                          </Col>
                        </Row>

                        <HiddenRow>
                          <Input name="id" type="text" value={newGiftValues.id || false} disabled></Input>
                          <Input name="count" type="number" value={newGiftValues.count || 1} disabled></Input>
                          <Input name="claimedCount" type="number" value={newGiftValues.claimedCount || 0} disabled></Input>
                          <Input name="companyId" type="number" value={newGiftValues.companyId || null} disabled></Input>
                        </HiddenRow>

                        <Row>
                          <Col>
                            <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                              Save{newGiftValues.itemName && ` "${newGiftValues.itemName}"`}
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                </Formik>
              </StyledAction>
              <StyledBody>
                {giftItems && giftItems.length > 0 && 
                  <ListHeader>Your registry</ListHeader>
                }
                {giftItems && giftItems.map((gift) => (
                  <ListItem key={gift.itemName}
                  endEnhancer={() => (
                    <>
                      <Button 
                        kind={KIND.minimal}
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true)
                          const newValue = giftItems.filter((s) => {
                            return s.itemName !== gift.itemName
                          })
                          setFieldValue("giftItems", [...newValue])
                        }}>
                          <Delete size={32}></Delete>
                        </Button>
                      <Button
                        size="compact"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDirty(true);
                          setSelectedGift(gift);
                        }}>
                          Edit
                        </Button>
                    </>
                  )}>
                    <span>
                      <strong>{gift.itemName}</strong>
                      <br></br> 
                      <a href={gift.url}>{gift.url.substring(0, 75)}{gift.url.length > 75 ? "..." : ""}</a>
                    </span>
                  </ListItem>
                ))}
              </StyledBody>
            </Card>
        </Col>
      </Row>
    </RegistryListContainer>
  )
}

export default RegistryList;
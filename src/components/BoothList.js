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
import { Textarea } from 'baseui/textarea';
import { ListHeader } from './ListUi'

const CategoryDisplay = styled.div`
  margin-bottom: 35px;
`

const BoothListContainer = styled(Row)`
  margin-bottom: 35px;
`

const BoothList = ({setDirty}) => {
  const [selectedBooth, setSelectedBooth] = useState({});
  const { setFieldValue, values } = useFormikContext();
  const { boothCategories } = values;
  
  return (
    <BoothListContainer>
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
        title="Booth Categories">
          <StyledAction>
            <p>Add booth types that people can purchase.</p>
            <Formik
              enableReinitialize
              validationSchema={Yup.object().shape({
                name: Yup.string().required(),
                description: Yup.string().required(),
                actualPrice: Yup.number().required(),
                salePrice: Yup.number().notRequired(),
                totalCount: Yup.number().required(),
              })}
              initialValues={{
                name: selectedBooth.name || "",
                description: selectedBooth.description || "",
                actualPrice: selectedBooth.actualPrice || 0.00,
                salePrice:  selectedBooth.salePrice || 0.00,
                totalCount:  selectedBooth.totalCount || 0,
              }}
              onSubmit={(newBoothCategoryValues, {resetForm}) => {
                setDirty(true);
                
                const toInsert = selectedBooth === null 
                  ? boothCategories 
                  : boothCategories.filter((s) => {
                    return (
                      s.name !== selectedBooth.name
                    )
                  })
                    
                const existing = toInsert.filter((s) => {
                  return (
                    s.name === newBoothCategoryValues.name 
                  )
                });

                if (existing.length > 0) {
                  toaster.warning(<p>A booth category with that name already exists!</p>);
                  return
                }
                
                setFieldValue("boothCategories", [...toInsert, {...newBoothCategoryValues }])

                resetForm();
                setSelectedBooth({});
              }}>
                {({handleChange, handleBlur, handleSubmit, values: newBoothCategoryValues, errors}) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="Category name" error={errors.name}>
                          <Input
                            name="name"
                            type="text"
                            placeholder="Category name"
                            value={newBoothCategoryValues.name}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Full purchase price" error={errors.actualPrice}>
                          <Input
                            name="actualPrice"
                            type="number"
                            placeholder="Full Price"
                            value={newBoothCategoryValues.actualPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Sale price" error={errors.salePrice}>
                          <Input
                            name="salePrice"
                            type="number"
                            placeholder="Sale price"
                            value={newBoothCategoryValues.salePrice}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Total available count" error={errors.totalCount}>
                          <Input
                            name="totalCount"
                            type="number"
                            placeholder="Total available count"
                            value={newBoothCategoryValues.totalCount}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormControl label="Category description" error={errors.description}>
                          <Textarea
                            name="description"
                            placeholder="Booth category description"
                            value={newBoothCategoryValues.description}
                            onChange={handleChange}
                            onBlur={handleBlur}></Textarea>
                        </FormControl>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col>
                        <Button type="button" onClick={handleSubmit} kind={KIND.primary}>
                          Save new category
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
            </Formik>
          </StyledAction>
          <StyledBody>
            {boothCategories && boothCategories.length > 0 && 
              <ListHeader>Your booth categories</ListHeader>
            }
            {boothCategories && boothCategories.map((boothCategory) => (
              <ListItem key={boothCategory.name}
              endEnhancer={() => (
                <>
                  <Button 
                    kind={KIND.minimal}
                    size="compact"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDirty(true)
                      const newValue = boothCategories.filter((s) => {
                        return s.name !== boothCategory.name 
                      })
                      setFieldValue("boothCategories", [...newValue])
                    }}>
                      <Delete size={32}></Delete>
                    </Button>
                  <Button
                    size="compact"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDirty(true);
                      setSelectedBooth(boothCategory);
                    }}>
                      Edit
                    </Button>
                </>
              )}>
                <CategoryDisplay>
                  <p>
                    <strong>{boothCategory.name}</strong> {boothCategory.description}, Sale Price: {boothCategory.salePrice}, Number available: {boothCategory.totalCount}
                  </p>
                </CategoryDisplay>
              </ListItem>
            ))}
          </StyledBody>
        </Card>
      </Col>
    </BoothListContainer>
  )
}

export default BoothList
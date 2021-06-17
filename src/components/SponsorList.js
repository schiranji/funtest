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

const CategoryDisplay = styled.div``

const SponsorList = ({setDirty}) => {
  const [selectedSponsor, setSelectedSponsor] = useState({});
  const { setFieldValue, values } = useFormikContext();
  const { sponsorCategories } = values;
  
  return (
    <Row>
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
        title="Sponsorship Categories">
          <StyledAction>
            <p>Add sponsorship categories in which people can purchase sponsorships for this event.</p>
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
                name: selectedSponsor.name || "",
                description: selectedSponsor.description || "",
                actualPrice: selectedSponsor.actualPrice || 0.00,
                salePrice:  selectedSponsor.salePrice || 0.00,
                totalCount:  selectedSponsor.totalCount || 0,
              }}
              onSubmit={(newSponsorCategoryValues, {resetForm}) => {
                setDirty(true);
                
                const toInsert = selectedSponsor === null 
                  ? sponsorCategories 
                  : sponsorCategories.filter((s) => {
                    return (
                      s.name !== selectedSponsor.name
                    )
                  })
                    
                const existing = toInsert.filter((s) => {
                  return (
                    s.name === newSponsorCategoryValues.name 
                  )
                });

                if (existing.length > 0) {
                  toaster.warning(<p>A category with that name already exists!</p>);
                  return
                }
                
                setFieldValue("sponsorCategories", [...toInsert, {...newSponsorCategoryValues }])

                resetForm();
                setSelectedSponsor({});
              }}>
                {({handleChange, handleBlur, handleSubmit, values: newSponsorCategoryValues, errors}) => (
                  <>
                    <Row>
                      <Col>
                        <FormControl label="Category name" error={errors.name}>
                          <Input
                            name="name"
                            type="text"
                            placeholder="Category name"
                            value={newSponsorCategoryValues.name}
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
                            value={newSponsorCategoryValues.actualPrice}
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
                            value={newSponsorCategoryValues.salePrice}
                            onChange={handleChange}
                            onBlur={handleBlur}></Input>
                        </FormControl>
                      </Col>
                      
                      <Col>
                        <FormControl label="Max sponsors for this category" error={errors.totalCount}>
                          <Input
                            name="totalCount"
                            type="number"
                            placeholder="Max sponsors for this category"
                            value={newSponsorCategoryValues.totalCount}
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
                            placeholder="Category Description"
                            value={newSponsorCategoryValues.description}
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
            {sponsorCategories && sponsorCategories.length > 0 && 
              <ListHeader>Your sponsorship categories</ListHeader>
            }
            {sponsorCategories && sponsorCategories.map((sponsorCategory) => (
              <ListItem key={sponsorCategory.name}
              endEnhancer={() => (
                <>
                  <Button 
                    kind={KIND.minimal}
                    size="compact"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDirty(true)
                      const newValue = sponsorCategories.filter((s) => {
                        return s.name !== sponsorCategory.name 
                      })
                      setFieldValue("sponsorCategories", [...newValue])
                    }}>
                      <Delete size={32}></Delete>
                    </Button>
                  <Button
                    size="compact"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDirty(true);
                      setSelectedSponsor(sponsorCategory);
                    }}>
                      Edit
                    </Button>
                </>
              )}>
                <CategoryDisplay>
                  <p>
                    <strong>{sponsorCategory.name}</strong> {sponsorCategory.description}, Sale Price: {sponsorCategory.salePrice}, Number available: {sponsorCategory.totalCount}
                  </p>
                </CategoryDisplay>
              </ListItem>
            ))}
          </StyledBody>
          
        </Card>
      </Col>
    </Row>
  )
}

export default SponsorList
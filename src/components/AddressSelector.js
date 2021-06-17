import React, { useState } from 'react'
import { Input } from 'baseui/input'
import { Select } from 'baseui/select'
import { Col, FormGroup, Row } from 'reactstrap'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'

const AddressSelector = ({
  streetAddress, setStreetAddress,
  zipCode, setZipCode,
  address2, setAddress2,
  city, setCity,
  country, setCountry,
  state, setState,
  lat, setLat,
  lng, setLng,
  locationName, setLocationName,
  selectedPlace, setSelectedPlace,
  inline,
  error
}) => {
  const {
    ready,
    value,
    suggestions: { status, data, loading },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleSelect = async (o) => {
    if (o[0] === undefined) return;
    
    const { description, place_id } = o[0]
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);

    // Get latitude and longitude via utility functions
    try {
      let details = await getDetails({
        placeId: place_id,
        fields: ['address_component', "geometry", "name", 'formatted_address']
      })   

      setLocationName(details.name)
      setStreetAddress(details.formatted_address.substring(0, details.formatted_address.indexOf(",")))
      setSelectedAddress(details.formatted_address)

      setZipCode("")
      setCity("")
      setAddress2("")
      setCountry("")
      setState("")

      for (const c of details.address_components) {
        for (const t of c.types) {
          if (t === "locality") {
            setCity(c.short_name !== undefined ? c.short_name : c.long_name)
          }
          if (t === "administrative_area_level_1") {
            setState(c.short_name !== undefined ? c.short_name : c.long_name)
          }
          if (t === "postal_code") {
            setZipCode(c.short_name !== undefined ? c.short_name : c.long_name)
          }
          if (t === "neighborhood") {
            setAddress2(c.short_name !== undefined ? c.short_name : c.long_name)
          }
          if (t === "country") {
            setCountry(c.short_name !== undefined ? c.short_name : c.long_name)
          }
        }
      }

      setLat(details.geometry.location.lat())
      setLng(details.geometry.location.lng())

    } catch (e) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <>
      <Row>
        <Col sm={inline ? 5 : 12}>
          <FormGroup>
            <label htmlFor="streetAddress">Street address</label>
            <Select 
              clearable={false}
              error={error}
              noResultsMsg="Start typing..."
              placeholder="Street address"
              disabled={!ready}
              isLoading={loading}
              options={data}
              getValueLabel={(e) => {
                return e.option.structured_formatting.main_text
              }}
              getOptionLabel={(e) => {
                return e.option.description 
              }}
              onChange={(e) => {
                setSelectedPlace(e.value)
                handleSelect(e.value)
              }}
              onInputChange={event => {
                const target = event.target
                setValue(target.value)
              }}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              value={selectedPlace}
              valueKey="description"
              labelKey="description">
            </Select>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label htmlFor="city">City</label>
            <Input
              placeholder="City"
              type="text"
              name="city"
              onChange={e => setCity(e.target.value)}
              value={city}></Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label htmlFor="zip">Zip Code</label>
            <Input
              placeholder="Zip Code"
              type="text"
              name="zipCode"
              onChange={e => setZipCode(e.target.value)}
              value={zipCode}></Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label htmlFor="state">State</label>
            <Input
              placeholder="State"
              type="text"
              name="state"
              onChange={e => setState(e.target.value)}
              value={state}></Input>
          </FormGroup>
        </Col>
      </Row>

      {selectedAddress && (
        <Row>
          <Col>
              <p className="mb-0">Selected address: {selectedAddress}</p>
          </Col>
        </Row>
      )}
    </>
  )
}

export default AddressSelector;
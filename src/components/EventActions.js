import React, { useState } from 'react'
import { Button, KIND } from 'baseui/button'
import { ButtonGroup } from "baseui/button-group";
import { useFormikContext } from 'formik';
import { EVENT_TYPE, getEventDetailUrl, getGroupEventDetailUrl} from '../utils';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components'
import ActionButton from '../components/ActionButton';
import { toaster } from 'baseui/toast';

const EventActionContainer = styled.div`
  border: 2px solid #eaeaea;
  margin-bottom: 35px;
  ul {
    justify-content: flex-end;
  }
`

const EventActions = ({eventData, eventType, isDirty, setDirty}) => {
  const { submitForm, errors } = useFormikContext()
  const [eventStatus, setEventStatus] = useState(eventData.status)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChangingState, setIsChangingState] = useState(false)

  return (
    <EventActionContainer>
      <Nav className="justify-content-between">
        <div className="d-flex">
          <NavItem className="d-flex">
            <div className="d-flex align-items-center">
              <ActionButton 
                className="mx-2"
                isLoading={isSubmitting}
                size="compact"
                onClick={async () => {
                  setIsSubmitting(true)
                  
                  if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
                    toaster.negative("You have errors!")
                    setIsSubmitting(false)
                    return
                  }

                  try {
                    await submitForm();
                  } catch (e) {
                    console.error(e)
                    toaster.negative("Unable to save")
                    setIsSubmitting(false);
                    return
                  }

                  setIsSubmitting(false)
                  setDirty(false)
                }}>Save Changes</ActionButton>
              {isDirty && (
                <p className="my-0">Unsaved changes!</p>
              )}
            </div>
          </NavItem>
        </div>
        <div className="d-flex">
          <NavItem>
            <NavLink 
              target="_blank" 
              href={eventType === EVENT_TYPE.group ? getGroupEventDetailUrl(eventData) : getEventDetailUrl(eventData)}>
              <Button size="compact" kind={KIND.minimal}>
                Preview event page
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <Button 
                size="compact" 
                isLoading={isSubmitting}
                kind={KIND.secondary} 
                onClick={async () => {
                  setIsSubmitting(true)
                  const oldStatus = eventData.status;

                  if (oldStatus === "A") {
                    eventData.status = "Draft"
                    setEventStatus("Draft")
                  } else {
                    eventData.status = "A"
                    setEventStatus("A")
                  }

                  if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
                    toaster.negative("You have errors!")
                    setIsSubmitting(false)
                    return
                  }

                  try {
                    await submitForm()
                  } catch (e) {
                    toaster.negative("Unable to save")
                    setEventStatus(oldStatus)
                  }

                  setIsSubmitting(false)
                }}>
                {eventStatus === "A" ? "Change to draft" : "Publish event"}
              </Button>
            </NavLink>
          </NavItem>
        </div>
      </Nav>
    </EventActionContainer>
  )
}

export default EventActions;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionBody from '../components/SectionBody'
import SectionHeader from '../components/SectionHeader'
import { Row, Col } from 'reactstrap';
import SubSection from '../components/Subsection';
import { Button } from 'baseui/button';
import { requestBase } from '../utils';

const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Dashboard = ({eventData}) => {
  const { id: eventId } = eventData
  const [refreshButtonLoading, setRefreshButtonLoading] = useState(false)
  const [dailyViews, setDailyViews] = useState([])
  const [ticketSales, setTicketSales] = useState(null)

  const getDailyViews = async () => {
    let req = await requestBase.post(`/auth/event/eventManagement/view/dailyViews/${eventId}`, {}, {});
    setDailyViews(req.data.results)
  }

  const getTicketSales = async () => {
    let req2 = await requestBase.post(`/auth/event/eventManagement/view/ticketSaleSummary/${eventId}`, {}, {});
    setTicketSales(req2.data.data)
  }

  useEffect(() => {
    getDailyViews()
  }, [])

  useEffect(() => {
    getTicketSales()
  }, [])

  return (
    <>
      <SectionHeader>
        <DashboardHeader>
          <h1>Event Dashboard</h1>
          <Button
            isLoading={refreshButtonLoading}
            onClick={async () => {
              setRefreshButtonLoading(true)
              await getDailyViews()
              await getTicketSales()
              setRefreshButtonLoading(false)
            }}>
            Refresh stats
          </Button>
        </DashboardHeader>
      </SectionHeader>
      <SectionBody>
        <SubSection>
          <p>All the latest stats for your event</p>
        </SubSection>
      </SectionBody>
    </>
  )
}

export default Dashboard;

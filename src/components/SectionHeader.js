import React from 'react';
import styled from 'styled-components';
import DashedDecoration from './DashedDecoration';

const Header = styled.div`
  margin-bottom: 35px;

  ${DashedDecoration} {
    margin-top: 35px;
  }
`

const SectionHeader = ({children}) => {
  return (
    <Header>
      {children}
      <DashedDecoration dark></DashedDecoration>
    </Header>
  )
}

export default SectionHeader;

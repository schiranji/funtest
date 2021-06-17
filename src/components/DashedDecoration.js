import styled from 'styled-components';

const DashedDecoration = styled.span`
  display: block;
  border-style: dotted;
  border-color: ${props => props.dark ? "#2B213C" : "#F4E164"};
  height: 10px;
`

export default DashedDecoration;
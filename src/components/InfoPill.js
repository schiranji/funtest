import React from 'react'
import styled from 'styled-components'

const InfoPill = styled.div`
    background: #eaeaea;
    font-size: 14px;
    border-radius: 50px;
    padding: 5px 10px;
    margin-right: 10px;
    color: #5d5d5d;
    display: ${props => props.inline ? "inline" : "block"}
`

export default InfoPill;
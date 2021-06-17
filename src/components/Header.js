import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'reactstrap';
import {requestBase} from '../utils';
import { Button, KIND } from 'baseui/button';
import { useHistory, NavLink } from 'react-router-dom';

const HeaderContainer = styled(Container)`
  padding: 25px 50px;
  box-shadow: 0 5px 35px rgba(150, 150, 150, 0.24);

  .header-title-container {
    display: flex;
    align-items: center;

    .header-title {
      flex: 1;
    }

    .header-nav {
      > a, > button {
        margin-left: 15px;
      }
      > a {
        color: #4F4457;
        text-decoration: none;
        padding: 15px;
        font-family: "quicksand", sans-serif;
        font-weight: 500;
        transition: all .2s ease;
        &:hover {
          background: rgb(246, 246, 246);
        }
      }
    }
  }
`

const Header = () => {
  const history = useHistory();

  const activeLinkStyle = {
    fontWeight: "bold",
  }

  return (
    <HeaderContainer fluid className="dashboardHeaderContainer">
      <Row>
        <Col className="header-title-container">
          <div className="header-title">
            <h3>FunZippy Event Manager</h3>
          </div>
          <nav className="header-nav">
            <NavLink to="/" exact activeStyle={activeLinkStyle}>
              Your Events
            </NavLink>
            <NavLink to="/newEvent" exact activeStyle={activeLinkStyle}>
              Create new event
            </NavLink>
            <a href="https://funzippy.com/">
              Home
            </a>
          
            <Button kind={KIND.minimal} onClick={() => {
              requestBase.post(`/user/logout`, {}, {});
              history.push("/login")
            }}>Logout</Button>
          </nav>
        </Col>
      </Row>
    </HeaderContainer>
  )
}

export default Header;
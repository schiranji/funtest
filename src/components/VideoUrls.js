import React, { useState } from 'react';
import { ListItem } from "baseui/list";
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { Button, KIND } from 'baseui/button';
import { Delete, Check } from 'baseui/icon';
import { Row, Col } from 'reactstrap';
import { Input } from 'baseui/input';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { toaster } from 'baseui/toast';
import { ListHeader } from './ListUi'

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`
const VideoUrlsContainer = styled.div`
  margin-bottom: 35px;
`

const VideoUrls = ({setDirty}) => {
  const [newUrl, setNewUrl] = useState("");
  const { setFieldValue, values } = useFormikContext();
  const { videosUrls } = values;

  return (
    <VideoUrlsContainer>
      <Row>
        <Col>
          <Card 
            overrides={{
              Root: {
                style: ({ $theme }) => {
                  return {
                    padding: "15px"
                  };
                }
              }
            }}
            title="Video embed">
            <StyledAction>
              <p>Any embeddable videos? Add their links here!</p>
              <ActionContainer>
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Enter URL"></Input>
                <Button 
                  kind={KIND.minimal}
                  size="compact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (newUrl === "") return;
                    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                    if (!expression.test(newUrl)) {
                      toaster.negative(<p>Make sure it's a valid URL!</p>)
                      return;
                    }
                    setDirty(true)
                    const newValue = new Set(videosUrls).add(newUrl);
                    setFieldValue("videosUrls", [...newValue])
                    setNewUrl("")
                  }}>
                  <Check size={32}></Check>
                </Button>
              </ActionContainer>
            </StyledAction>
            <StyledBody>
              {videosUrls && videosUrls.length > 0 && 
                <ListHeader>Your videos</ListHeader>
              }
              {videosUrls && [...videosUrls].map((url) => (
                <ListItem
                  key={url}
                  endEnhancer={() => (
                    <Button 
                      kind={KIND.minimal}
                      size="compact"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirty(true)
                        const newValue = new Set([...videosUrls].filter((s) => s !== url))
                        setFieldValue("videosUrls", [...newValue])
                      }}>
                      <Delete size={32}></Delete>
                    </Button>
                  )}>
                  <a href={url}>{url}</a>
                </ListItem>
              ))}
              
            </StyledBody>
          </Card>
        </Col>
      </Row>
    </VideoUrlsContainer>
  )
}

export default VideoUrls;
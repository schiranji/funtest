import React, { useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import SectionBody from '../components/SectionBody'
import { FileUploader } from 'baseui/file-uploader'
import { EVENT_TYPE, handleWithAnyFunction, requestBase } from '../utils'
import { Row, Col } from 'reactstrap'
import FormControl from '../components/FormControl'
import { toaster } from 'baseui/toast'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { Card, StyledAction, StyledBody } from 'baseui/card'
import { Button } from 'baseui/button'
import SubSection from '../components/Subsection'
import { useFormikContext } from 'formik'
import VideoUrls from '../components/VideoUrls'

const MediaPreviewImage = styled.img`
  max-width: 100%;
  height: auto;
`

const Media = ({formikProps, whenAny, eventData, eventType}) => {
  const {
    handleSubmit, 
    handleBlur, 
    handleChange,
    values,
    errors
  } = formikProps;

  const handleWithAny = handleWithAnyFunction(handleChange, whenAny)
  const submitWithAny = handleWithAnyFunction(handleSubmit, whenAny, false);

  const [thumbnailError, setThumbnailError] = useState(null)
  const [thumbnailProgress, setThumbnailProgress] = useState(null);
  const [thumbnailProgressMessage, setThumbnailProgressMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mediaDeleting, setMediaDeleting] = useState(false);
  const [mediaData, setMediaData] = useState(null)
  const { eventId } = useParams();
  
  useEffect(() => {
    const getEventMedia = async () => {
      let url = eventType === EVENT_TYPE.regular ? 
        `/auth/event/event/view/getEvent/${eventId}` :
        `/auth/grpEvent/event/view/getEvent/${eventId}`

      const getReq = await requestBase.get(url);
      setMediaData(getReq.data)
    }
    getEventMedia()
  }, [eventId, uploading, mediaDeleting])

  return (
    <>
      <SectionHeader>
        <h1>Event Media</h1>
      </SectionHeader>
      <SectionBody>
        <SubSection>
          <VideoUrls setDirty={whenAny}></VideoUrls>
        </SubSection>
        
        <SubSection>
          <Row>
            <Col>
              <form onSubmit={submitWithAny}>
                <FormControl label="Drop pictures here" error={thumbnailError}>
                  <FileUploader
                    progressAmount={uploading ? thumbnailProgress : null}
                    progressMessage={uploading ? thumbnailProgressMessage : ""}
                    multiple={false}
                    onCancel={() => {
                      setUploading(false)
                    }}
                    onRetry={() => {
                      setUploading(false)
                    }}
                    maxSize={1048576}
                    onDropRejected={() => {
                      setThumbnailError("That file may be too large! Please use images only.");
                      setUploading(false);
                    }}
                    onDropAccepted={async (e) => {
                      setUploading(true);
                      setThumbnailError(null)
                      const formData = new FormData();
                      formData.append("flowChunkNumber", 1)
                      formData.append("flowFilename", e[0].name)
                      formData.append("file", e[0])

                      try {
                        let url = eventType === EVENT_TYPE.regular ? 
                          `/auth/event/event/edit/uploadEventDetailPicture/${eventData.id}` :
                          `/auth/grpEvent/event/edit/uploadEventDetailPicture/${eventData.id}`
                          
                        let req = await requestBase.post(url, formData, {
                          onUploadProgress: (e) => {
                            let percentage = Math.round(e.loaded * 100 / e.total)
                            setThumbnailProgress(percentage);
                            setThumbnailProgressMessage(`${percentage}% done.`)
                          }
                        })
                        
                        toaster.positive(<p>Successfully uploaded image!</p>)
                        setUploading(false)
                      } catch (e) {
                        console.log(e)
                        setThumbnailError("Failed to upload")
                        setUploading(false)
                      }
                    }}
                    accept="image/*"></FileUploader>
                </FormControl>
              </form>
            </Col>
          </Row>
        </SubSection>
        
        <SubSection>
          <Row>
            {mediaData && mediaData.media && mediaData.media.map((m) => (
              <Col className="mb-4" key={m} sm={4}>
                <Card>
                  <StyledBody>
                    <img className="img-fluid" src={`${m}/`}></img>
                  </StyledBody>
                  <StyledAction>
                    <Button 
                      overrides={{BaseButton: {style: {width: '100%'}}}}
                      onClick={async () => {
                        try {
                          const filename = m.split("/").pop()
                          
                          setMediaDeleting(true)

                          let url = eventType === EVENT_TYPE.regular ? 
                            `/auth/event/event/delete/eventDetailPicture/${eventId}/${filename}/` : 
                            `/auth/grpEvent/event/delete/eventDetailPicture/${eventId}/${filename}/`

                          await requestBase.post(url, {
                            companyId: 0,
                            uid: eventData.uid
                          })
                          setMediaDeleting(false)
                        } catch (e) {
                          toaster.warning("Unable to delete")
                          setMediaDeleting(false)
                        }
                      }}>Delete</Button>
                  </StyledAction>
                </Card>
              </Col>
            ))}
          </Row>
        </SubSection>
      </SectionBody>
    </>
  )
}

export default Media;
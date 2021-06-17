import React from 'react'
import { Button } from "baseui/button";

const ActionButton = ({className, children, ...props}) => {
  return (
    <Button
      overrides={{
        BaseButton: {
          style: ({$theme}) => {
            return {
              color: `${$theme.colors.darkAccent}`,
              backgroundColor: $theme.colors.accent,
              borderTopStyle: `solid`,
              borderRightStyle: `solid`,
              borderBottomStyle: `solid`,
              borderLeftStyle: `solid`,
              borderTopWidth: `2px`,
              borderRightWidth: `2px`,
              borderBottomWidth: `2px`,
              borderLeftWidth: `2px`,
              borderColor:  $theme.colors.darkAccent,
              paddingTop: "10px",
              paddingRight: "15px",
              paddingBottom: "10px",
              paddingLeft: "15px",
              fontFamily: "quicksand",
              ':hover': {
                backgroundColor: "white",
              },
              ':focus': {
                backgroundColor: $theme.colors.accent
              }
            }
          },
        }
      }}
      className={className} 
      type={props.type || "button"}
      {...props}>
        {children}
    </Button>
  )
}

export default ActionButton;

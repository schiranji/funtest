import React from 'react';
import { FormControl as FC } from 'baseui/form-control';

const FormControl = ({children, ...props}) => {
  return (
    <FC 
      overrides={{
        Label: {
          style: ({ $theme }) => {
            return {
              fontSize: "18px",
              marginBottom: "10px",
            };
          }
        },
        Caption: {
          style: () => {
            return {
              fontSize: "16px"
            }
          }
        }
      }}
      {...props}
      >
      {children}
    </FC>
  )
}

export default FormControl;
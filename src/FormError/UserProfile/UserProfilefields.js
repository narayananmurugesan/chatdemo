import React, { Component } from 'react'

export const userprofileFields = {
    fieldsVerfication
}

function fieldsVerfication(fieldName, value, userprofileErrors, userprofileValid) {
    let fieldValidationErrors = userprofileErrors;
    let stateFields = userprofileValid;
    switch(fieldName) {
        case 'firstName':
          stateFields.firstName = value.length >= 1;
          fieldValidationErrors.firstName = stateFields.firstName ? '' : ' Please Enter The FirstName';
          break;
        case 'lastName':
            stateFields.lastName = value.length >= 1;
            fieldValidationErrors.lastName = stateFields.lastName ? '' : ' Please Enter The LastName';
            break;
        case 'email':
            stateFields.email = value.length >= 1;
            fieldValidationErrors.email = stateFields.email ? '' : ' Please Enter The Email';
            break;
        case 'password':
            stateFields.password = value.length >= 1;
            fieldValidationErrors.password = stateFields.password ? '' : ' Please Enter The Password';
            break;
       
        default:
          break;
      }
      return {
        fieldValidationErrors: fieldValidationErrors,
        stateFields: stateFields
      };
}
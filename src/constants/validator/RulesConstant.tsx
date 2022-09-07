'use strict';

import moment from 'moment';

// Custom default rules to validate form fields
const RULES_CONSTANT= {
    timer: /\S+/,
    required: /\S+/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).*$/,
    email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    number: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    hasNumber: /\d/,
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
    hasSpecialCharacter: /(\W)/,
    date(format = 'YYYY-MM-DD', value) {
      const d = moment(value, format);
      if (d == null || !d.isValid()) return false;
      return true;
    },
    minlength(length, value) {
      if (length === void 0) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length >= length) {
        return true;
      }
      return false;
    },
    maxlength(length, value) {
      if (length === void 0) {
        throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
      } else if (value.length > length) {
        return false;
      }
      return true;
    },
    equalPassword(dataToCompare, value) {
      return dataToCompare === value;
    },
    alphabetical:/^(([a-zA-Z\u00C0-\u017F])*)$|^(([a-zA-Z\u00C0-\u017F])*(\s){1}.([a-zA-Z\u00C0-\u017F])*)$/,
    idTextGeneric:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export default RULES_CONSTANT;
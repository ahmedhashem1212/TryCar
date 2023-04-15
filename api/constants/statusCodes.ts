// General Codes -Common status codes between all systems
const generalCodes = {
  success: 0,
  unknown: 1,
};
const InvoiceCodes = {
  valError: {
    message: 'Validation error',
    statuscode: 202,
  },
  invoiceUpdate: {
    code: 109,
    message: 'Invoice Updated',
  },
  invoiceDeleted: {
    code: 110,
    message: 'Invoice Deleted', 
  },
  invoiceNotFound: {
    code: 404,
    message: 'Invoice NotFound',
  },
  
};
const ItemCodes = {
  valError: {
    message: 'Validation error',
    statuscode: 202,
  },
  invoiceUpdate: {
    code: 109,
    message: 'Item Updated',
  },
  invoiceDeleted: {
    code: 110,
    message: 'Item Deleted', 
  },
  invoiceNotFound: {
    code: 404,
    message: 'Item NotFound',
  },
  
};

const UserCodes = {
  valError: {
    message: 'Validation error',
    statuscode: 202,
  },
  emailUsed: {
    code: 101,
    message: 'Sorry this email has been used before',
  },
  userUpdate: {
    code: 109,
    message: 'User Updated',
  },
  userDeleted: {
    code: 110,
    message: 'User Deleted',
  },
};

module.exports = {
  generalCodes,
  UserCodes,
  InvoiceCodes,
  ItemCodes,
};

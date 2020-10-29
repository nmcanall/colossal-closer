import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
      }
    }
  }
`
export const ADD_EMPLOYEE = gql`
  mutation addEmployee($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      addEmployee(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
          token
          employee {
              _id
          }
      }
  }
`
export const ADD_TRANSACTION = gql`
mutation addTransaction($customerId: ID!, $product: String!, $dollars: Float!, $units: Int) {
  addTransaction(customerId: $customerId, product: $product, dollars: $dollars, units: $units) {
    transactions {
      _id
      product
      dollars
      units
    }
  }
}
`
export const ADD_CUSTOMER = gql`
  mutation addCustomer($businessName: String!, $contactName: String!, $phone: String!, $email: String!, $status: String!) {
      addCustomer(businessName: $businessName, contactName: $contactName, phone: $phone, email: $email, status: $status) {
          _id
          businessName
          contactName
          phone
          email
          status
      }
  }
`

// export const UPDATE_CUSTOMER = gql`
//   mutation updateCustomer(_id: ID!, $businessName: String!, $contactName: String!, $phone: String!, $email: String!, $status: String!) {
//       updateCustomer(_id: $_id, bussinessName: $businessName, constactName: $contactName, phone: $phone, email: $email, status: $status) {
//         _id
//         bussinessName
//         contactName
//         phone
//         email
//         status
//       }
//   }
// `
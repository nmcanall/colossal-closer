import gql from 'graphql-tag'

export const QUERY_EMPLOYEES = gql`
    {
        employees {
            firstName
            lastName
            customerCount
            activeCustomerCount
            wonCustomerCount
            lostCustomerCount
            dollarsSold
            customers {
                _id
            }
        }
    }
`
export const QUERY_EMPLOYEE = gql`
    query getEmployee($_id: ID!) {
        employee(_id: $_id) {
            firstName
            lastName
            customerCount
            activeCustomerCount
            wonCustomerCount
            lostCustomerCount
            dollarsSold
            customers {
                _id
                
                businessName
                createdAt
                status
                dollarsSold
                transactionsWon
                transactions{
                    _id
                    product
                    dollars
                    units
                    createdAt

                }
            }
        }
    }
`
export const QUERY_CUSTOMERS = gql`
    query getCustomers($_id: ID) {
        customers(_id: $_id ) {
            _id
            businessName
            contactName
            phone
            email
            salesman {
                _id
            }
            createdAt
            status
            dollarsSold
            transactionsWon
            contacts {
                type
                note
            }
            transactions{
                product
            }
        }
    }
`
export const QUERY_CUSTOMER = gql`
    query getCustomer($_id: ID) {
        customers(_id: $_id ) {
            businessName
            contactName
            phone
            email
            salesman {
                _id
            }
            createdAt
            status
            dollarsSold
            transactionsWon
            contacts {
                type
                note
            }
        }
    }
`

import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_CUSTOMER,} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {Box, Collapse} from '@chakra-ui/core'
import {useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';
// import { useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';
const ChangeStatus = (props) =>{
    
    const {status , customerId} = props
    // const _id = props.customerId
    const currentStatus = props.status
    // const [state, dispatch] = useStoreContext()
    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});
    }, [])
    const [statusState, setStatusState] = useState(currentStatus)
    const [updateCustomer, {error}] = useMutation(UPDATE_CUSTOMER);
   
const changeStatus =async (event) =>{
    event.preventDefault()
    try{
        const {data}= await updateCustomer({
            variables: {statusState, _id: customerId}
        })
    
    } catch(e){
        console.log(e)
    }
}
    return(
        <div className=" card-panel light-gray lighten-3 col s6 ">
            <h6><strong>Customer Status</strong></h6>
            <form>  
                <div className="input-field col">
                    <select
                        id="status" 
                        name="status"
                        value= {statusState}
                        onChange={event =>{
                            setStatusState(event.target.value)
                        }}
                    >
                        <option name="status" value="active">active</option>
                        <option name="status" value="won">won</option>
                        <option name="status" value="lost">lost</option>
                    </select>
                    <label htmlFor="status">Current Status: {status}</label>
                </div>
            </form>
        </div>
    )
}
export default ChangeStatus;
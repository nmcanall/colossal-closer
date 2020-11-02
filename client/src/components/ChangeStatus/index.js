import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_CUSTOMER,} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {Box, Collapse} from '@chakra-ui/core'
import {useStoreContext, UPDATE_STATE_CUSTOMER } from '../../utils/GlobalState';
// import { useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';

const ChangeStatus = (props) => {
    // const token = Auth.getToken()
    // console.log('tokentoken', token)
    console.log('propskis', props);
    const {status , customerId} = props;
    const [statusState, setStatusState] = useState(status);

    
    const [state, dispatch] = useStoreContext()

    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});
        console.log(status)
    }, []);
    

    

    const [updateCustomer, {error}] = useMutation(UPDATE_CUSTOMER);

    const handleChange = (event) =>{
        const newStatus = event.target.value
        setStatusState(newStatus)
        console.log('newform', statusState)
        changeStatus(newStatus)
    }

const changeStatus = async (status) =>{
    try{
        const {data}= await updateCustomer({
            variables: {status, _id: customerId}
        })
        console.log(data.updateCustomer)
        dispatch({
            type: UPDATE_STATE_CUSTOMER,
            customer: data.updateCustomer
        })
        console.log(state.customers)
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
                        onChange={handleChange}
                    >
                        <option value="active">active</option>
                        <option value="won">won</option>
                        <option value="lost">lost</option>
                        
                    </select>
                    <label htmlFor="status">Current Status: {statusState}</label>
                    
                </div>
            </form>
        </div>
    )
}
export default ChangeStatus;
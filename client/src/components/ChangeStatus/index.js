import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_CUSTOMER,} from '../../utils/mutations';
import Auth from '../../utils/auth';
import {Box, Collapse} from '@chakra-ui/core'
import {useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';
// import { useStoreContext, ADD_STATE_CUSTOMERS } from '../../utils/GlobalState';

const ChangeStatus = (props) =>{
    // const token = Auth.getToken()
    // console.log('tokentoken', token)
    console.log('propskis', props)
    const {status , customerId} = props

    // const _id = props.customerId
    const currentStatus = props.status
    console.log('_id work?',customerId)

    console.log('status??', currentStatus)
    // const [state, dispatch] = useStoreContext()

    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});
    }, [])

    const [formState, setFormState] = useState (currentStatus)

    console.log('currentformstate', formState)

    const [updateCustomer, {error}] = useMutation(UPDATE_CUSTOMER);

    // const handleChange =(event) =>{
    //     const {name, value} = event.target
    //     console.log('oldForm',formState)
    //     setFormState({
    //         ...formState,
    //         [name]: value
    //     })
    //     console.log('newform',formState)
        
    // }
const changeStatus =async (event) =>{
    event.preventDefault()
    try{
        const {data}= await updateCustomer({
            variables: {formState, _id: customerId}
        })
        console.log('formstate', formState)
        // dispatch({
        //     type: ADD_STATE_CUSTOMERS,
        //     customers: [{...data.updateCustomer}]
        // })
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
                        value= {formState.status}
                        onChange={event =>{
                            setFormState(event.target.value)
                        },changeStatus}
                    >
                        <option value="" disabled selected>Switch Status</option>
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
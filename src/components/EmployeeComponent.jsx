import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';
import '../ComponentStyles.css';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            const employee = {firstName, lastName, email, departmentId}
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if(departmentId){
            errorsCopy.department = ''
        }else {
            errorsCopy.department = 'Select Department'
            valid = false
        }

        setErrors(errorsCopy);

        return valid;

    }

    function pageTitle(){
        if(id){
            return <h2 className='form-title'>✏️ Update Employee</h2>
        }else{
            return <h2 className='form-title'>➕ Add Employee</h2>
        }
    }

    return (
        <div className='modern-container'>
            <div className='modern-form-card'>
                <div className='form-header'>
                    {
                        pageTitle()
                    }
                </div>
                <form className='modern-form'>
                    <div className='form-group-modern'>
                        <label htmlFor='firstName' className='modern-label'>First Name:</label>
                        <input
                            type='text'
                            placeholder='Enter first name'
                            name='firstName'
                            id='firstName'
                            value={firstName}
                            className={`modern-input ${errors.firstName ? 'input-error' : ''}`}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        { errors.firstName && <div className='error-message'>⚠️ { errors.firstName}</div> }
                    </div>

                    <div className='form-group-modern'>
                        <label htmlFor='lastName' className='modern-label'>Last Name:</label>
                        <input
                            type='text'
                            placeholder='Enter last name'
                            name='lastName'
                            id='lastName'
                            value={lastName}
                            className={`modern-input ${errors.lastName ? 'input-error' : ''}`}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        { errors.lastName && <div className='error-message'>⚠️ { errors.lastName}</div> }
                    </div>

                    <div className='form-group-modern'>
                        <label htmlFor='email' className='modern-label'>Email:</label>
                        <input
                            type='email'
                            placeholder='Enter email address'
                            name='email'
                            id='email'
                            value={email}
                            className={`modern-input ${errors.email ? 'input-error' : ''}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        { errors.email && <div className='error-message'>⚠️ { errors.email}</div> }
                    </div>

                    <div className='form-group-modern'>
                        <label htmlFor='department' className='modern-label'>Select Department:</label>
                        <select
                            id='department'
                            name='department'
                            className={`modern-select ${errors.department ? 'input-error' : ''}`}
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value=''>Select Department</option>
                            {
                                departments.map( department =>
                                    <option key={department.id} value={department.id}>{department.departmentName}</option>
                                )
                            }
                        </select>
                        { errors.department && <div className='error-message'>⚠️ { errors.department}</div> }
                    </div>

                    <button className='btn-submit-modern' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeComponent

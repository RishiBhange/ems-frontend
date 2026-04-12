import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import '../services/ComponentStyles.css';

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')

    const {id} = useParams();

    const navigator = useNavigate();

    useEffect(() => {

        getDepartmentById(id).then((response) => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);
        }).catch(error => {
            console.error(error);
        })

    }, [id])

    function saveOrUpdateDepartment(e){
        e.preventDefault();

        const department = { departmentName, departmentDescription }

        console.log(department);

        if(id){
            updateDepartment(id, department).then((response) => {
                console.log(response.data);
                navigator('/departments');
            }).catch(error => {
                console.error(error);
            })
        }else {
            createDepartment(department).then((response) => {
                console.log(response.data);
                navigator('/departments')
            }).catch(error => {
                console.error(error);
            })
        }

    }

    function pageTitle(){
        if(id){
            return <h2 className='form-title'>✏️ Update Department</h2>
        } else {
            return <h2 className='form-title'>➕ Add Department</h2>
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
                        <label htmlFor='departmentName' className='modern-label'>
                            Department Name:
                        </label>
                        <input
                            type='text'
                            placeholder='Enter department name'
                            name='departmentName'
                            id='departmentName'
                            value={departmentName}
                            className='modern-input'
                            onChange={(e) => setDepartmentName(e.target.value)}
                        />
                    </div>

                    <div className='form-group-modern'>
                        <label htmlFor='departmentDescription' className='modern-label'>
                            Department Description:
                        </label>
                        <textarea
                            name='departmentDescription'
                            id='departmentDescription'
                            placeholder='Enter department description'
                            value={departmentDescription}
                            className='modern-textarea'
                            onChange={(e) => setDepartmentDescription(e.target.value)}
                            rows='4'
                        />
                    </div>

                    <button className='btn-submit-modern' onClick={(e) => saveOrUpdateDepartment(e)}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DepartmentComponent

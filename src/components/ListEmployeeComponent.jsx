import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import './ComponentStyles.css'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    
    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='modern-container'>
            <div className='modern-card'>
                <div className='card-header-gradient'>
                    <h2 className='modern-title'>👥 Employee Directory</h2>
                    <button className='btn-add-modern' onClick={addNewEmployee}>
                        <span className='btn-icon'>+</span>
                        Add Employee
                    </button>
                </div>
                
                <div className='table-container'>
                    <table className='modern-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(employee =>
                                    <tr key={employee.id} className='table-row-hover'>
                                        <td>{employee.id}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td className='email-cell'>{employee.email}</td>
                                        <td>
                                            <div className='action-buttons'>
                                                <button 
                                                    onClick={() => updateEmployee(employee.id)} 
                                                    className='btn-update'>
                                                    ✏️ Update
                                                </button>
                                                <button 
                                                    onClick={() => removeEmployee(employee.id)} 
                                                    className='btn-delete'>
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListEmployeeComponent

import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';
import './ComponentStyles.css'

const ListDepartmentComponent = () => {

    const [departments, setDepartments] = useState([]);

    const navigator = useNavigate();

    useEffect( () => {
        listOfDepartments();
    }, [])

    function listOfDepartments(){
        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateDepartment(id){
        navigator(`/edit-department/${id}`)
    }

    function removeDepartment(id){
        deleteDepartment(id).then((response) => {
            console.log(response.data);
            listOfDepartments();
        }).catch(error => {
            console.error(error);
        })
    }
    
    return (
        <div className='modern-container'>
            <div className='modern-card'>
                <div className='card-header-gradient'>
                    <h2 className='modern-title'>🏢 Department Directory</h2>
                    <Link to='/add-department' className='btn-add-modern'>
                        <span className='btn-icon'>+</span>
                        Add Department
                    </Link>
                </div>
                
                <div className='table-container'>
                    <table className='modern-table'>
                        <thead>
                            <tr>
                                <th>Department ID</th>
                                <th>Department Name</th>
                                <th>Department Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                departments.map( department =>
                                    <tr key={department.id} className='table-row-hover'>
                                        <td>{department.id}</td>
                                        <td className='font-semibold'>{department.departmentName}</td>
                                        <td>{department.departmentDescription}</td>
                                        <td>
                                            <div className='action-buttons'>
                                                <button 
                                                    onClick={() => updateDepartment(department.id)} 
                                                    className='btn-update'>
                                                    ✏️ Update
                                                </button>
                                                <button 
                                                    onClick={() => removeDepartment(department.id)} 
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

export default ListDepartmentComponent

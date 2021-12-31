import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../redux/actions/ui';

const AddNewFab = () => {

  const dispatch = useDispatch();

  const handleAddEvent = () => {
    dispatch(uiOpenModal())
  }

  return (
      <button 
        style={{
          cursor: 'pointer'
        }}
        onClick={handleAddEvent} 
        className="btn btn-primary fab"
      >
        <i className="fas fa-plus"></i>
      </button>
    
  )
}

export default AddNewFab

import React from 'react'
import "../css/spinner.css"
import { connect } from 'react-redux' 

const LoadingSpinner = ({loading}) => {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
            <div className="loading-txt">Loading {loading}</div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loading:state.loading,
        
    }
  }
  


export default connect(mapStateToProps, )(LoadingSpinner)


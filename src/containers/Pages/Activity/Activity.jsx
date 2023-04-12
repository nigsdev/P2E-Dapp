import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import BorderedTable from './BorderedTable';
import { TransactionProps } from '../../../shared/prop-types/ReducerProps'
import './Activity.css'


const Activity = ({ transaction }) => {
    return (
        <div>
            <BorderedTable transaction={transaction.data} />
        </div>
    );
} 

Activity.propTypes = {
    transaction: TransactionProps.isRequired,
  }
  
export default withRouter(
    connect((state) => ({
        transaction: state.transaction,
    }))(Activity));
import React from 'react';
import {
  Card, CardBody, Col, Badge, Table,
} from 'reactstrap';
import BasicTableData from './BasicTableData';
import { Helpers } from '../../utils/helpers';

const { tableHeaderData } = BasicTableData();

const BorderedTable = ({transaction}) => {

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            {/* <h5 className="bold-text">{t('tables.basic_tables.bordered_table')}</h5> */}
            <h5 className="subhead">A Total Of 7 Transactions
              <span className="red-text"> Found</span>
            </h5>
          </div>
          <Table className="table--bordered" responsive>
            <thead>
              <tr>
                {tableHeaderData.map(item => (
                  <th tcCenter key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transaction.map(item => (
                <tr key={item.tokenId}>
                  <td>{item.tokenId}</td>
                  <td><a target='_blank' rel="noreferrer" href={Helpers.formatEtherscanLink(42, item.transactionHash, 'transaction')}>{item.transactionHash}</a></td>
                  <td>{item.eventName}</td>
                  <td>{item.transactionDate}</td>
                  <td>{item.tokenId}</td>
                  <td>Garnet</td>
                  <td><Badge color='success'>In</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderedTable;

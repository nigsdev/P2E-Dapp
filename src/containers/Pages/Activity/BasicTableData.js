const BasicTableData = () => {
  const header = [
    { id: 1, title: '#' },
    { id: 2, title: 'Txn Hash' },
    { id: 3, title: 'Method' },
    { id: 4, title: 'Transaction Date' },
    { id: 5, title: 'Token Id' },
    { id: 6, title: 'Token Name' },
    { id: 7, title: 'In/Out' },
  ];

  const headerResponsive = [
    { id: 1, title: '#' },
    { id: 2, title: 'Txn Hash' },
    { id: 3, title: 'Method' },
    { id: 4, title: 'Transaction Date' },
    { id: 5, title: 'Token Id' },
    { id: 7, title: 'Token Name' },
    { id: 8, title: 'In/Out' },
    
  ];

  const rows = [{
    id: 1,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'Out',
    status: 'danger',
  
  }, {
    id: 2,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'In',
    status: 'success',
  }, {
    id: 3,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'Out',
    status: 'danger',
  }, {
    id: 4,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'In',
    status: 'success',
  }, {
    id: 5,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'In',
    status: 'success',
  }, {
    id: 6,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'Out',
    status: 'danger',
  }, {
    id: 7,
    txnhash: '6146ccf6a66d994f7c363db875e31ca35581450a4bf6d3be6cc9ac79233a69d0',
    method: 'Create Proton',
    txndate: '04/04/2021',
    tokenid: 'eyJraWQiOiIxZTlnZGs3IiwiYWxnI',
    tokenname: 'Garnet',
    badge: 'Out',
    status: 'danger',
  }];

  const basicTableData = { tableHeaderData: header, tableHeaderResponsiveData: headerResponsive, tableRowsData: rows };
  return basicTableData;
};

export default BasicTableData;

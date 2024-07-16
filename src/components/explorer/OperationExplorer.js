import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { HOST_URL, VERSION } from "../../config/constants"

const URL = `${HOST_URL}/dev/${VERSION}`



export default function OperationExplorer() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState(null);

  const [hasNextPage, setHasNextPage] = useState(true);


  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  async function handleDeleteClick(id) {
    
    setRows(rows.filter((row) => row.id !== id));

  }
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'operation_id', headerName: 'Operation', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'operation_response', headerName: 'Operation Res', width: 150 },
    { field: 'user_balance', headerName: 'Balance', width: 150 },
    { field: 'username', headerName: 'User', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        function f () {
          handleDeleteClick(id)
        }
  
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={f}
            color="inherit"
          />,
        ];
      },
    },
  ];
  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/records`, {
          params: {
            limit: paginationModel.pageSize,
            lastKey: lastKey ? JSON.stringify(lastKey) : null
          }
        });
        debugger;
        setRows(response.data.Items);
        setLastKey(response.data.LastEvaluatedKey || null);
        if(response.data.LastEvaluatedKey) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);



    // Memoize to avoid flickering when the `hasNextPage` is `undefined` during refetch
    const paginationMetaRef = React.useRef({});
    // Memoize to avoid flickering when the `hasNextPage` is `undefined` during refetch
    const paginationMeta = React.useMemo(() => {
      debugger;
      if (
        hasNextPage !== undefined &&
        paginationMetaRef.current?.hasNextPage !== hasNextPage
      ) {
        paginationMetaRef.current = { hasNextPage };
      }
      return paginationMetaRef.current;
    }, [hasNextPage]);
    


  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={paginationModel.pageSize}
        rowCount={-1}
        paginationMode="server"
        pageSizeOptions={[5, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={(params) => {
          debugger;
          setPaginationModel(params);
          if(params.page == 0) {
            setLastKey(null)// reset cursor
          } 
        }}
        loading={loading}
        paginationMeta={paginationMeta}

      />
    </div>
  );
}



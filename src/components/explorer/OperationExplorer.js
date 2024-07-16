import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import axios from 'axios';
const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'operation_id', headerName: 'Operation', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'operation_response', headerName: 'Operation Res', width: 150 },
  { field: 'user_balance', headerName: 'Balance', width: 150 },
  { field: 'username', headerName: 'User', width: 150 },

];


export default function OperationExplorer() {

  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState(null);

  const [hasNextPage, setHasNextPage] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://avsvppatj3.execute-api.us-east-1.amazonaws.com/dev/v1/records', {
          params: {
            limit: pageSize,
            lastKey: lastKey ? JSON.stringify(lastKey) : null
          }
        });
        debugger;
        setRows(response.data.Items);
        setRowCount(response.data.Items.length);
        setLastKey(response.data.LastEvaluatedKey || null);
        if(response.data.LastEvaluatedKey) {
          setRowCount(-1);
        } else {
          setRowCount(0);
        }
        setHasNextPage(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);


  const paginationMetaRef = React.useRef();

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


  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });

  // return (
  //   <div style={{ height: 400, width: '100%' }}>
  //     <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
  //   </div>
  // );
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}  
        rowCount={rowCount}
        paginationMode="server"
        onPageChange={(params) => {
          debugger;
          setPage(params.page)
        }}
        onPageSizeChange={(params) => {
          debugger;
          setPageSize(params.pageSize);
          setPage(0); // Reset to first page when page size changes
        }}
        onPaginationModelChange={(params) => {
          debugger;
          setPageSize(params.pageSize);
          if(params.page == 0) {
            setPage(0); // Reset to first page when page size changes
            setLastKey(null)// reset cursor
          } else {
            setPage(params.page);
          }
        }}
        loading={loading}
        paginationMeta={paginationMeta}

      />
    </div>
  );
}



import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

const CustomToolbar =  () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ContactDataGrid = () => {

    const [userList, setUserList] = useState([]);

    const columns = [
          { field: "_id", headerName: "ID", width: 150 },
          { field: "cname", headerName: "Name", width: 200 },
          { field: "cemail", headerName: "Email Address", width: 200 },
          { field: "cmessage", headerName: "Message", width: 200 },
          {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const api = params.api;
                const thisRow = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
        
                  console.log(thisRow._id);
                  return deleteUser(thisRow._id);
              };
              return <Button onClick={onClick}>Delete</Button>
            }
          },
       ];

    const getDataFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/contact/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result);
        setUserList(data.result);

    };
    useEffect(() => {
        getDataFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

      const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/contact/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getDataFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'Contact Data Deleted Successfully!!'
          })        }
    }

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        rows={userList.slice()}
        columns = {columns}
        pagination
        getRowId={obj => obj._id}
        slots={{
          toolbar: CustomToolbar,
        }}
        checkboxSelection
       onRowSelected={handleRowSelection}
        
        />
        </div>
  )
}

export default ContactDataGrid
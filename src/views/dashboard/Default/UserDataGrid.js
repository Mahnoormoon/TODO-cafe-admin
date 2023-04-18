import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

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

const UserDataGrid = () => {

    const [userList, setUserList] = useState([]);
    const columns = [
          { field: "_id", headerName: "Id", width: 150 },
          { field: "email", headerName: "Email Address", width: 150 },
          { field: "fname", headerName: "First Name", width: 140 },
          { field: "lname", headerName: "Last Name", width: 140 },
          { field: "contact", headerName: "Contact", width: 130 },
          { field: "description", headerName: "Description", width: 120 }, 
          { field: "isAdmin", headerName: "isAdmin", width: 120 }, 
          { field: 'header', headerName: 'Header', width: 200 },
          { field: 'image', headerName: 'Image', width: 200 },    
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
        const res= await fetch('http://localhost:5000/user/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result.filter);
        setUserList(data.result.filter);
    };
    useEffect(() => {
        getDataFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

     

      const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/user/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getDataFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'User Data Deleted Successfully!!'
          })        }
    }

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        // {...userList}
        rows={userList.slice()}
        columns = {columns}
        pagination
        getRowId={obj => obj._id}
        slots={{
          toolbar: CustomToolbar,
        }}
        checkboxSelection
        
        />
        </div>
  )
}

export default UserDataGrid
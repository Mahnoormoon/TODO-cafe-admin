import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button } from '../../../node_modules/@mui/material/index';

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

const TodoDataGrid = () => {

    const [todoList, setTodoList] = useState([]);
    const columns = [
          { field: "_id", headerName: "Id", width: 150 },
          { field: "title", headerName: "Todo Title", width: 150 },
          { field: "task", headerName: "Todo Task", width: 140 },   
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

                return deleteTodo(thisRow._id);
            };
        
              return <Button onClick={onClick}>Delete</Button>
            }

          },

        ];

    const getStartupFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/todolist/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result.filter);
        setTodoList(data.result.filter);
    };
    useEffect(() => {
        getStartupFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

     

      const deleteTodo = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/todolist/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getStartupFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'Todo Data Deleted Successfully!!'
          })        }
    }

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        rows={todoList.slice()}
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

export default TodoDataGrid
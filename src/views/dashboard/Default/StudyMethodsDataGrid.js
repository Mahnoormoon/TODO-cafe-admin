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

const StudyMethodsDataGrid = () => {

    const [studyList, setStudyList] = useState([]);
    const columns = [
          { field: "_id", headerName: "Id", width: 150 },
          { field: "stitle", headerName: "Study Method Title", width: 150 },
          { field: "sdescription", headerName: "Study Method Description", width: 200 },
          { field: "scredits", headerName: "Study Method Credits", width: 150 },   
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

                return deleteStudy(thisRow._id);
            };
        
              return <Button onClick={onClick}>Delete</Button>
            }

          },

        ];

    const getDataFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/study/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result.filter);
        setStudyList(data.result.filter);
    };
    useEffect(() => {
        getDataFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

     

      const deleteStudy = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/study/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getDataFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'Study Method Data Deleted Successfully!!'
          })        }
    }

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        rows={studyList.slice()}
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

export default StudyMethodsDataGrid
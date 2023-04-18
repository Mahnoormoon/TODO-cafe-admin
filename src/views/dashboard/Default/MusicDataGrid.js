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

const MusicDataGrid = () => {

    const [musicList, setMusicList] = useState([]);
    const columns = [
          { field: "_id", headerName: "Id", width: 150 },
          { field: "mtitle", headerName: "Music Title", width: 150 },
          { field: "aname", headerName: "Artist Name", width: 140 },
          { field: "mcredits", headerName: "Music Credits", width: 140 },
          { field: "maudio", headerName: "Audio File", width: 130 },
          { field: 'mimage', headerName: 'Music Image', width: 200 },    
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

                return deleteMusic(thisRow._id);
            };
        
              return <Button onClick={onClick}>Delete</Button>
            }

          },

        ];

    const getDataFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/music/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result.filter);
        setMusicList(data.result.filter);
    };
    useEffect(() => {
        getDataFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

     

      const deleteMusic = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/music/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getDataFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'Music Data Deleted Successfully!!'
          })        }
    }

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        rows={musicList.slice()}
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

export default MusicDataGrid
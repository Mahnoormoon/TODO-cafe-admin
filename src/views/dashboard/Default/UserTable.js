
import React, { useEffect, useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import {
    Button,
    Modal,
    Box,
    Grid,
    FormControl,
    OutlinedInput,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import Swal from 'sweetalert2';
import { Formik } from 'formik';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

const UserDataGrid = () => {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selUser, setselUser] = useState(null);
    const [selImage, setSelImage] = useState('');

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'fname', headerName: 'First Name', width: 200 },
        { field: 'lname', headerName: 'Last Name', width: 200 },
        { field: 'email', headerName: 'Email Address', width: 200 },
        { field: 'contact', headerName: 'Contact', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'header', headerName: 'Header', width: 200 },
        { field: 'image', headerName: 'Image', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    console.log(thisRow._id);
                    return deleteUser(thisRow._id);
                };
                return <Button onClick={onClick}>Delete</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    console.log(thisRow);
                    setselUser(thisRow);
                    setOpen(true);
                };

                return <Button onClick={onClick}> Edit</Button>;
            }
        }
    ];

    const getUserFromBackend = async () => {
        // send request
        const res = await fetch('http://localhost:5000/user/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result);
        setUserList(data.result);
    };
    useEffect(() => {
        getUserFromBackend();
    }, []);

    const handleRowSelection = (e) => {
        console.log(e);
    };

    const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/user/delete/' + id, {
            method: 'DELETE'
        });

        if (res.status === 200) {
            getBlogFromBackend();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User Data Deleted Successfully!!'
            });
        }
    };

    const updateUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/user/update/' + id, {
            method: 'UPDATE'
        });
        //navigate('/pages/components-overview/AddBlog.js');

        if (res.status === 200) {
            getStartupFromBackend();
            toast.success('User Data Updated Successfully!!');
        }
    };

    const uploadFile = (e) => {
        const file = e.target.files[0];
        setSelImage(file.name);
        const fd = new FormData();
        fd.append('myfile', file);
        fetch('http://localhost:5000/util/uploadfile', {
            method: 'POST',
            body: fd
        }).then((res) => {
            if (res.status === 200) {
                console.log('file uploaded');
            }
        });
    };

    const userSubmit = async (formdata, { setSubmitting }) => {
        formdata.image = selImage;
        setSubmitting(true);
        const res = await fetch(`http://localhost:5000/user/update/${selUser._id}`, {
            method: 'PUT',
            body: JSON.stringify(formdata),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(res.status);
        const data = await res.json();
        console.log(data.result);
        setSubmitting(false);

        //pop up
        if (res.status === 200) {
            setOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'You have updated successfully!'
            });
        }
    };

    return (
        <div style={{ height: '20rem' }}>
            <Modal
                open={open && selUser !== null}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ backgroundColor: 'white' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', height: '100vh' }}>
                    <Formik initialValues={selBlog} onSubmit={userSubmit}>
     {({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="fname">First Name</InputLabel>
                                        <OutlinedInput
                                            id="fname"
                                            type="text"
                                            value={values.fname}
                                            name="fname"
                                            onChange={handleChange}
                                            placeholder="Enter the First Name"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 100
                                            }}
                                        />
                                        {errors.fname && touched.fname ? <div>{errors.fname}</div> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="lname">Last Name</InputLabel>
                                        <OutlinedInput
                                            id="lname"
                                            type="text"
                                            value={values.lname}
                                            name="lname"
                                            onChange={handleChange}
                                            placeholder="Enter the Last Name"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 100
                                            }}
                                        />
                                        {errors.lname && touched.lname ? <div>{errors.lname}</div> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="email">Email Address</InputLabel>
                                        <OutlinedInput
                                            id="email"
                                            type="text"
                                            value={values.email}
                                            name="email"
                                            onChange={handleChange}
                                            placeholder="Enter the Email"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 100
                                            }}
                                        />
                                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="contact">Contact</InputLabel>
                                        <OutlinedInput
                                            id="contact"
                                            type="text"
                                            value={values.contact}
                                            name="contact"
                                            onChange={handleChange}
                                            placeholder="Enter the contact"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 500
                                            }}
                                        />
                                        {errors.contact && touched.contact ? <div>{errors.contact}</div> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="description">Description</InputLabel>
                                        <OutlinedInput
                                            id="description"
                                            type="textarea"
                                            value={values.description}
                                            name="description"
                                            onChange={handleChange}
                                            placeholder="Enter the description"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 500
                                            }}
                                        />
                                        {errors.description && touched.description ? <div>{errors.description}</div> : null}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <OutlinedInput  type="file" onChange={uploadFile} placeholder="Upload Image" />
                                        {/* {errors.image && touched.image ? <div>{errors.image}</div> : null} */}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                        <Button
                                            style={{ width: '100vh', marginTop: '20px' }}
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </div>
            </Modal>

            <DataGrid
                // {...userList}
                rows={userList.slice()}
                columns={columns}
                pagination
                getRowId={(obj) => obj._id}
                slots={{
                    toolbar: CustomToolbar
                }}
                checkboxSelection
                onRowSelected={handleRowSelection}
            />
        </div>
    );
};

export default UserDataGrid;
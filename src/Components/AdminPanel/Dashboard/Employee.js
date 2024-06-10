import React, { useMemo, useState, useContext } from 'react';
import { AuthContext } from '../../../Hooks/AuthContext';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Employee.css'; // Import your CSS file here
import useFetch from "../../../Hooks/useFetch";
import { fakeDataFromStaffArray } from './makeData'; // Import the fake data generator

const Example = ({ store }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);
    console.log(store);

    // Get fake data from the staff array using the store ID
    const staffFakeData = useMemo(() => fakeDataFromStaffArray(store.staff, store._id), [store.staff, store._id]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id'
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'role',
                header: 'Role',
                editVariant: 'select',
                editSelectOptions: ['Owner', 'Admin', 'Staff', 'Delivery'],
            },
        ],
        []
    );

    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    //call READ hook
    const {
        data: fetchedUsers = staffFakeData,
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    //call UPDATE hook
    const { mutateAsync: updateUserRole, isPending: isUpdatingUserRole } = useUpdateUserRole();
    //call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    const addUser = async (values) => {
        try {
            const responseData = await sendRequest(
                'users/addEmployee',
                'POST',
                JSON.stringify({
                    email: values.email,
                    storeId: store._id,
                    newRole: values.role,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );

            console.log(responseData); // Handle response data as needed
            window.location.reload();
            table.setCreatingRow(null);; //exit creating mode
        } catch (error) {
            // Handle error if needed
        }
    };

    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
        console.log(values);
        await addUser(values, table);
        table.setCreatingRow(null); //exit editing mode
    };

    const editEmployee = async (values, table) => {
        try {
            const responseData = await sendRequest(
                'users/ownerUpdate',
                'PUT',
                JSON.stringify({
                    userId: values.id,
                    storeId: store._id,
                    newRole: values.role,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            console.log(responseData); // Handle response data as needed
            table.setEditingRow(null); //exit editing mode

            // table.setCreatingRow(null); ; //exit creating mode
        } catch (error) {
            // Handle error if needed
        }
    }
    //UPDATE action
    const handleSaveUserRole = async ({ values, table }) => {
        console.log(values);
        await editEmployee(values, table);
        table.setEditingRow(null); //exit editing mode
    };

    const deleteEmployee = async (value) => {
        try {
            const responseData = await sendRequest(
                'users/deleteEmployee',
                'DELETE',
                JSON.stringify({
                    userId: value.id,
                    storeId: store._id,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );

            console.log(responseData); // Handle response data as needed

            // Refresh the page
            window.location.reload();
        } catch (error) {
            // Handle error if needed
            console.error(error); // Optionally log the error
        }
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        console.log(row.original);
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteEmployee(row.original)
            // deleteUser(row.id); // Pass the id directly to deleteUser
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                color: 'error',
                children: 'Error loading users',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                height: '100%', // Ensure the table takes the full height of the container
                overflow: 'auto', // Enable scrolling
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowSave: handleSaveUserRole,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New User</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit User Role</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '4px' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                }}
                sx={{ margin: '0.1rem' }} // reduced margin
            >
                Create New User
            </Button>
        ),
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUserRole || isDeletingUser,
            showAlertBanner: isLoading,
            showProgressBars: isFetchingUsers,
        },
    });

    return (
        <MaterialReactTable table={table} />
    );
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 0)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) => [
                ...prevUsers,
                {
                    ...newUserInfo,
                    id: (Math.random() + 1).toString(36).substring(7),
                },
            ]);
        },
    });
}

//READ hook (get users from api)
function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {

        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (update user role in api)
function useUpdateUserRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) =>
                prevUsers?.map((prevUser) =>
                    prevUser.id === newUserInfo.id ? newUserInfo : prevUser
                )
            );
        },
    });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    console.log(queryClient);
    return useMutation({
        mutationFn: async (userId) => {
            console.log(userId);
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (userId) => {
            queryClient.setQueryData(['users'], (prevUsers) =>
                prevUsers?.filter((user) => user.id !== userId)
            );
        },
    });
}

const queryClient = new QueryClient();

const ExampleWithProviders = ({ store }) => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example store={store} />
    </QueryClientProvider>
);

export default ExampleWithProviders;

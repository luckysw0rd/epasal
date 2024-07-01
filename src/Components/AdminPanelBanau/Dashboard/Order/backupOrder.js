


import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    IconButton,
    Tooltip,
    darken,
    lighten,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { fakeData, status } from './makeData';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Order.css';

const Example = () => {
    const [creatingRowIndex, setCreatingRowIndex] = useState();
    const [validationErrors, setValidationErrors] = useState({});

    const handleFieldChange = (field, value, row) => {
        console.log(`Field changed: ${field}, New value: ${value}, Row:`, row);
        // Your custom logic for handling field changes
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'fullName',
                header: 'Full Name',
                muiEditTextFieldProps: (row) => ({
                    required: true,
                    error: !!validationErrors?.fullName,
                    helperText: validationErrors?.fullName,
                    onChange: (e) => handleFieldChange('fullName', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            fullName: undefined,
                        }),
                    disabled: row.depth > 0, // Disable editing for subRows
                }),
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Phone Number',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.phoneNumber,
                    helperText: validationErrors?.phoneNumber,
                    onChange: (e, row) => handleFieldChange('phoneNumber', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            phoneNumber: undefined,
                        }),
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                editVariant: 'select',
                editSelectOptions: status,
                muiEditTextFieldProps: {
                    select: true,
                    error: !!validationErrors?.status,
                    helperText: validationErrors?.status,
                    onChange: (e, row) => handleFieldChange('status', e.target.value, row),
                },
            },
            {
                accessorKey: 'Cart',
                header: 'Selected Variant',
                enableEditing: false,

                Cell: ({ row }) => {
                    const { cart } = row.original;

                    return (
                        <div>
                            {Array.isArray(cart) && cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div key={index}>
                                        {item.selectedVariant.map((variant, variantIndex) => (
                                            <div key={variantIndex}>
                                                <strong>{variant.name}:</strong> {variant.options.name}
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p>Expand ⬇️</p>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'cart',
                header: 'Product',
                enableEditing: false,

                Cell: ({ row }) => {
                    const { cart } = row.original;

                    return (
                        <div>
                            {Array.isArray(cart) && cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div key={index}>
                                        <p className='font-bold text-xl'>{item.product}</p>
                                        <p className='text-green-800'>Final Price: ${item.price}</p>
                                        <p>Discount: ${item.discountAmount}</p>
                                        <p className='text-cyan-900'>Quantity: {item.count}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Expand ⬇️</p>
                            )}
                        </div>
                    );
                },
            },

            {
                accessorKey: 'deliveryCharge',
                header: 'Delivery Charge (NPR)',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.deliveryCharge,
                    helperText: validationErrors?.deliveryCharge,
                    onChange: (e, row) => handleFieldChange('deliveryCharge', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            deliveryCharge: undefined,
                        }),
                },
            },
            {
                accessorKey: 'promoCode',
                header: 'Promo Code',
                enableEditing: false,

                muiEditTextFieldProps: {
                    required: false,
                    error: !!validationErrors?.promoCode,
                    helperText: validationErrors?.promoCode,
                    onChange: (e, row) => handleFieldChange('promoCode', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            promoCode: undefined,
                        }),
                },
            },
            {
                accessorKey: 'promoDiscount',
                header: 'Promo Discount (NPR)',
                enableEditing: false,

                muiEditTextFieldProps: {
                    required: false,
                    error: !!validationErrors?.promoDiscount,
                    helperText: validationErrors?.promoDiscount,
                    onChange: (e, row) => handleFieldChange('promoDiscount', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            promoDiscount: undefined,
                        }),
                },
            },
            {
                accessorKey: 'address',
                header: 'Address',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.address,
                    helperText: validationErrors?.address,
                    onChange: (e, row) => handleFieldChange('address', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            address: undefined,
                        }),
                },
            },
            {
                accessorKey: 'landmark',
                header: 'Landmark',
                muiEditTextFieldProps: {
                    required: false,
                    error: !!validationErrors?.landmark,
                    helperText: validationErrors?.landmark,
                    onChange: (e, row) => handleFieldChange('landmark', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            landmark: undefined,
                        }),
                },
            },
            {
                accessorKey: 'paymentMethod',
                header: 'Payment Method',
                enableEditing: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.paymentMethod,
                    helperText: validationErrors?.paymentMethod,
                    onChange: (e, row) => handleFieldChange('paymentMethod', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            paymentMethod: undefined,
                        }),
                },
            },
            {
                accessorKey: 'totalPrice',
                header: 'Total Price (NPR)',

                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.totalPrice,
                    helperText: validationErrors?.totalPrice,
                    onChange: (e, row) => handleFieldChange('totalPrice', e.target.value, row),
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            totalPrice: undefined,
                        }),
                },
            },
        ],
        [validationErrors]
    );

    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    //call READ hook
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    //call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
    //call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    //CREATE action
    const handleCreateUser = async ({ values, row, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser({ ...values, managerId: row.original.managerId });
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const editOrder = (values, table) => {

    }

    const handleSaveUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await editOrder(values, table);
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.id);
        }
    };

    const onEdit = (row, staticRowIndex, table) => {
        table.setEditingRow(row)
    }
    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableColumnPinning: true,
        enableEditing: true,
        enableExpanding: true,
        positionCreatingRow: creatingRowIndex, //index where new row is inserted before
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        muiTableBodyRowProps: ({ row }) => ({
            //conditional styling based on row depth
            sx: (theme) => ({
                backgroundColor: darken(
                    lighten(theme.palette.background.paper, 0.1),
                    row.depth * (theme.palette.mode === 'dark' ? 0.2 : 0.1),
                ),
            }),
        }),
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderRowActions: ({ row, staticRowIndex, table }) => (
            <Box sx={{ display: 'flex', gap: '0.1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(row, staticRowIndex, table)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add Subordinate">
                    {/* <IconButton
                        onClick={() => {
                            setCreatingRowIndex((staticRowIndex || 0) + 1);
                            table.setCreatingRow(
                                createRow(
                                    table,
                                    {
                                        id: null,
                                        firstName: '',
                                        lastName: '',
                                        city: '',
                                        state: '',
                                        managerId: row.id,
                                        subRows: [],
                                    },
                                    -1,
                                    row.depth + 1,
                                ),
                            );
                        }}
                    >
                        <PersonAddAltIcon />
                    </IconButton> */}
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                startIcon={<PersonAddAltIcon />}
                variant="contained"
                onClick={() => {
                    setCreatingRowIndex(table.getRowModel().rows.length); //create new row at bottom of table
                    table.setCreatingRow(true);
                }}
            >
                Create New User
            </Button>
        ),
        initialState: {
            columnPinning: { left: ['mrt-row-actions'], right: [] },
            expanded: false,
            pagination: { pageSize: 20, pageIndex: 0 },
        },
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return (
        <div className='scrollable-container'>
            <MaterialReactTable table={table} />
        </div>
    );
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            console.info('create user', user);
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (_prevUsers) => {
                const prevUsers = JSON.parse(JSON.stringify(_prevUsers));
                newUserInfo.subRows = [];
                if (newUserInfo.managerId) {
                    const manager = findUserInTree(newUserInfo.managerId, prevUsers);
                    if (manager) {
                        manager.subRows = [
                            ...(manager.subRows || []),
                            {
                                ...newUserInfo,
                                id: `${manager.id}.${(manager.subRows?.length || 0) + 1}`,
                            },
                        ];
                    }
                } else {
                    prevUsers.push({
                        ...newUserInfo,
                        id: `${prevUsers.length + 1}`,
                    });
                }
                return [...prevUsers];
            });
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            //send api request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve(fakeData);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
    console.log("inside here doing something");
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            console.info('update user', user);
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) => {
                let user = findUserInTree(newUserInfo.id, prevUsers);
                user = { ...user, ...newUserInfo };
                return [...prevUsers];
            });
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            console.info('delete user', userId);
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (userId) => {
            queryClient.setQueryData(['users'], (prevUsers) => {
                const newUsers = JSON.parse(JSON.stringify(prevUsers));
                //remove user
                const user = findUserInTree(userId, newUsers);
                if (user) {
                    const manager = findUserInTree(user.managerId, newUsers);
                    if (manager) {
                        manager.subRows = manager.subRows?.filter(
                            (subUser) => subUser.id !== user.id,
                        );
                    } else {
                        return newUsers.filter((user) => user.id !== userId);
                    }
                }
                return [...newUsers];
            });
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default ExampleWithProviders;
const validateRequired = (value) => value !== undefined && value !== null && value.toString().length > 0;

function validateUser(user) {
    return {
        fullName: !validateRequired(user.fullName) ? 'Full Name is Required' : '',
        phoneNumber: !validateRequired(user.phoneNumber) ? 'Phone Number is Required' : '',
        status: !validateRequired(user.status) ? 'Status is Required' : '',
        deliveryCharge: !validateRequired(user.deliveryCharge) ? 'Delivery Charge is Required' : '',
        address: !validateRequired(user.address) ? 'Address is Required' : '',
        paymentMethod: !validateRequired(user.paymentMethod) ? 'Payment Method is Required' : '',
        totalPrice: !validateRequired(user.totalPrice) ? 'Total Price is Required' : '',
    };
}

function findUserInTree(managerId, users) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === managerId) {
            return users[i];
        }
        if (users[i].subRows) {
            const found = findUserInTree(managerId, users[i].subRows);
            if (found) return found;
        }
    }
    return null;
}

import React from 'react'
import FullComp from '../../../global/layout/full'
import { Button, Input, Table } from 'antd'
import { useAuth } from '../../../../context/AuthContext'
import { IconSearch } from '@tabler/icons-react'
import { columnUserList } from '../../../global/consts/columns'
import { useUser } from '../../../../context/UserContext'
import Action from '../../../global/modal/action'

export default function CmsUserComp() {

    const {
        setSize
    } = useAuth()

    const {
        listUser,
        detailUser,
        modalAddUser, setModalAddUser,
        modalEditUser, setModalEditUser,
        isLoading, setIsLoading, 
        resMessage, setResMessage, 
        handleAddUser,
        getDetailUser,
        handleEditUser,
        handleDeleteUser,
    } = useUser()

    const formAdd = [
        {
            name: "name",
            label: "Name",
            required: true,
            type: "input"
        },
        {
            name: "email",
            label: "Email",
            required: true,
            type: "input"
        },
        {
            name: "phone",
            label: "Phone",
            required: true,
            type: "input"
        },
        {
            name: "password",
            label: "Password",
            required: true,
            type: "input"
        },
        {
            name: "location",
            label: "Location",
            required: true,
            type: "textarea"
        },
        {
            name: "role",
            label: "Role",
            required: true,
            type: "select",
            option: [
                { value: 'superadmin', label: 'Superadmin' },
                { value: 'employee', label: 'Employee' },
                { value: 'user', label: 'User' },
            ]
        },
    ]

    return (
        <>
            <FullComp
                menu="Users"
            >
                <div
                    className='bg-white w-full lg:my-0 lg:rounded-2xl lg:py-5 lg:px-5 md:my-0 md:rounded-xl md:py-3 md:px-3 my-0 rounded-xl py-2 px-2'
                >
                    <div
                        className='flex justify-end items-center lg:gap-5 md:gap-3 gap-2'
                    >
                        <Input 
                            placeholder='Search proudct here...'
                            style={{
                                width: setSize(200, 180, 150)
                            }}
                            suffix={
                                <IconSearch 
                                    style={{
                                        backgroundColor: '#4880FF',
                                        color: '#FFFFFF',
                                        borderRadius: 50,
                                        padding: 3
                                    }}
                                    size={setSize(20, 16, 14)}
                                />
                            }
                        />
                        <Button
                            type='primary'
                            onClick={() => setModalAddUser(true)}
                        >
                            + Add User
                        </Button>
                    </div>
                    <div
                        className='lg:mt-5 md:mt-3 mt-3'
                    >
                        <Table 
                            dataSource={listUser}
                            columns={columnUserList(listUser, getDetailUser, setModalEditUser, handleDeleteUser)}
                            className='lg:pt-5 md:pt-3 pt-2'
                            size={setSize('medium', 'small', 'small')}
                            pagination={{
                                total: listUser && listUser?.length,
                                showTotal: (total, range) =>
                                  `${range[0]}-${range[1]} of ${
                                    total ? total.toLocaleString() : ""
                                  } items`,
                                defaultPageSize: 10,
                                defaultCurrent: 1,
                                showSizeChanger: true,
                                hideOnSinglePage: false,
                                pageSizeOptions: [10, 20, 50, 100],
                                size: setSize('large', 'medium', 'small'),
                            }}
                            scroll={{
                                x: setSize(0, 1000, 800),
                            }}
                        />
                    </div>
                </div>
            </FullComp>
            <Action 
                isOpen={modalAddUser}
                setIsopen={setModalAddUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title={"Add User"}
                item={formAdd}
                action={handleAddUser}
                resMessage={resMessage}
                setResMessage={setResMessage}
            />
            <Action 
                isOpen={modalEditUser}
                setIsopen={setModalEditUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title={"Edit User"}
                item={formAdd}
                data={detailUser}
                action={handleEditUser}
                resMessage={resMessage}
                setResMessage={setResMessage}
                isReq={false}
            />
        </>
    )
}

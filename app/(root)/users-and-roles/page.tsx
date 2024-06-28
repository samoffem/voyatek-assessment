'use client'
import  SlashIcon  from "@/public/icons/slashIcon.svg"
import styles from './pageStyles.module.css'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import {toast} from 'sonner'

 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 


import { Label } from "@/components/ui/label"
  
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import Modal from "@/components/Modal/Modal"
import { useToast } from "@/components/ui/use-toast"

type User = {
    id: string
    full_name: string
    email: string
    password: string
    role: string
}


const baseurl = process.env.NEXT_PUBLIC_BASEURL!
const UsersAndRoles = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)

    const [users, setUsers] = useState<User[]>([])
    const [refetch, setRefetch] = useState(false)
    const [actionType, setActiontype] = useState<'create' | 'edit' | 'delete' | ''>('')
    const [selectedUser, setSelectedUser] = useState<User>()
    // const { toast } = useToast()

    const openDialog = () => {
        setSelectedUser(undefined)
        setActiontype('create')
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

   

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try {
                
                const {data} = await axios.get(baseurl)
                setUsers(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()
    }, [refetch])

    const createUser = async(data: {email: string, full_name: string, role: string, password: string} )=>{
        setLoader(true)
        try {
            
            const res = await axios.post(baseurl, {...data, id: Date.now().toString(36)})
            setRefetch(prev=> !prev)
            setLoader(false)
            setIsDialogOpen(false)
            toast.success('User has been added')
            
        } catch (error) {
            setLoader(false)
            toast.error('There was a problem with your request')
        }
    }

    const handleEdit = (user: User)=>{
        setActiontype('edit')
        setIsDialogOpen(true)
        setSelectedUser(user)
    }
    const updateUser = async (d: {email: string, full_name: string, role: string, password: string})=> {
        setLoader(true)
        try {
            const {data} =await axios.patch(`${baseurl}${selectedUser?.id}`,d )
            setLoader(false)
            setRefetch(prev=> !prev)
            setIsDialogOpen(false)
            toast.success('User has been updated')
        } catch (error) {
            setLoader(false)
            console.log(error)
            toast.error('There was a problem with your request')
        }
    }

    const deleteUser = async (d: {email: string, full_name: string, role: string, password: string})=>{
        setLoader(true)
        try {
            const {data} = await axios.delete(`${baseurl}${selectedUser?.id}`)
            setRefetch(prev=> !prev)
            setIsDialogOpen(false)
            setLoader(false)
            toast.success('User has been deleted')
        } catch (error) {
            setLoader(false)
            console.log(error)
            toast.error('There was a problem with your request')
           
        }

    }

    const handleRemove = (user: User)=>{
        setActiontype('delete')
        setIsDialogOpen(true)
        setSelectedUser(user)
    }
  return (
    <section>

        <div className="breadcrumbs">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-[#98a2b3] text-[13px]">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/components" className="text-[#98a2b3] text-xs">Users and Roles</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {/* <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem> */}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="mt-4">
            <h2 className="font-normal text-xl">Users and Roles</h2>
            <p className="text-xs font-light text-gray-100 mt-4">Manage all users in your business</p>
        </div>
        <div className={`flex gap-3 mt-3 text-[11px] font-semibold text-[#98a2b3] ${styles['tab']}`}>
            <p className="py-2 px-2 border-b-2 text-blue-600">Users</p>
            <p className="py-2 px-2">Roles</p>
        </div>

        <div className={`mt-3 ${styles['table-wrap']}`}>
            <div className={`h-[60px] flex items-center justify-between py-4 px-4 bg-white rounded-t`}>
                <div className={`flex gap-3 items-center ${styles['actions-left']}`}>
                    <div className={`flex gap-1 items-center px-1 py-1 rounded border border-[#cbd5e1]  ${styles['input-wrapper']}`}>
                        <Image 
                            src='/icons/searchIcon.svg'
                            width={14}
                            height={14}
                            alt='search'
                            className="h-[14px]"
                        />
                        <Input  type="text" placeholder="Search here" className={`border-none flex-1 bg-inherit py-0 px-1 h-[20px] text-[12px]`} />
                    </div>

                    <div className="flex gap-1 px-1 py-1 items-center rounded bg-white border border-[#cbd5e1] text-[12px]">
                        <Image 
                            src='/icons/btnIcon1.svg'
                            width={14}
                            height={14}
                            alt='search'
                        />
                        <span>Filter</span>
                    </div>
                </div>
                <div className={styles['btn-wrap']}>
                    
                        <button onClick={openDialog} className="flex items-center gap-2 rounded text-white bg-[#0d6efd] py-1 px-2 text-[11px]">
                            <Image 
                                src='/icons/btnIcon2.svg'
                                width={20}
                                height={20}
                                alt='plus'
                            />
                            <span>New User</span>
                        </button>
                </div>
            </div>

            {users.length > 0 && 
            <div className={` ${styles['table-main']}`}>
                <Table>
                    
                    <TableHeader className="text-[10px]">
                        <TableRow className="border-none text-center">
                            <TableHead className="">
                                <Checkbox id="terms" className="border border-[#cbd5e1] rounded" />
                            </TableHead>
                            <TableHead className="">
                                <div className="flex gap-1 items-center">
                                    <p>Name</p>
                                    <Image 
                                        src="/icons/chevronV.svg"
                                        width={16}
                                        height={16}
                                        alt="icon"
                                    />
                                </div>
                            </TableHead>
                            <TableHead>
                            <   div className="flex gap-1 items-center">
                                    <p>Email Address</p>
                                    <Image 
                                        src="/icons/chevronV.svg"
                                        width={16}
                                        height={16}
                                        alt="icon"
                                    />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex gap-1 items-center">
                                    <p>Role</p>
                                    <Image 
                                        src="/icons/chevronV.svg"
                                        width={16}
                                        height={16}
                                        alt="icon"
                                    />
                                </div>
                            </TableHead>
                            <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=" bg-white text-[#344054] font-light text-xs">
                        {
                            users.map(user=>(

                            <TableRow className="border-[#cbd5e1] border-b" key={user.id}>
                                <TableCell className="w-[10px]">
                                    <Checkbox className="border border-[#cbd5e1] rounded" />
                                </TableCell>
                                <TableCell className="font-semibold text-[11px]">{user.full_name}</TableCell>
                                <TableCell className="text-[11px]">{user.email}</TableCell>
                                <TableCell>
                                    <div className={` w-fit px-3 py-1 rounded-full font-normal text-[11px] 
                                        ${user.role === 'Administrator'? 'text-blue-600 bg-[#f0f6fe]' : 
                                        user.role === 'Sales Manager'? 'text-[#0f973d] bg-[#e7f6ec]' : 'text-[#f58a07] bg-[#fef4e6]'} `}
                                    >
                                    {user.role}
                                    </div>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex gap-3 font-semibold text-[11px] justify-end">
                                        <p className=" text-blue-600 cursor-pointer" onClick={()=>handleEdit(user)}>View</p>
                                        <p className="cursor-pointer" onClick={()=>handleRemove(user)}>Remove</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))
                        }
                    
                    </TableBody>
               

                </Table>

           

            </div>}
            {
                users.length === 0 && (
                    <div className="bg-white text-center px-2 py-5 font-semibold mt-7 rounded text-sm text-[#98a2b3]">
                        NO USER AVAILABLE
                    </div>
                )
            }
            {isDialogOpen && <Modal 
                createUser={createUser}
                updateUser={updateUser}
                isDialogOpen={isDialogOpen} 
                setIsDialogOpen={setIsDialogOpen}
                loader={loader}
                actionType={actionType}
                selectedUser={selectedUser}
                deleteUser = {deleteUser}
            />}

        </div>

    </section>
  )
}

export default UsersAndRoles
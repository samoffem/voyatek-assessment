'use client'
import  SlashIcon  from "@/public/icons/slashIcon.svg"
import styles from './pageStyles.module.css'
import { Input } from "@/components/ui/input"
 
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

const frameworks = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "sales-manager",
      label: "Sales Manager",
    },
    {
      value: "representative",
      label: "Representative",
    },
    
  ]
  

const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    full_name: z.string(),
    password: z.string()
  })
  

const UsersAndRoles = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")


    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          full_name: "",
          password: ""
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try {
                
                const data = await axios.get('https://ca349cc21366a8827049.free.beeceptor.com/api/users/')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()
    })
  return (
    <section>

        <div className="breadcrumbs">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Users and Roles</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {/* <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem> */}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="mt-10">
            <h2 className="font-bold text-xl">Users and Roles</h2>
            <p className="text-base font-light text-gray-100 mt-4">Manage all users in your business</p>
        </div>
        <div className={`flex gap-3 ${styles['tab']}`}>
            <p>Users</p>
            <p>Roles</p>
        </div>

        <div className={`mt-5 ${styles['table-wrap']}`}>
            <div className={styles['table-actions']}>
                <div className={`flex gap-3 items-center ${styles['actions-left']}`}>
                    <div className={`flex ${styles['input-wrapper']}`}>
                        <Image 
                            src='/icons/searchIcon.svg'
                            width={20}
                            height={20}
                            alt='search'
                        />
                        <Input  type="text" placeholder="Search here" className={`border-none flex-1 bg-inherit ${styles['input']}`} />
                    </div>

                    <div className="flex gap-2 px-3 py-3 items-center rounded bg-[#F0F2F5]">
                        <Image 
                            src='/icons/btnIcon1.svg'
                            width={20}
                            height={20}
                            alt='search'
                        />
                        <span>filter</span>
                    </div>
                </div>
                <div className={styles['btn-wrap']}>
                    
                        <button onClick={openDialog} className="flex items-center gap-2 rounded text-white bg-[#0d6efd] py-2 px-3">
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

            <div className={styles['table-main']}>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}
                <DialogOverlay className="bg-black-200 opacity-50">

                <DialogContent className="sm:max-w-[425px] bg-white">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                    >
                                    {value
                                        ? frameworks.find((framework) => framework.value === value)?.label
                                        : "Select role..."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[350px] bg-white p-0">
                                    <Command>
                                    <CommandInput placeholder="Search Role..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No role found.</CommandEmpty>
                                        <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                            >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                "ml-auto h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            </CommandItem>
                                        ))}
                                        </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full bg-blue-600 text-white rounded">Add User</Button>
                    </form>
                </Form>

                </DialogContent>
                </DialogOverlay>
            </Dialog>


            </div>

        </div>

    </section>
  )
}

export default UsersAndRoles
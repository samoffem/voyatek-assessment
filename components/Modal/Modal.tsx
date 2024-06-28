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

import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons"
 
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"
import axios from "axios"


const frameworks = [
    {
      value: "Administrator",
      label: "Admin",
    },
    {
      value: "Sales Manager",
      label: "Sales Manager",
    },
    {
      value: "Sales Representative",
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
  

const Modal = ({isDialogOpen, setIsDialogOpen, createUser, loader, actionType, selectedUser, updateUser, deleteUser}: 
    {isDialogOpen: boolean, 
    setIsDialogOpen: (open: boolean)=>void, 
    createUser: (data: any)=> void
    updateUser: (data: any)=> void
    deleteUser: (data: any)=> void
    loader: boolean
    actionType: 'create' | 'edit' | 'delete' | ''
    selectedUser?: {
        id: string
        full_name: string
        email: string
        password: string
        role: string
    } 
}) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(selectedUser? selectedUser.role : "")
   
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: selectedUser? selectedUser.email : "",
          full_name: selectedUser? selectedUser.full_name : "",
          password: selectedUser? selectedUser.password : ''
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        actionType === 'create'? createUser({...values, role: value}) : updateUser({...values, role: value})
        
      }
      const handleDelete = ()=>{
            deleteUser(selectedUser)
      }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
    {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
    </DialogTrigger> */}
        <DialogOverlay className="bg-black-200 opacity-50">

            {actionType !== 'delete' && <DialogContent className="sm:max-w-[425px] bg-white">
                <div className="text text-center">

                    <div 
                        className={`w-16 h-16 rounded-full bg-[#f0f6fe] 
                        ml-auto mr-auto relative overflow-hidden flex 
                        items-center justify-center border border-[#d2e4f3]`
                        }
                    >
                        <Image 
                            src='/icons/user-blue.svg'
                            width={32}
                            height={32}
                            alt="user-img"
                            
                        />
                    </div>
                    <h2 className="mt-2 font-medium">
                        {actionType === 'create'? 'New User' : 'Edit User'}
                        </h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel className="modal-form-label">Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="New User Email Address" {...field} className="modal-form-input"/>
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
                            <FormLabel  className="modal-form-label">Full Name</FormLabel>
                            <FormControl>
                                <Input  placeholder="New User Full Name" {...field} className="modal-form-input"/>
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                            <Popover open={open} onOpenChange={setOpen} >
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between modal-form-input text-[#98a2b3] font-light"
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
                            <FormLabel  className="modal-form-label">Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} className="modal-form-input"/>
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button disabled={loader} type="submit" className="w-full bg-blue-600 text-white rounded">
                            {
                                loader? (
                                    <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                    </>
                                ): actionType === 'create'? 'Add New User' : 'Update User'
                            }
                            
                        </Button>
                    </form>
                </Form>

            </DialogContent>}

            {actionType === 'delete' && 
                <DialogContent className="text-center sm:max-w-[425px] bg-white border-none">

                    <h2 className="font-semibold text-sm">Delete this user</h2>
                    <p className="text-[11px] text-gray-100 max-w-[300px] m-auto">
                        This user and associated data will be permanently removed. Do you wish to continue?
                    </p>

                    <div className="flex gap-2 item-center justify-center mt-3">
                        <button 
                        className="bg-[#f7f9fc] text-[9px] font-semibold px-2 py-1 rounded border border-[#d0d5dd]"
                        onClick={()=>setIsDialogOpen(false)}
                        >
                            Cancel action
                        </button>
                        <button 
                            disabled={loader}
                            className="border border-[#eb9b98] bg-[#fbeae9] text-[#d42620] text-[9px] font-semibold px-2 py-1 rounded flex items-center justify-center"
                            onClick={handleDelete}
                        >
                            {loader? <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> 
                                <span>Deleting...</span>
                            </>:
                                <>
                                    <Image 
                                        src={'/icons/delete.svg'}
                                        width={20}
                                        height={20}
                                        alt="delete"
                                    />
                                    <span>Yes, Delete</span>
                                </>
                            }
                        </button>
                    </div>

                </DialogContent>
            }
        </DialogOverlay>
    </Dialog>
  )
}

export default Modal
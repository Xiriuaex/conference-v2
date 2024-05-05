'use client'

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from '@/components/ui/form';

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";


const CreateRoomForm = () => {

  
    const router = useRouter();
    
    //z resolver setup:
    const formSchema = z.object ({
        name: z.string().min(1, {
            message: "Room name is required!"
        }),
        imageUrl: z.string().min(1, {
            message: "Room details is required!"
        })
    });

    //create form and adds resolver and default input values:
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/room', values);

            form.reset();
            router.refresh();
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="flex-center w-[45vw] h-[50vh] bg-blue-200 rounded-xl my-5">
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8 px-6"> 
                    <FormField
                        control= {form.control}
                        name= "name"
                        render= {({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                    Room Name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}/>
                    <FormField 
                        control={form.control}
                        name="imageUrl"
                        render= {({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                    Image URL
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>         
                </div> 

                <Button className="bg-dark-1 text-white" disabled={isLoading}>
                    Create
                </Button>
           </form> 
        </Form>
                     
    </div>
  )
}

export default CreateRoomForm

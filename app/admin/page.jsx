"use client";

import { userInfo } from '../../db/schema'
import { db } from '../../utils/db'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
import FormContent from './_components/FormContent';
import Preview from './_components/Preview';

function Admin() {
    const {user} = useUser();
    const router = useRouter();

    useEffect(()=>{

       if (user) {
        CheckUser();
       }

    },[user])

    const CheckUser = async () => {
        
        const res = await db.select().from(userInfo)
        .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress));

        

        if (res.length === 0){

            router.replace('/create');

        }
    }
  return (
    <div className=''>
      <div className='grid lg:grid-cols-3 grid-cols-1'>
    <div className='col-span-2'>
      <FormContent />
    </div>
    <div>
      <Preview />
    </div>
      </div>
    </div>
  )
}

export default Admin
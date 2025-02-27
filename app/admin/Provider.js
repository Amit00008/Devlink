"use client";
import { db } from "../../utils/db";
import { userInfo } from "../../db/schema";
import React, { useEffect } from 'react'
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../_context/UserDetailContext";
import { PreviewUpdateContext } from "../_context/PreviewUpdateContext";

function Provider({children}) {
    const [updatePreview,setUpdatePreview] = React.useState(0);
    const {user} = useUser();
    const [userData,setUserData] = React.useState([
        {}
    ]);


  

    useEffect(()=>{
        const GetUserDetails = async () => {
            const res = await db.select().from(userInfo)
            .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress));
            setUserData(res[0]);
        }
        if (user){
            GetUserDetails();
        }
    },[user,GetUserDetails]);
  return (
    <UserDetailContext.Provider value={{userData,setUserData}}>

        <PreviewUpdateContext.Provider value={{updatePreview,setUpdatePreview}}>

        <div>{children}</div>
        </PreviewUpdateContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider
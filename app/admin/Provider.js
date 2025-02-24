"use client";
import { db } from "../../utils/db";
import { userInfo } from "../../db/schema";
import React, { useEffect } from 'react'
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../_context/UserDetailContext";

function Provider({children}) {
    const {user} = useUser();
    const [userData,setUserData] = React.useState([
        {}
    ]);


    const GetUserDetails = async () => {
        const res = await db.select().from(userInfo)
        .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress));
        setUserData(res[0]);
    }

    useEffect(()=>{
        if (user){
            GetUserDetails();
        }
    },[user]);
  return (
    <UserDetailContext.Provider value={{userData,setUserData}}>

        <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider
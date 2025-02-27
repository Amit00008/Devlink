"use client";
import { useUser } from '@clerk/nextjs'
import { db } from '../../utils/db'
import { project, userInfo } from '../../db/schema'
import React, { useContext, useEffect } from 'react'
import { eq } from 'drizzle-orm';
import { UserDetailContext } from '../_context/UserDetailContext';

function UserProvider({children}) {
  const {user} = useUser();
  const {userData, setUserData} = useContext(UserDetailContext);
  
  useEffect(()=>{
    const GetUserDetails = async () => {
      if (!user) return;
    
      try {
        const res = await db
          .select()
          .from(userInfo)
          .leftJoin(project, eq(userInfo.id, project.userRef))
          .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));
    
        if (res.length === 0) {
          console.log("User not found");
          return;
        }
    
        // Extract user info from the first record
        const userData = res[0].userInfo;
        
        // Extract projects (filtering out null values)
        const projects = res
          .map((row) => row.project)
          .filter((project) => project !== null);
    
      
    
        setUserData({ ...userData, projects });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
   if (user) {
    GetUserDetails();
   }
  },[user,GetUserDetails]);

 
  
  return (
    <div data-theme={userData.theme}>{children}</div>
  )
}

export default UserProvider
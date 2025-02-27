"use client";
import React, { useEffect } from 'react'
import UserDetail from './UserDetail'
import AddProject from './AddProject'
import { db } from '../../../utils/db'
import { desc, eq } from 'drizzle-orm'
import { project } from '../../../db/schema'
import { useUser } from '@clerk/nextjs'
import ProjectListEdit from './ProjectListEdit';

function FormContent() {
const {user} = useUser();
const [projectList,setProjects] = React.useState([]);


 useEffect(()=>{
    const GetProjectLi  = async () => {
        const res = await db.select().from(project)
        .where(eq(project.emailRef,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(project.id))

        console.log(res);

        setProjects(res);

}
    if (user) {
        GetProjectLi();
    }
 },[user,GetProjectLi]);

return (
    <div className='py-10 overflow-auto'>
            <h2 className='text-3xl font-bold text-center'>Start Desgining Ur portfolio</h2>
            <UserDetail />
            <hr className='my-5' /> 
            <AddProject refreshData={GetProjectLi} />
            <ProjectListEdit projectList={projectList} refreshData={GetProjectLi} />
            
    </div>
)
}

export default FormContent
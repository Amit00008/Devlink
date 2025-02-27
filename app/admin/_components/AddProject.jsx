"use client";
import { useUser } from "@clerk/nextjs";
import { project } from "../../../db/schema";
import { db } from "../../../utils/db";
import { Link2 } from "lucide-react";
import React, { useContext } from "react";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { motion } from "framer-motion";
import { PreviewUpdateContext } from "../../../app/_context/PreviewUpdateContext";

function AddProject({ refreshData }) {
    const [openUrlInput, setOpenUrlInput] = React.useState(false);
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');
     const {updatePreview,setUpdatePreview} = useContext(PreviewUpdateContext);
    const {user} = useUser();
    const [loading, setLoading] = React.useState(false);
    const { userData } = useContext(UserDetailContext);
    const handleSubmit = async (e) =>{

        e.preventDefault();
        console.log(e.target[0].value);
        setLoading(true);
        const res = await db.insert(project)
        .values({
            url: e.target[0].value,
            emailRef: user?.primaryEmailAddress?.emailAddress,
            userRef: userData.id

        })
        setOpenUrlInput(false);
        if (res){
            setUpdatePreview(updatePreview+1);
            setSuccess('Project Added Successfully');
            refreshData();
            setLoading(false);

        } else {
            setError('Error: ',error);
            setLoading(false);
        }

    }
  return (
    <div>
        {!openUrlInput ?  <button
        onClick={() => setOpenUrlInput(true)}
        className="btn btn-secondary w-full">+ Add New Project</button>
        :   <form onSubmit={(e)=>{
            handleSubmit(e);
          }}
          className="flex flex-col gap-4 rounded-lg"
          >
            <label className="input input-bordered flex items-center gap-2">
              <input type="url" className="grow" placeholder="Project Url"
              defaultValue={'https://'}
              />
              <Link2 />
            </label>
            <button type="submit" className="btn 
            btn-secondary w-full"
            disabled={loading}
            >Add New Project</button>
          </form> }

          {success && (
      <motion.div
        onClick={() => setSuccess("")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="alert"
        className="mt-4 w-full bg-green-600 text-white text-sm py-3 px-4 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{success}!</span>
      </motion.div>
    )}

    {/* Error Notification */}
    {error && (
      <motion.div
        onClick={() => setError("")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="alert"
        className="mt-4 w-full bg-red-600 text-white text-sm py-3 px-4 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </motion.div>
    )}
     
    
    </div>
  );
}

export default AddProject;

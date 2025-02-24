import { Camera, Link2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { db } from "../../../utils/db";
import { userInfo } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { supabase } from "../../../utils/supabase";
import {  TwicPicture } from "@twicpics/components/react";

function UserDetail() {
    const {user} = useUser();
    const { userData } = useContext(UserDetailContext);
    let timeoutId;
    const [selected, setSelected] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');
    const [Pfp, setPfp] = React.useState('');

    useEffect(()=>{
    if (userData){
      setPfp(userData?.profileImage)
    }
    },[userData])

  const onInputChange = async (e,fieldName) => {
    clearTimeout(timeoutId);
    timeoutId=setTimeout(async()=>{
        
       try {
        const res = await db.update(userInfo).set({
            [fieldName]:e.target.value
         }).where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))
       if (res){
              console.log('updated');
       } 
       } catch (error) {
        setError('Error: ',error);
       }

    },1000)

  }

  const handleFileUpload = async (e) => {
   

    const file = e.target.files[0];
    const filePath = `${file.name}+${user?.primaryEmailAddress?.emailAddress}`;
    const res = await supabase.storage.from('devlink').upload(`avatars/${filePath}`,file);
    if (res.error){
      setError('Error: You cant reupload same photo multiple times ',error.message);
        return;
  } 

 
    try {
      
      // const { data: publicUrlData } = supabase.storage
      // .from('devlink')
      // .getPublicUrl(filePath);
        const res = await db.update(userInfo).set({
            profileImage:`${filePath}`
         }).where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress))
       if (res){
                setPfp(filePath);
              setSuccess('');
              setSuccess('Profile Image Updated');
       } 
       } catch (error) {
              setError('Error: ' ,error.message);
  }
 

}

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="p-6 rounded-xl bg-gray-800 my-7 shadow-lg shadow-gray-900 w-full max-w-xl mx-auto"
  >
    {/* Profile Picture & Username */}
    <div className="flex gap-3 items-center">
      <div className={`p-3  rounded-full flex items-center justify-center cursor-pointer  transition relative ${Pfp ? '' : 'bg-purple-700'}`}>
      <label htmlFor="file-input" className="cursor-pointer">
        {Pfp ? (
          // <img src={`https://devlink.twic.pics/${Pfp}`} className="h-12 w-12 rounded-full object-cover" alt="Profile" htmlFor='file-input'/>

          <TwicPicture src={Pfp} className="h-[50px] w-[50px] rounded-full object-cover" alt="Profile"   />

          
        ) : (
          
            <Camera className="h-7 w-7 text-white" />
        
        )}
          </label>
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
      <input
        onChange={(e) => onInputChange(e, "name")}
        type="text"
        defaultValue={userData.name}
        placeholder="Username"
        className="w-full bg-gray-700 border-none text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Bio Input */}
    <textarea
      defaultValue={userData.bio}
      onChange={(e) => onInputChange(e, "bio")}
      placeholder="Write something about yourself..."
      className="w-full mt-5 p-3 bg-gray-700 border-none text-white placeholder-gray-400 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
    ></textarea>

    {/* Icons for Location & Link */}
    <div className="flex gap-3 mt-6">
      <MapPin
        onClick={() => setSelected(selected === "location" ? "" : "location")}
        className={`h-12 w-12 p-3 rounded-md transition cursor-pointer ${
          selected === "location" ? "bg-slate-600" : "hover:bg-slate-600 text-purple-700"
        }`}
      />
      <Link2
        onClick={() => setSelected(selected === "link" ? "" : "link")}
        className={`h-12 w-12 p-3 rounded-md transition cursor-pointer ${
          selected === "link" ? "bg-slate-600" : "hover:bg-slate-600 text-green-500"
        }`}
      />
    </div>

    {/* Conditional Inputs for Location & Link */}
    {selected === "location" && (
      <div className="mt-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            onChange={(e) => onInputChange(e, "location")}
            defaultValue={userData.location}
            className="grow bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500"
            placeholder="Enter Location"
          />
          <MapPin className="h-4 w-4 opacity-70" />
        </label>
      </div>
    )}
    {selected === "link" && (
      <div className="mt-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            onChange={(e) => onInputChange(e, "link")}
            defaultValue={userData.link}
            className="grow bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500"
            placeholder="Enter URL"
          />
          <Link2 className="h-4 w-4 opacity-70" />
        </label>
      </div>
    )}

    {/* Success Notification */}
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
  </motion.div>
  );
}

export default UserDetail;

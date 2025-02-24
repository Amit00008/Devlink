"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../utils/db";
import { userInfo } from "../../db/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { eq } from "drizzle-orm";

function CreateUserName() {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const {user} = useUser();
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  useEffect(()=>{
  if (user) {
      CheckUser();
  }
  },[user])
  // checking the user
   const CheckUser = async () => {
          
          const res = await db.select().from(userInfo)
          .where(eq(userInfo.email,user?.primaryEmailAddress?.emailAddress));
  
          console.log(res);
  
         if (res?.length>0){
            router.push('/admin');
         }
      }



  const OnSubmit = async () => {
    if (username.length > 10) {
        setError("Username can't be longer than 10 characters");
      return;
    } 
     setError("");
    try {
        const res = await db.insert(userInfo)
    .values ({
        name:user.fullName || user.firstName || user?.primaryEmailAddress?.emailAddress.replace('@','').replace('.',''),
        email:user?.primaryEmailAddress?.emailAddress,
        username:username.replace('','')

    })
    if (res){

        setSuccess(true);
        router.replace('/admin');


    }
    } catch (error) {
        setError("Error: ", error);
        return;
    }

   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Create Portfolio Username</h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Choose a unique username for your portfolio.
        </p>

        <label className="self-start text-lg font-medium mb-2">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Type here..."
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition mb-4"
        />

        <button
          onClick={OnSubmit}
          disabled={!username}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            username
              ? "bg-purple-600 hover:bg-purple-500"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Submit
        </button>

        {/* Animated Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              role="alert"
              className="mt-4 w-full bg-red-600 text-white text-sm py-3 px-4 rounded-lg flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </motion.div>
          )}

{success && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="alert"
      className="mt-4 w-full bg-green-600 text-white text-sm py-3 px-4 rounded-lg flex items-center gap-2 shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Your username has been created successfully!</span>
    </motion.div>
  )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CreateUserName;

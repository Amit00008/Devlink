"use client";
import { project } from "../../../db/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils/db";
import { TwicPicture } from "@twicpics/components/react";
import { eq } from "drizzle-orm";
import {  Layers2, LineChartIcon, Link2, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { supabase } from "../../../utils/supabase";
import Swal from "sweetalert2";
import { PreviewUpdateContext } from "../../../app/_context/PreviewUpdateContext";


function ProjectListEdit({ projectList, refreshData }) {
  const [selected, setSelected] = React.useState("");
  let timeoutId;
  const [logos, setLogos] = React.useState({});
   const {updatePreview,setUpdatePreview} = useContext(PreviewUpdateContext);

  const { user } = useUser();

  const onInputChange = async (value, fieldName, projectId) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      try {
        const res = await db
          .update(project)
          .set({
            [fieldName]: value,
          })
          .where(eq(project.id, projectId));
        if (res) {
          console.log("updated");
          setUpdatePreview(updatePreview + 1);
        }
      } catch (error) {
        setError("Error: ", error);
      }
    }, 1000);
  };

  const handleFileUpload = async (e, projectId) => {
    const file = e.target.files[0];
    if (!file) return;

    const filePath = `${file.name}+${user?.primaryEmailAddress?.emailAddress}`;

    const res = await supabase.storage
      .from("devlink")
      .upload(`projects/${filePath}`, file);
    if (res.error) {
      setError("Error: You can’t reupload the same photo multiple times");
      return;
    }

    try {
      const dbRes = await db
        .update(project)
        .set({
          logo: filePath,
        })
        .where(eq(project.id, projectId));

      if (dbRes) {
        setLogos((prevLogos) => ({
          ...prevLogos,
          [projectId]: filePath, // Correctly updating logo per project
        }));
        refreshData();
        console.log("updated");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const onDelete = async (projectId) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then( async (result) => {
        if (result.isConfirmed) {

      const res = await db.delete(project).where(eq(project.id, projectId));

       if (res){
        refreshData();
       }

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });


  }
  return (
    <div className="rounded-lg my-10 p-4 bg-gray-900 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Project List</h1>
      </div>
      
      {projectList.map((project, index) => {
        return (
          <div key={index} className="my-6 bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <label htmlFor={`project-file-input-${project.id}`} className="cursor-pointer">
                <TwicPicture
                  id={`project-logo-${project.id}`}
                  src={logos[project.id] || project.logo}
                  className="w-[60px] h-[60px] rounded-full border-2 border-gray-600 shadow-sm hover:scale-105 transition-transform"
                />
              </label>
  
              <input
                type="file"
                id={`project-file-input-${project.id}`}
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], project.id)}
              />
  
              <div className="w-full">
                <input
                  defaultValue={project?.name}
                  onChange={(e) => onInputChange(e.target.value, "name", project.id)}
                  type="text"
                  placeholder="Project Name"
                  className="input input-bordered w-full my-2 bg-gray-700 text-white focus:ring-purple-500"
                />
                <input
                  onChange={(e) => onInputChange(e.target.value, "description", project.id)}
                  defaultValue={project?.description}
                  type="text"
                  placeholder="Tell About Your project"
                  className="input input-bordered w-full my-2 text-sm bg-gray-700 text-white focus:ring-purple-500"
                />
              </div>
            </div>
  
            <div className="flex gap-4 mt-4 items-center">
              <div className="flex gap-4 items-center">
                <div data-tip="Category" className="tooltip">
                  <Layers2
                    onClick={() => setSelected(selected === "category" + index ? "" : "category" + index)}
                    className={`h-12 w-12 p-3 rounded-lg transition cursor-pointer shadow-md ${
                      selected === "category" + index
                        ? "bg-slate-700 text-yellow-500"
                        : "hover:bg-slate-700 text-white-500"
                    }`}
                  />
                </div>
                <div data-tip="Link" className="tooltip">
                  <Link2
                    onClick={() => setSelected(selected === "link" + index ? "" : "link" + index)}
                    className={`h-12 w-12 p-3 rounded-lg transition cursor-pointer shadow-md ${
                      selected === "link" + index
                        ? "bg-slate-700 text-blue-500"
                        : "hover:bg-slate-700 text-white-500"
                    }`}
                  />
                </div>

                <div data-tip="Stats" className="tooltip">
                  <LineChartIcon
                    onClick={() => setSelected(selected === "stats" + index ? "" : "stats" + index)}
                    className={`h-12 w-12 p-3 rounded-lg transition cursor-pointer shadow-md ${
                      selected === "stats" + index
                        ? "bg-slate-700 text-green-500"
                        : "hover:bg-slate-700 text-white-500"
                    }`}
                  />
                </div>
  
                <button 
                  onClick={() => onDelete(project.id)}
                  className="btn bg-transparent border-none hover:bg-red-500 hover:text-white  text-red-500 rounded-lg shadow-md transition cursor-pointer tooltip" data-tip="Delete" 
                >
                  <Trash2 />
                </button>
              </div>
  
              <label className="label cursor-pointer">
                <input
                  onChange={(e) => onInputChange(e.target.checked, "active", project.id)}
                  type="checkbox"
                  defaultChecked={project.active}
                   data-tip="Acive Toggle"
                  className="toggle toggle-secondary  tooltip"
                />
              </label>
            </div>
  



   {selected === "stats" + index && (
    <div className="mt-3">
      <label className="input input-bordered flex items-center gap-2 bg-gray-700 text-white">
       
                <input
                  onChange={(e) => onInputChange(e.target.checked, "stats", project.id)}
                  type="checkbox"
                  defaultChecked={project.stats}
                   data-tip="Enable stats"
                  className="toggle toggle-success  tooltip"
                />
                 Enable Stats
              </label>
      </div>  
   )}

            {selected === "category" + index && (
              <div className="mt-3">
                 
                <label className="input input-bordered flex items-center gap-2 bg-gray-700 text-white">
                  <input
                    type="text"
                    onChange={(e) => onInputChange(e.target.value, "category", project.id)}
                    defaultValue={project.category}
                    className="grow bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500"
                    placeholder="Enter Category"
                  />
                  <Layers2 className="h-4 w-4 opacity-70" />
                </label>
              </div>
            )}
           
            {selected === "link" + index && (
              <div className="mt-3">
                <label className="input input-bordered flex items-center gap-2 bg-gray-700 text-white">
                  <input
                    type="text"
                    onChange={(e) => onInputChange(e.target.value, "url", project.id)}
                    defaultValue={project.url}
                    className="grow bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500"
                    placeholder="Enter URL"
                  />
                  <Link2 className="h-4 w-4 opacity-70" />
                </label>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProjectListEdit;

"use client";

import { db } from '../../../../utils/db';
import Themes from '../../../_data/Themes';
import React, { useContext } from 'react';
import { userInfo } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '../../../_context/UserDetailContext';
import { PreviewUpdateContext } from '../../../_context/PreviewUpdateContext';

function ThemeOptions() {
    const {user} = useUser();
    const [selectedtheme, setSelectedTheme] = React.useState();
    const {userData} = useContext(UserDetailContext);
     const {updatePreview,setUpdatePreview} = useContext(PreviewUpdateContext);
    const onThemeSelect = async (themeName) => {
        setSelectedTheme(themeName);
         const res = await db.update(userInfo)
       
         .set({
            theme: themeName
         }).where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));

         if (res){
                alert('Theme updated successfully!')
                setUpdatePreview(updatePreview+1);

         } else {
                alert('Failed to update theme!')
         }
    }
return (
    <div className="p-6 max-w-3xl mx-auto">
        <h2 className="font-bold text-3xl py-6 text-center">Select Your Page Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Themes.map((theme, index) => (
                <div key={index}
                onClick={() => {
                onThemeSelect(theme.name);
                }}
                className={`rounded-lg shadow-lg border-4 overflow-hidden cursor-pointer ${(userData?.theme === theme.name || selectedtheme === theme.name ) && 'border-blue-600  bg-gray-900 rounded-lg'}  `}>
                    <div className="p-4 text-center font-semibold" style={{ backgroundColor: theme.colors.primary, color: '#fff' }}>
                        {theme.name}
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="h-10" style={{ backgroundColor: theme.colors.secondary }}></div>
                        <div className="h-10" style={{ backgroundColor: theme.colors.accent }}></div>
                    </div>
                    <div className="h-12 flex items-center justify-center" style={{ backgroundColor: theme.colors.neutral, color: '#fff' }}>
                        
                    </div>
                    <div className="h-12 flex items-center justify-center border-t" style={{ backgroundColor: theme.colors.base }}>
                        
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default ThemeOptions;
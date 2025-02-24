import {
  ClerkProvider,
 
} from '@clerk/nextjs'
import './globals.css'
import { TwicInstall } from "@twicpics/components/react";
import "@twicpics/components/style.css";
import Provider from './admin/Provider';

const RootLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body >
         <TwicInstall 
         domain='https://devlink.twic.pics'
         />
         <Provider>
          {children}

         </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout;

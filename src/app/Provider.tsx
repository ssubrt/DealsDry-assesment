"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }:{children : any}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase.config";
import { InsertarUsuarios } from "../supabase/crudUsuarios";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  
  const insertarUsuarios = async (dataProvider, idAuthSupabase) => {
    const p = {
      nombres: dataProvider.name,
      foto: dataProvider.picture,
      idauth_supabase: idAuthSupabase,
    };
    await InsertarUsuarios(p)

  };
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session == null) {
          setUser(null);
        } else {
          setUser(session?.user.user_metadata);
          insertarUsuarios(session?.user.user_metadata,session?.user.id);
          console.log("event", event);
          console.log("session", session?.user.user_metadata);
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
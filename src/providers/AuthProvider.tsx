import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Props } from "react-native-tab-view/lib/typescript/src/TabBarIndicator";


type Profile = {
    avatar_url: string | null;
    full_name: string | null;
    group: string;
    id: string;
    updated_at: string | null;
    username: string | null;
    website: string | null;
};




type AuthData = {
    session: Session | null;
    loading : boolean;
    profile: Profile | null;
    isAdmin: boolean;
    };

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session , setSession] = useState<Session | any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchSession = async () => {
            const {data : {session}, } = await supabase.auth.getSession();
           setSession(session);
             

              if (session) {
                // fetch profile
                const { data } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                setProfile(data || null);
                
              }
              setLoading(false);

        }




        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
          });

      

    }, []);

    console.log(profile);
    return (
        <AuthContext.Provider value={{session, loading, profile, isAdmin : profile?.group === 'ADMIN'  }}>
            {children}
        </AuthContext.Provider>
    )
    
}
    ;

    export const useAuth = () => useContext(AuthContext);
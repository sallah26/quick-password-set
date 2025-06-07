import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/supabase/client";
import {
  getUserProfile,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  getSession,
} from "@/api/auth";
import { handleError } from "@/utils/errors";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(
    JSON.parse(localStorage.getItem("profile") || null)
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        try {
          const profileData = await getUserProfile(currentUser.id);
          localStorage.setItem("profile", JSON.stringify(profileData));

          setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    // Initial session fetch
    (async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      const currentUser = sessionData?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        try {
          const profileData = await getUserProfile(currentUser.id);
          setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }

      setLoading(false);
    })();

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.getUserFriendlyMessage());
      throw appError;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      await signUpWithEmail(email, password, firstName, lastName);
      toast.success("Check your email to confirm your account.");
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.getUserFriendlyMessage());
      throw appError;
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      setUser(null);
      setSession(null);
      setProfile(null);
      toast.success("You have been successfully logged out.");
    } catch (error) {
      const appError = handleError(error);
      toast.error("Failed to sign out: " + appError.getUserFriendlyMessage());
    }
  };

  return { session, user, profile, loading, signIn, signUp, signOut };
}

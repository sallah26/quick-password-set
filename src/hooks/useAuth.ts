import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/supabase/client";
import { getUserProfile } from "@/api/auth";
import {
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  getSession,
} from "@/api/auth";
import { handleError, AuthenticationError } from "@/utils/errors";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Check for session from localStorage
    const storedSession = localStorage.getItem("supabase.auth.token");
    // const storedSession = localStorage.getItem(
    //   "sb-jphrhtxjuoreiyhqwbog-auth-token"
    // );

    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        if (parsedSession?.currentSession?.user) {
          setUser(parsedSession.currentSession.user);
        }
      } catch (error) {
        console.error("Error parsing stored session:", error);
      }
    }

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        try {
          const profileData = await getUserProfile(currentUser.id);
          setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Initial session check
    getSession().then(async (session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
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
    });

    return () => subscription.unsubscribe();
  }, []);
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.getUserFriendlyMessage());
      throw appError; // Re-throw for component handling
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
      throw appError; // Re-throw for component handling
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      setUser(null);
      setSession(null);
      localStorage.removeItem("supabase.auth.token");
      toast.success("You have been successfully logged out.");
    } catch (error) {
      const appError = handleError(error);
      toast.error("Failed to sign out: " + appError.getUserFriendlyMessage());
    }
  };

  return { session, user, profile, loading, signIn, signUp, signOut };
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contests/AuthContext";
import Tenant from "@/components/Tenant";

const Index = () => {
  const { user, profile } = useAuthContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
            {profile?.tenant_id && (
              <p>
                you are the admin of <Tenant id={profile?.tenant_id} /> school
              </p>
            )}
            <p className="text-gray-600">Choose an option to get started</p>
          </div>

          <div className="space-y-4">
            <Link to="/login">
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                Sign In
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 font-medium rounded-lg transition-all duration-200"
              >
                Create Account
              </Button>
            </Link>

            <Link to="/reset-password">
              <Button
                variant="ghost"
                className="w-full h-12 text-gray-600 hover:text-gray-900 font-medium rounded-lg transition-all duration-200"
              >
                Reset Password
              </Button>
            </Link>

            <Link to="/account-setup">
              <Button
                variant="ghost"
                className="w-full h-12 text-gray-600 hover:text-gray-900 font-medium rounded-lg transition-all duration-200"
              >
                Account Setup
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Secure authentication powered by modern encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

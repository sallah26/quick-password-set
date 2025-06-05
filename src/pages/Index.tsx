
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

type AuthState = 'login' | 'register' | 'reset';

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>('login');

  const renderAuthForm = () => {
    switch (authState) {
      case 'login':
        return <LoginForm onSwitchToRegister={() => setAuthState('register')} onSwitchToReset={() => setAuthState('reset')} />;
      case 'register':
        return <RegisterForm onSwitchToLogin={() => setAuthState('login')} />;
      case 'reset':
        return <ResetPasswordForm onSwitchToLogin={() => setAuthState('login')} />;
      default:
        return <LoginForm onSwitchToRegister={() => setAuthState('register')} onSwitchToReset={() => setAuthState('reset')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600">
              {authState === 'login' && 'Sign in to your account'}
              {authState === 'register' && 'Create your new account'}
              {authState === 'reset' && 'Reset your password'}
            </p>
          </div>
          
          <div className="animate-fade-in">
            {renderAuthForm()}
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

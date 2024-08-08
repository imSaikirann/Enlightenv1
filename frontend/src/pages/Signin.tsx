// src/components/Signup.tsx
import React, { useState } from 'react';
import { useSetRecoilState,useRecoilValue } from 'recoil';
import { userState, authLoadingState } from '../store/atoms/signupAtom';
import { errorAtom } from '../store/atoms/errorAtom';
import { signin  } from '../api/auth';
import {useNavigate,Link} from 'react-router-dom'


const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(authLoadingState);
  const setError = useSetRecoilState(errorAtom);
  const error = useRecoilValue(errorAtom);
  const [loading, setLoadingLocal] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setLoadingLocal(true);
    setError(null);

   
    
      const user = await signin(email, password);
      console.log(user)
     if(user.token)
        {
         localStorage.setItem('token',user.token)
         setUser(true);
         navigate('/')
         window.location.reload()
        }

    if (user.error) {
      setError({ errors: user.error });
    } else {
      setUser(true);
    }
  
    setLoading(false);
    setLoadingLocal(false);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <form onSubmit={handleSubmit}>
        <div className='w-[350px] border-2 rounded-lg flex flex-col justify-center items-center px-6 py-8 space-y-5'>
          <h2 className='text-2xl font-semibold font-title'>Sign in</h2>
          <input
            className='w-full p-2 border rounded-sm'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className='w-full p-2 border rounded-sm'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && (
  <div className="w-full bg-red-200 text-xs p-small rounded-sm flex items-center justify-center font-title">
    <h2 className="text-center">{error?.errors}</h2>
  </div>
)}
          <button
            className='bg-primary rounded-full w-full text-white p-2'
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signin Up...' : 'Sign in'}
          </button>
          <div className='flex flex-row items-center justify-center space-x-2 w-auto'>
  <h2 className='text-sm'>Don't have an account? Create one</h2>
  <Link to="/signup">
    <h2 className='text-sm text-gray-500 hover:underline'>Sign up</h2>
  </Link>
</div>


        </div>
      </form>
    </div>
  );
};

export default Signup;

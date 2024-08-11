
import React, { useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState, authLoadingState } from '../store/atoms/signupAtom';
import { errorAtom } from '../store/atoms/errorAtom';
import { signup } from '../api/auth';
import { useNavigate,Link } from 'react-router-dom'
import Alert from '../components/Alert';





const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(authLoadingState);
  const setError = useSetRecoilState(errorAtom);
  const error = useRecoilValue(errorAtom);
  const [loading, setLoadingLocal] = useState(false);
  const navigate = useNavigate()
  const [success,setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setLoadingLocal(true);
    setError(null);



    const user = await signup(email, password, userName);

    if (user.token) {
      localStorage.setItem('token', user.token)
      setSuccess(true)
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
    {success && (
      <Alert message={"Account Created"}/>
    )}
   <div>
   <form onSubmit={handleSubmit}>
        <div className='w-[350px] border-2 rounded-lg flex flex-col justify-center items-center px-6 py-8 space-y-5 shadow-sm'>
          <h2 className='text-2xl font-semibold font-title'>Sign Up</h2>
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
          <input
            className='w-full p-2 border rounded-sm'
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className='flex flex-row items-start justify-center space-x-2'>
          <h2 className='text-center text-sm'>Already have an account ? </h2>
          <Link to="/signin"><h2 className='text-sm text-gray-500 hover:underline'>Sign in</h2></Link>
          </div>
        </div>
      </form>
   </div>
   <div>
    <img ></img>
   </div>
    </div>
  );
};

export default Signup;

import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setUserName }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/login', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    if(data.status === 'ok') {
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.name)
      setUserName(data.name)
      navigate("/");
    }else{
      alert('Please check your username and email')
    }  
  }

  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center">
        <div className="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-4 text-center">
        <h1 className='h2 mb-3 font-weight-normal'>Login</h1>
        <form onSubmit={loginUser}>
          <input 
            className="form-control mb-2"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoFocus
          />
          <input
            className='form-control mb-2'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoFocus
          />
          <div className="my-3">
            <input className='btn btn-success btn-lg w-100' type="submit" value="Sign In"/>
          </div>
          <a href="/register" className="link-success">Register</a>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;

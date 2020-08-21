import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialLoginValues = {
  username:'',
  password:''
}

const Login = (props) => {
  const history = useHistory()
  const [loginValues, setLoginValues] = useState(initialLoginValues)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setLoginValues({...loginValues, [name]: value})
  }

  const login = e => {
    e.preventDefault()

    axiosWithAuth()
      .post('/api/login', loginValues)
      .then( res => {
        console.log(res)
        history.push('/bubbles')
      })
      .catch(err =>  console.log(err))
  }

  return (
    
    <div className='login'>

      <form onSubmit={login} >
        <h2>Log In</h2>
        <label>
          <input
            type="text"
            name="username"
            value={loginValues.username}
            onChange={handleChange}
            placeholder='username'
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            value={loginValues.password}
            onChange={handleChange}
            placeholder='password'
          />
        </label>

        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;

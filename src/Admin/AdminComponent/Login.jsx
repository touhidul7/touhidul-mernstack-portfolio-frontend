/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { KeyRound, Mail, User } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ methode }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const[email, setEmail]=useState();

  const handleSubmit = (e) => {
    toast("Logging In....");
    e.preventDefault();

    setTimeout(() => {
      methode({ username, password });
    }, 2000);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[50%]  m-auto mt-10"></div>
      <div className="w-[40%] m-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* <label className="input input-bordered flex items-center gap-2">
          <Mail size={15}/>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="grow" placeholder="Email" />
          </label> */}
          <label className="input input-bordered flex items-center gap-2">
            <User size={15} />
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <KeyRound size={15} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>
          <button className="btn btn-outline btn-success w-full" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

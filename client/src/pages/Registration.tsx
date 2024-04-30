import { useState } from 'react';
import { CheckList } from '../components/CheckList';

export function Registration() {
  const [pass, setPass] = useState('');

  return (
    <div className="container flex justify-center mt-20 ">
      <div className="text-primary flex flex-col  items-center bg-secondary sm:6/12 md:6/12 lg:w-3/12 rounded p-4 shadow-wrapper">
        <div>
          <h1 className="text-3xl text-primary font-zen text-center">
            Create Account
          </h1>
        </div>
        <form className="flex flex-col justify-center items-center my-2">
          <label htmlFor="First Name" className="my-3">
            First Name
          </label>
          <input name="First Name" type="text" className="rounded" required />
          <label htmlFor="Last Name" className="my-3">
            Last Name
          </label>
          <input name="Last Name" type="text" className="rounded" required />
          <label htmlFor="Email" className="my-3">
            Email
          </label>
          <input name="Email" type="text" className="rounded" required />
          <label htmlFor="Password" className="my-3">
            Password
          </label>
          <input
            name="Password"
            type="password"
            className="rounded"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </form>
        <CheckList value={pass} />
      </div>
    </div>
  );
}

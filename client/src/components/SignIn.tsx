import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../library/useUser';

export function SignIn() {
  const { handleSignIn } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      handleSignIn(user, token);
      console.log('Signed In', user);
      console.log('Received token:', token);
      navigate('/');
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div className="tex-primary">Loading...</div>;
  if (error) {
    return (
      <div className="text-primary">
        Error Loading catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl text-primary font-zen text-center my-4">
        Sign In
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center p-4">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input type="email" name="email" className="rounded mb-2" />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input name="password" type="password" className="rounded mb-2" />
          <button
            type="submit"
            className="my-4 bg-black rounded w-full hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

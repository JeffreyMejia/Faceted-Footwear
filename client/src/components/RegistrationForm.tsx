import { FormEvent, useState } from 'react';

type Props = {
  value: string;
  handlePassword: () => void;
  onSwitch: () => void;
};

export function RegistrationForm({ value, handlePassword, onSwitch }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const res = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: { 'content-type': 'application/JSON' },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
      console.log(
        `You can check the database with: psql -d userManagement -c 'select * from users'`
      );
      alert(
        `Successfully registered ${user.username} as userId ${user.userId}.`
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div className="tex-primary">Loading...</div>;
  if (error) {
    return (
      <div className="text-primary">
        Error Loading:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl text-primary font-zen text-center">
          Create Account
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center my-2">
        <label htmlFor="firstName" className="my-3">
          First Name
        </label>
        <input name="firstName" type="text" className="rounded" required />
        <label htmlFor="lastName" className="my-3">
          Last Name
        </label>
        <input name="lastName" type="text" className="rounded" required />
        <label htmlFor="email" className="my-3">
          Email
        </label>
        <input name="email" type="email" className="rounded" required />
        <label htmlFor="password" className="my-3">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="rounded"
          value={value}
          onChange={handlePassword}
          required
        />
        <button
          onClick={onSwitch}
          type="submit"
          className="my-4 bg-black rounded w-full hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary">
          Create
        </button>
      </form>
    </>
  );
}

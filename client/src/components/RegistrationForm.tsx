import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  lengthRegex,
  numberRegex,
  specialCharactersRegex,
  uppercaseRegex,
} from '../library/data';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';

type Props = {
  value: string;
  handlePassword: (e) => void;
};

export function RegistrationForm({ value, handlePassword }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [passType, setPassType] = useState('password');
  const navigate = useNavigate();

  useEffect(() => {
    if (value.match(passwordValidRegex)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [value]);

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
      alert(`Successfully registered ${user.email} as userId ${user.userId}.`);
      navigate('/registration');
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const rules = [
    { label: 'One upper case', pattern: uppercaseRegex, id: 1 },
    { label: 'One number', pattern: numberRegex, id: 2 },
    { label: 'Minimum 8 characters', pattern: lengthRegex, id: 3 },
    { label: 'One special Character', pattern: specialCharactersRegex, id: 4 },
  ];

  const passwordValidRegex = new RegExp(
    `^(?=${[
      lengthRegex.source,
      uppercaseRegex.source,
      numberRegex.source,
      specialCharactersRegex.source,
    ].join(')(?=')}).*$`
  );

  function showPass() {
    if (passType === 'password') {
      setPassType('text');
    } else {
      setPassType('password');
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

  const buttonClass =
    isDisabled === true ? `bg-red-700 text-white button is disabled` : '';

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
        <span className="flex items-center">
          <input
            name="password"
            type={passType}
            className="rounded ml-6"
            value={value}
            onChange={handlePassword}
            required
          />
          <FaEye
            onClick={() => showPass()}
            className={`ml-2 ${passType === 'text' ? 'fill-black' : ''}`}
          />
        </span>
        <button
          type="submit"
          disabled={isDisabled}
          className={`${
            value && buttonClass
          }my-4 bg-black rounded w-full hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary mt-3`}>
          Create
        </button>
      </form>
      <div>
        {value && isDisabled === true && (
          <h3>password must meet requirements!</h3>
        )}
        {value && <h3 className="mb-4">Password requirements:</h3>}
        {value &&
          rules.map((rule) => {
            const name = value && value.match(rule.pattern) ? 'passed' : '';
            return name === 'passed' ? (
              <div key={rule.id}>
                <p className={name}>{rule.label}</p>
                <FaCheck className="check" />
              </div>
            ) : (
              <div key={rule.id}>
                <p className={name}>{rule.label}</p>
                <FaX className="x" />
              </div>
            );
          })}
      </div>
    </>
  );
}

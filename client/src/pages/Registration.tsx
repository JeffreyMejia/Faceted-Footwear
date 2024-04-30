import { useState } from 'react';
import { CheckList } from '../components/CheckList';
import { RegistrationForm } from '../components/RegistrationForm';
import { SignIn } from '../components/SignIn';

export function Registration() {
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState(true);

  return (
    <div className="container flex justify-center mt-20 ">
      <div className="text-primary flex flex-col  items-center bg-secondary sm:6/12 md:6/12 lg:w-3/12 rounded p-4 shadow-wrapper">
        <div className="flex mb-4 border-b-4 border-black w-full justify-around">
          <button
            className="bg-black w-full rounded hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary"
            onClick={() => setActiveTab(true)}>
            Sign In
          </button>
          <button
            className="bg-black w-full rounded hover:bg-primary hover:text-black active:bg-secondary active:text-tertiary"
            onClick={() => setActiveTab(false)}>
            Registration
          </button>
        </div>
        {activeTab === true ? (
          <SignIn />
        ) : (
          <>
            <RegistrationForm
              onSwitch={() => setActiveTab(true)}
              value={pass}
              handlePassword={(e) => setPass(e.target.value)}
            />
            {pass && <CheckList value={pass} />}
          </>
        )}
      </div>
    </div>
  );
}

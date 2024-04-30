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
          <div>
            <button onClick={() => setActiveTab(true)}>Sign In</button>
          </div>
          <div>
            <button onClick={() => setActiveTab(false)}>Registration</button>
          </div>
        </div>
        {activeTab === true ? (
          <SignIn
            value={pass}
            handlePassword={(e) => setPass(e.target.value)}
          />
        ) : (
          <>
            <RegistrationForm
              value={pass}
              handlePassword={(e) => setPass(e.target.value)}
            />
            <CheckList value={pass} />
          </>
        )}
      </div>
    </div>
  );
}

type Props = {
  value: string;
  handlePassword: (e) => void;
};

export function RegistrationForm({ value, handlePassword }: Props) {
  return (
    <>
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
        <input name="Email" type="email" className="rounded" required />
        <label htmlFor="Password" className="my-3">
          Password
        </label>
        <input
          name="Password"
          type="password"
          className="rounded"
          value={value}
          onChange={handlePassword}
          required
        />
      </form>
    </>
  );
}

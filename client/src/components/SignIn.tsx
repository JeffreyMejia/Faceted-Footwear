type Props = {
  value: string;
  handlePassword: (e) => void;
};

export function SignIn({ value, handlePassword }: Props) {
  return (
    <div>
      <h1 className="text-3xl text-primary font-zen text-center my-4">
        Sign In
      </h1>
      <div>
        <form className="flex flex-col justify-center items-center p-4">
          <label htmlFor="Email">Email</label>
          <input type="email" name="Email" className="rounded" />
          <label htmlFor="Password">Password</label>
          <input
            name="Password"
            type="password"
            className="rounded"
            value={value}
            onChange={handlePassword}
            required
          />
        </form>
      </div>
    </div>
  );
}

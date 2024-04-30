type Props = {
  value: string;
  handlePassword: (e) => void;
};

export function SignIn({ value, handlePassword }: Props) {
  return (
    <div>
      <div>
        <form className="flex flex-col justify-center items-center">
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

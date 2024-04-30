import { FaX, FaCheck } from 'react-icons/fa6';

type Props = {
  value: string;
};

export function CheckList({ value }: Props) {
  const uppercaseRegex = new RegExp(/.*[A-Z]/);
  const numberRegex = new RegExp(/.*\d/);
  const lengthRegex = new RegExp(/.{8,}$/);
  const specialCharactersRegex = new RegExp(
    /.*[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/
  );

  const rules = [
    { label: 'One upper case', pattern: uppercaseRegex },
    { label: 'One number', pattern: numberRegex },
    { label: 'Minimum 8 characters', pattern: lengthRegex },
    { label: 'One special Character', pattern: specialCharactersRegex },
  ];
  return (
    <div>
      {rules.map((rule) => {
        const name = value && value.match(rule.pattern) ? 'passed' : '';
        return name === 'passed' ? (
          <>
            <p className={name}>{rule.label}</p>
            <FaCheck className="check" />
          </>
        ) : (
          <>
            <p className={name}>{rule.label}</p>
            <FaX className="x" />
          </>
        );
      })}
    </div>
  );
}

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
    { label: 'One upper case', pattern: uppercaseRegex, id: 1 },
    { label: 'One number', pattern: numberRegex, id: 2 },
    { label: 'Minimum 8 characters', pattern: lengthRegex, id: 3 },
    { label: 'One special Character', pattern: specialCharactersRegex, id: 4 },
  ];
  return (
    <div>
      <h3 className="mb-4">Password requirements:</h3>
      {rules.map((rule) => {
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
  );
}

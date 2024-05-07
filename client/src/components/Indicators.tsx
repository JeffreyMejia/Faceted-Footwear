import { FaDotCircle, FaRegDotCircle } from 'react-icons/fa';

type Props = {
  count: number;
  current: number;
  thisIsCurrent: (current: number) => void;
};

export function Indicators({ count, current, thisIsCurrent }: Props) {
  const indicators: any = [];

  for (let i = 0; i < count; i++) {
    indicators.push(
      current === i ? (
        <FaDotCircle
          className="text-primary mx-5 cursor-pointer hover:scale-105 transition"
          key={i}
          onClick={() => thisIsCurrent(i)}
        />
      ) : (
        <FaRegDotCircle
          className="text-primary mx-5 cursor-pointer hover:scale-105 transition"
          key={i}
          onClick={() => thisIsCurrent(i)}
        />
      )
    );
  }
  return <div className="flex mb-5">{indicators}</div>;
}

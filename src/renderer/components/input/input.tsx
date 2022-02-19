import './input.css';

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  value: string;
  onChange?: (e: any) => void;
};

function Input(rest: InputProps) {
  return (
    <label htmlFor="inp" className="inp">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...rest} />
      <svg width="280px" height="18px" viewBox="0 0 280 18" className="border">
        <path d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12" />
      </svg>
    </label>
  );
}

export default Input;

export type InputPropsType = {
  id?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  regexp?: string;
  isValid?: boolean;
  onBlur: (event: InputEvent) => void;
  onKeyUp: (event: InputEvent) => void;
};

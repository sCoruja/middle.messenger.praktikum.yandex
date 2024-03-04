export function regExpValidation(value: string, regexp: string | RegExp) {
  const regExp = new RegExp(regexp);
  return regExp.test(value);
}
export const lengthValidation = (str: string, min: number, max: number) => {
  return str.length >= min && str.length <= max;
};
export const requiredValidation = (str: string) => !!str;
export const equalValidation = (str: string, str2: string) => str === str2;

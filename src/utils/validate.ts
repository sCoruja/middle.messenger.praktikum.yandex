export function validateInput(value: string, regexp: string) {
  const regExp = new RegExp(regexp);
  return regExp.test(value);
}

export const transformMobileNumber = (number: string) => {
  if (!number) return '';

  number = number.trim();

  if (number.startsWith('+')) number = number.slice(1);
  if (number.startsWith('233')) number = number.slice(3);

  if (number.startsWith('0')) {
    if (number.length === 10) return '233' + number.slice(1);
    else return '';
  }

  if (number.length === 9) return '233' + number;

  return '';
};

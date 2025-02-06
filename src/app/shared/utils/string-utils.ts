/**
 * @description esta funcion sirve para  cambiar la primera letra de cada string a mayuscula y el resto de las letras a minuscula. en principio se usa para formilzar la presentacion de el/los nombre/s y apellido/s
 * @param s
 * @returns
 */
export function capitalize(s: string): string {
  if (!s) return '';
  return s
    .split(' ')
    .filter((word) => word.trim().length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getNormalizedFullName(student: {
  name: string;
  lastName: string;
}): string {
  return `${capitalize(student.name)} ${capitalize(student.lastName)}`.trim();
}

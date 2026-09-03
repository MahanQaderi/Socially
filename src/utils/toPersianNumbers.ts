const farsiDigits: string[] = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
];

export function toPersianNumbersWithComma(n: number): string {
  const numWithCommas: string = numberWithCommas(n);
  const persianNumber: string = toPersianNumbers(numWithCommas);

  return persianNumber;
}

function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPersianNumbers(n: number | string): string {
  return n.toString().replace(/\d/g, (x: string) => {
    return farsiDigits[parseInt(x, 10)];
  });
}
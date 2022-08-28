export class RegExp {
  static operatorMatching(input: string ) {
    return input.match("^[+-/=\*?]+$");
  }
  static numbersMatching(input: string ) {
    return input.match("^[0-9\.]+$");
  }
}

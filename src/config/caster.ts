export class Caster {
  public static asString(value: string): string {
    return value;
  }

  public static asInteger(value: string): number {
    const result = Number(value);
    if (!Number.isInteger(result) || isNaN(result)) {
      throw new TypeError('invalid integer value provided');
    }
    return result;
  }

  public static asBoolean(value: string): boolean {
    return value === 'true';
  }

  // Expects comma separated values, e.g. "a,b,c"
  public static asList(value: string): string[] {
    return value.split(',');
  }
}

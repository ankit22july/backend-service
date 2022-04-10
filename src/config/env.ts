import { Caster } from './caster';
import { InvalidConfigurationError } from './errors';

export class Env {
  private static required<T>(name: string, value?: T, defaultValue?: T): T {
    if (value === undefined && defaultValue === undefined) {
      throw new InvalidConfigurationError(`missing environment variable: ${name}`);
    }
    return value === undefined ? defaultValue! : value!;
  }

  public static asBoolean(name: string, defaultValue: string): boolean {
    return Caster.asBoolean(this.required(name, process.env[name], defaultValue));
  }

  public static asString(name: string, defaultValue?: string): string {
    return Caster.asString(<string>this.required(name, process.env[name], defaultValue));
  }

  public static asInteger(name: string, defaultValue?: string): number {
    try {
      return Caster.asInteger(<string>this.required(name, process.env[name], defaultValue));
    } catch (error) {
      if (error instanceof TypeError) {
        throw new InvalidConfigurationError(`${error.message} for variable: ${name}`);
      }
      throw error;
    }
  }

  public static asList(name: string, defaultValue?: string): string[] {
    return Caster.asList(this.required(name, process.env[name], defaultValue));
  }
}

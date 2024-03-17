type StringConstraints = string;
type AllowString<T extends StringConstraints> = T;

type NumberConstraints = number;
type AllowNumber<T extends NumberConstraints> = T;

type CreateLoggerConstraints = (arg: number) => void;
type CreateLogger<T extends CreateLoggerConstraints> = {
  log: T;
  exit: () => void;
};

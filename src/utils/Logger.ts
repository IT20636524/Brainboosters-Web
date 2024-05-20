export const log = (...params: any) => {
  const NODE_ENV: string = process.env.NODE_ENV ?? "production";
  if (NODE_ENV === "development") console.log(...params);
};

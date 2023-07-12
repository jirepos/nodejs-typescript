
declare module 'dayjs' {
  interface DayJs {
  }

  interface DayJsConstructor {
      new (): DayJs;
  }

  let k: DayJsConstructor;
  export = k;
}
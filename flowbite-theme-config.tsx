import { CustomFlowbiteTheme } from 'flowbite-react';

export const brainboostersTheme: CustomFlowbiteTheme = {
  tooltip: {
    arrow: {
      style: {
        light: "border-b border-r border-gray-200 bg-white",
      },
    },
  },
  textInput: {
    field: {
      input: {
        colors: {
          primary:
            "appearance-none bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-2 focus:border-primary-500 focus:ring-0",
          failure:
            "appearance-none bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:outline-none focus:border-2 focus:border-red-500 focus:ring-0",
        },
      },
    },
  },
  checkbox: {
    root: {
      base: "h-4 w-4 rounded focus:ring-2 border border-gray-300",
      color: {
        primary: "focus:ring-primary-500 text-primary-600",
      },
    },
  },
  button: {
    outline: {
      color: {
        gray: "group bg-transparent border-gray-200 enabled:hover:bg-gray-500 focus-within:!ring-primary-300 active:!ring-primary-300 focus:ring-2",
        purple:
          "group bg-transparent border-indigo-400 enabled:hover:bg-indigo-100 focus-within:!ring-primary-300 active:!ring-primary-300 focus:ring-2",
      },
    },
    color: {
      failure:
        "text-white bg-red-500 border border-transparent enabled:hover:bg-red-600 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:enabled:hover:bg-red-600 dark:focus:ring-red-900",
      primary:
        "bg-primary-500 enabled:hover:bg-primary-600 focus-within:!ring-primary-300 active:!ring-primary-300 text-white focus:ring-2",
    },
  },
  datepicker: {
    popup: {
      root: {
        base: "fixed z-50 block pt-2",
      },
    },
  },
  modal: {
    content: {
      inner:
        "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90dvh] overflow-auto",
    },
  },
};

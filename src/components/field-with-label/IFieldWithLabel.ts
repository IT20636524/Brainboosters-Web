import { TextInputProps } from 'flowbite-react';

interface IFieldWithLabel {
  label: string;
  name: string;
  textInputProps?: TextInputProps;
  suffix?: string;
  register?: any;
  validation?: any;
  extras?: string;
  errors?: any;
}

export default IFieldWithLabel;

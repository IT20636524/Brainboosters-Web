interface IFieldWithSelect
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  register?: any;
  errors?: any;
  optionList: any[];
  validations?: any;
}

export default IFieldWithSelect;

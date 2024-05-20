import { Label, Select } from 'flowbite-react';
import React from 'react';
import getFieldStatusColor from '@utils/FormFieldHelper';
import IFieldWithSelect from './IFieldWithSelect';

const FieldWithSelect = ({
  label,
  register,
  errors,
  validations,
  optionList,
  ...rest
}: IFieldWithSelect) => {
  return (
    <label htmlFor={rest.name} className="w-full">
      {label && (
        <Label htmlFor={rest.name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Select
        {...register(rest.name, validations)}
        color={getFieldStatusColor(errors, rest.name)}
        helperText={errors && errors[rest.name ?? ""]}
        {...rest}
      >
        {optionList.map((item) => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </label>
  );
};

export default FieldWithSelect;

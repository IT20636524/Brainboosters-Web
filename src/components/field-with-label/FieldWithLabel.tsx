import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import IFieldWithLabel from './IFieldWithLabel';

const FieldWithLabel = ({
  label,
  name,
  textInputProps,
  suffix,
  register,
  validation,
  extras,
  errors
}: IFieldWithLabel) => {
  return (
    <div>
      <Label className="!text-black" htmlFor={name}>
        {label}
      </Label>
      <div className="flex gap-2 items-center w-full">
        <div className="w-full">
          <TextInput
            {...register(name, validation)}
            {...textInputProps}
            className={["w-full", `${extras}`].join(" ")}
            id={name}
            helperText={errors && errors[name ?? ""]?.message}
          />
        </div>
        {suffix && <div className="text-gray-500 text-sm">{suffix}</div>}
      </div>
    </div>
  );
};

export default FieldWithLabel;

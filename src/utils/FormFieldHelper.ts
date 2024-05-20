const getFieldStatusColor = (errors: any, fieldName: any) => {
  if (errors) {
    return errors[fieldName] ? 'failure' : 'primary';
  } else return 'primary';
};

export default getFieldStatusColor;

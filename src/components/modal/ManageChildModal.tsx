"use client";

import FieldWithLabel from "@components/field-with-label/FieldWithLabel";
import { ChildModalType } from "@enums/ModalType";
import { childStore, modalStore } from "@stores/StoreInitializer";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

interface ChildDetails {
  childName: string;
}

const ManageChildModal = () => {
  const { isOpen, title } = modalStore;
  function onCloseModal() {
    modalStore.setIsOpen(false);
  }

  const initialValues: ChildDetails = {
    childName: "",
  };

  const onSubmit = (values: ChildDetails) => {
    console.log(values);
    if (modalStore.title === ChildModalType.ADD_CHILD_PROFILE) {
      childStore.addChildren(values);
    } else {
      childStore.editChildren(values);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnChange: true,
    validationSchema: null,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldTouched,
  } = formik;

  return (
    <>
      <Modal show={isOpen} size="md" onClose={onCloseModal} popup>
        <Modal.Header>
          <div>{title}</div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <FieldWithLabel
              label="Child Name"
              name="childName"
              register={null}
              validation={null}
              textInputProps={{
                onChange: handleChange,
                value: values.childName,
              }}
              extras="!border-0"
            />
            <FieldWithLabel
              label="Age"
              name="age"
              register={null}
              validation={null}
              textInputProps={{
                onChange: handleChange,
                value: values.childName,
              }}
              extras="!border-0"
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default observer(ManageChildModal);

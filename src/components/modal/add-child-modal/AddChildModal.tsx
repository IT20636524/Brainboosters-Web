"use client";

import { Button, Modal, Radio, Table } from 'flowbite-react';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FieldWithLabel from '@components/field-with-label/FieldWithLabel';
import FieldWithSelect from '@components/field-with-select/FieldWithSelect';
import { requiredField } from '@constants/FormValidation';
import { snap4Questions } from '@constants/SnapIV';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { modalStore } from '@stores/StoreInitializer';
import axios from 'axios';
import { variables } from 'src/env/env';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;  // Add email field
  gender: string;
  age: number;
  snapIVRecord: number[];
}

const AddChildModal = () => {
  const { isOpen } = modalStore;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const parentId = 'yourParentId'; // Replace with actual parentId
    const snapIVRecord = snap4Questions.map((item) => parseInt(watch(`answer${item.id}`)) || 0);
    const childData = { 
      name: `${data.firstName} ${data.lastName}`,  // Combine first and last name for the `name` field
      age: data.age,
      email: data.email,
      snapIVRecord,
      gender: data.gender,
      parentId  // Add parentId
    };

    try {
      const response = await axios.post(`${variables.server}/api/child/${parentId}`, childData);
      console.log("Child created successfully:", response.data);
      modalStore.setIsOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error creating child:", error);
    }
  };

  const genderList = [{ label: "Male" }, { label: "Female" }];

  function onCloseModal() {
    modalStore.setIsOpen(false);
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps: Step[] = [
    {
      title: "General Details",
      content: (
        <div className="flex flex-col gap-4">
          <FieldWithLabel
            label="First Name"
            name="firstName"
            extras="!border-0"
            register={register}
            validation={requiredField}
            errors={errors}
          />
          <FieldWithLabel
            label="Last Name"
            name="lastName"
            extras="!border-0"
            register={register}
            validation={requiredField}
            errors={errors}
          />
          <FieldWithLabel
            label="Email"
            name="email"  // Email field
            extras="!border-0"
            register={register}
            validation={requiredField}
            errors={errors}
          />
          <FieldWithSelect
            label="Gender"
            name="gender"
            register={register}
            errors={errors}
            required
            optionList={genderList}
          />
          <FieldWithLabel
            label="Age"
            name="age"
            extras="!border-0"
            register={register}
            validation={requiredField}
            errors={errors}
          />
        </div>
      ),
    },
    {
      title: "SNAP IV",
      content: (
        <div>
          <Table>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Not at all</Table.HeadCell>
              <Table.HeadCell>Just a little</Table.HeadCell>
              <Table.HeadCell>Quite a bit</Table.HeadCell>
              <Table.HeadCell>Very much</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {snap4Questions.map((item) => (
                <Table.Row key={item.id} className="border-b text-center">
                  <Table.Cell className="text-start">
                    {item.question}
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      id={`not-at-all-${item.id}`}
                      name={`answer${item.id}`}
                      value={0}
                      defaultChecked
                      {...register(`answer${item.id}`, { required: true })}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      id={`just-a-little-${item.id}`}
                      name={`answer${item.id}`}
                      value={1}
                      {...register(`answer${item.id}`, { required: true })}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      id={`quite-a-bit-${item.id}`}
                      name={`answer${item.id}`}
                      value={2}
                      {...register(`answer${item.id}`, { required: true })}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio 
                      id={`very-much-${item.id}`} 
                      name={`answer${item.id}`} 
                      value={3} 
                      {...register(`answer${item.id}`, { required: true })} 
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <>
      <Modal
        show={isOpen}
        size="7xl"
        onClose={onCloseModal}
        popup
        className="overflow-auto"
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="border-b bg-primary-100">
            <div className="ml-4 mt-2">{currentStepData.title}</div>
          </Modal.Header>
          <Modal.Body className="mt-4">{currentStepData.content}</Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-between">
              {currentStep > 1 && (
                <Button onClick={handlePrevious} size="xs" color="primary">
                  <ChevronLeftIcon className="h-3 w-3 mr-2" />
                  Previous
                </Button>
              )}
              {currentStep < steps.length && (
                <Button onClick={handleNext} size="xs" color="primary">
                  Next
                  <ChevronRightIcon className="h-3 w-3 ml-2" />
                </Button>
              )}
              {currentStep === steps.length && (
                <Button type="submit" size="xs" color="primary">
                  Submit
                </Button>
              )}
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default observer(AddChildModal);

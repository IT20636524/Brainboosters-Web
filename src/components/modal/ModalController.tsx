"use client";

import { observer } from 'mobx-react-lite';
import React from 'react';
import { ChildModalType } from '@enums/ModalType';
import { modalStore } from '@stores/StoreInitializer';
import AddChildModal from './add-child-modal/AddChildModal';
import StepModal from './add-child-modal/Test';
import ManageChildModal from './ManageChildModal';

const ModalController = () => {
  const { title } = modalStore;
  const renderModal = () => {
    switch (title) {
      case ChildModalType.ADD_CHILD_PROFILE:
        return <AddChildModal />;
      case ChildModalType.EDIT_CHILD_PROFILE:
        return <ManageChildModal />;
    }
  };
  return <>{renderModal()}</>;
};

export default observer(ModalController);

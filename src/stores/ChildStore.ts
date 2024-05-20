import { action, makeObservable, observable } from "mobx";
import data from "@utils/data/info-card.json";
import { IChild } from "@interfaces/models/IUser";
class ChildStore {
  children: Array<IChild> = data;
  selectedChild: any = null;

  constructor() {
    makeObservable(this, {
      children: observable,
      selectedChild: observable,
      setChildren: action,
      setSelectedChild: action,
      addChildren: action,
      editChildren: action,
    });
  }

  setChildren(children: Array<IChild>) {
    this.children = children;
  }
  setSelectedChild(selectedChild: IChild) {
    this.selectedChild = selectedChild;
  }
  addChildren(child: IChild) {
    this.children.push(child);
  }
  editChildren(child: IChild) {
    this.children = this.children.map((item: any) => {
      item.id === child.id ? child : item;
    });
  }
}

export default ChildStore;

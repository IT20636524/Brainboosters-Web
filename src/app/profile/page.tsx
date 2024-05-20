import ModalController from "@components/modal/ModalController";
import { childStore } from "@stores/StoreInitializer";
import InfoCardCollection from "@components/info-card-collection/InfoCardCollection";

export default function Children() {
  const { children } = childStore;
  return (
    <div className="px-10 mt-6">
      <div className="font-bold text-2xl mb-4">Manage Children</div>
      <InfoCardCollection />
      <ModalController />
    </div>
  );
}

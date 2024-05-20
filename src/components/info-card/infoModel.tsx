import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  snaps: number[];
}

const PredictionModal: React.FC<PredictionModalProps> = ({ isOpen, onClose, snaps }) => {
  const [prediction, setPrediction] = useState<{ predicted_problem: string; has_ood: boolean } | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        console.log(snaps.snapIVRecord)
        const response = await axios.post("http://localhost:8000/predict", {
          user_record: snaps.snapIVRecord
        });
        setPrediction(response.data);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    if (isOpen) {
      fetchPrediction();
    }
  }, [isOpen, snaps]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        Prediction Results
      </Modal.Header>
      <Modal.Body>
        {prediction ? (
          <div>
            <h3 className="text-xl font-semibold">Predicted Problem: {prediction.predicted_problem}</h3>
            <p className="text-gray-700 mt-2">{prediction.has_ood ? "Out-of-distribution behavior detected." : "No out-of-distribution behavior detected."}</p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Instructions on ADHD</h4>
              <p className="text-gray-700">
                ADHD, or Attention Deficit Hyperactivity Disorder, is a condition that affects an individual's ability to focus and control impulses. 
                Managing ADHD often involves a combination of behavioral strategies, support, and sometimes medication. 
                It is important to work closely with healthcare providers to determine the best plan for managing symptoms.
              </p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PredictionModal;

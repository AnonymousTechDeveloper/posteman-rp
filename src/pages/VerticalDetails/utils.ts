import { VERTICAL_NAMES } from "./constants";
import { VerticalData } from "./types";

export const getVerticalName = (verticalId: string): string => {
  return (
    VERTICAL_NAMES[verticalId as keyof typeof VERTICAL_NAMES] || verticalId
  );
};

export const createMockVerticalData = (verticalId: string): VerticalData => {
  return {
    id: verticalId,
    name: getVerticalName(verticalId),
    icon: verticalId,
    currentRound: 2,
    task: `
      <div class="p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Round 2 Task: Build a Machine Learning Model</h2>
        <div class="space-y-4">
          <p class="text-gray-600">Create a machine learning model that can classify images of cats and dogs.</p>
          <h3 class="text-lg font-semibold text-gray-800">Requirements:</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Use Python and any ML framework (TensorFlow, PyTorch, or scikit-learn)</li>
            <li>Achieve at least 85% accuracy on the test set</li>
            <li>Include proper data preprocessing and visualization</li>
            <li>Document your approach and results</li>
          </ul>
          <h3 class="text-lg font-semibold text-gray-800">Dataset:</h3>
          <p class="text-gray-600">Use the CIFAR-10 dataset or any publicly available cat/dog dataset.</p>
          <h3 class="text-lg font-semibold text-gray-800">Submission:</h3>
          <p class="text-gray-600">Submit your code via GitHub repository with a detailed README.</p>
        </div>
      </div>
    `,
    applicationStatus: "applied",
    submissionDeadline: "2024-03-25T23:59:59Z",
  };
};

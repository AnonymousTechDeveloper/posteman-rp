import { VERTICAL_NAMES } from "./constants";
import { VerticalData } from "./types";

export const getVerticalName = (verticalId: string): string => {
  return (
    VERTICAL_NAMES[verticalId as keyof typeof VERTICAL_NAMES] || verticalId
  );
};

export const createMockVerticalData = (verticalId: string): VerticalData => {
  const verticalTasks: Record<string, string> = {
    backend: `
      <h3>Backend Development Challenge</h3>
      <p>Build a robust <strong>RESTful API</strong> using <em>Node.js and Express</em> with the following features:</p>
      <ul>
        <li>User authentication and authorization</li>
        <li>Data validation and error handling</li>
        <li>Database integration (MongoDB or PostgreSQL)</li>
        <li>API documentation with Swagger</li>
        <li>Unit and integration tests</li>
      </ul>
      <p><strong>Tech Stack:</strong> Node.js, Express, MongoDB/PostgreSQL, JWT, Jest</p>
    `,
    frontend: `
      <h3>Frontend Development Challenge</h3>
      <p>Create a modern <strong>React application</strong> with the following requirements:</p>
      <ul>
        <li>Responsive design for all screen sizes</li>
        <li>State management with Redux or Context API</li>
        <li>API integration and data fetching</li>
        <li>Component reusability and clean code</li>
        <li>Performance optimization</li>
      </ul>
      <p><strong>Tech Stack:</strong> React, TypeScript, Tailwind CSS, Vite</p>
    `,
    "ai-ml": `
      <h3>AI/ML Challenge</h3>
      <p>Develop a <strong>machine learning model</strong> for image classification:</p>
      <ul>
        <li>Data preprocessing and augmentation</li>
        <li>Model training and validation</li>
        <li>Performance evaluation and metrics</li>
        <li>Model deployment and API creation</li>
        <li>Documentation and visualization</li>
      </ul>
      <p><strong>Tech Stack:</strong> Python, TensorFlow/PyTorch, scikit-learn, OpenCV</p>
    `,
    design: `
      <h3>UI/UX Design Challenge</h3>
      <p>Create a comprehensive <strong>design system</strong> for a mobile application:</p>
      <ul>
        <li>Color palette and typography</li>
        <li>Component library and style guide</li>
        <li>User flow diagrams and wireframes</li>
        <li>Interactive prototypes</li>
        <li>Accessibility considerations</li>
      </ul>
      <p><strong>Tools:</strong> Figma, Adobe XD, or Sketch</p>
    `,
    gamedev: `
      <h3>Game Development Challenge</h3>
      <p>Build an interactive <strong>2D game</strong> with the following features:</p>
      <ul>
        <li>Player movement and controls</li>
        <li>Game mechanics and physics</li>
        <li>Level design and progression</li>
        <li>Sound effects and music</li>
        <li>Score system and UI</li>
      </ul>
      <p><strong>Tech Stack:</strong> Unity, Godot, or HTML5 Canvas</p>
    `,
    neurotech: `
      <h3>NeuroTech Challenge</h3>
      <p>Develop a <strong>brain-computer interface</strong> prototype:</p>
      <ul>
        <li>EEG signal processing and analysis</li>
        <li>Real-time data visualization</li>
        <li>Machine learning for pattern recognition</li>
        <li>User interface for interaction</li>
        <li>Data analysis and insights</li>
      </ul>
      <p><strong>Tech Stack:</strong> Python, OpenBCI, MNE-Python, PyQt/Tkinter</p>
    `,
    events: `
      <h3>Events Management Challenge</h3>
      <p>Build a comprehensive <strong>event management platform</strong>:</p>
      <ul>
        <li>Event creation and management</li>
        <li>Attendee registration and ticketing</li>
        <li>Payment processing integration</li>
        <li>Analytics dashboard</li>
        <li>Mobile-responsive design</li>
      </ul>
      <p><strong>Tech Stack:</strong> React, Node.js, Stripe API, MongoDB</p>
    `,
  };

  return {
    id: verticalId,
    name: getVerticalName(verticalId),
    icon: verticalId,
    currentRound: 2,
    task: verticalTasks[verticalId] || verticalTasks.backend,
    applicationStatus: "applied",
    submissionDeadline: "2024-03-25T23:59:59Z",
  };
};

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  
export const recognition = new SpeechRecognition();

recognition.continuous = true; 
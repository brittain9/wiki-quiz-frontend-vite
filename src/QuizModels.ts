export interface QuizQuestion {
    text: string;
    options: string[];
    correctAnswerIndex: number;
  }
  
export interface QuestionResponse {
    responseTopic: string;
    topicUrl: string;
    promptTokenUsage: number;
    completionTokenUsage: number;
    questions: QuizQuestion[];
}

export interface QuizData {
    title: string;
    questionResponses: QuestionResponse[];
}
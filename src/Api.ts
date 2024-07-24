import axios, { AxiosError } from 'axios';
import { QuizData } from './QuizModels';

const API_URL = 'http://localhost:5543';

export const generateQuiz = async (topic: string): Promise<QuizData> => {
  try {
    console.log('Sending request to:', `${API_URL}/Quiz/GenerateBasicQuiz`);
    console.log('Topic:', topic);

    const response = await axios.get<QuizData>(`${API_URL}/Quiz/GenerateBasicQuiz`, {
      params: { topic }
    });

    console.log('Response:', response.data);
    return response.data;
  } 
  catch (error) {
    console.error('Error generating quiz:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error data:', axiosError.response.data);
        console.error('Error status:', axiosError.response.status);
        console.error('Error headers:', axiosError.response.headers);

        if (axiosError.response.status === 400) {
          throw new Error('Invalid topic');
        }
      } else if (axiosError.request) {
        console.error('Error request:', axiosError.request);
      } else {
        console.error('Error message:', axiosError.message);
      }
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('An unknown error occurred');
    }

    throw error;
  }
}
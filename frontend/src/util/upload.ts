import api from '../services/api';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('upload', file);
  const response = await api.post('/uploads', formData);

  return response.data.url;
};

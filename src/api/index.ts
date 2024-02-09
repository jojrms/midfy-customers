import axios from 'axios';

const baseUrl = 'https://65c4bed0dae2304e92e33fb7.mockapi.io/v1/';

export const getCustomers = async () => {
    try {
      const {data: customer} = await axios.get(`${baseUrl}/customers`);
      return customer;
    } catch (error) {
      throw error;
    }
};

export const deleteCustomer = async (id: number | string) => {
  try {
    const {data: customer} = await axios.delete(`${baseUrl}/customers/${id}`);
    return customer;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (id: string | number, customerValues: any) => {
  try{
    const formData = new FormData();
    formData.append('name', customerValues.name);
    formData.append('email', customerValues.email);
    formData.append('avatar', customerValues.avatar);

    const response = await axios.put(`${baseUrl}/customers/${id}`, formData);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const createNewCustomer = async (customerValues: any) => {
  try{
    const formData = new FormData();
    formData.append('name', customerValues.name);
    formData.append('email', customerValues.email);
    formData.append('avatar', customerValues.avatar);

    const response = await axios.post(`${baseUrl}/customers/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};
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
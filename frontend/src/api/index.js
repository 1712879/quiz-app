import axios from 'axios';
import { stringify, parse } from 'query-string';
const BASE_API = 'http://localhost:3001'

const API = async ({
  url,
  params = '',
  method = 'get',
  data = {},
  ...props
}) => {
  const newParams = parse(stringify(params, { arrayFormat: 'comma' }));
  try {
    const response = await axios({
      method,
      url: `${BASE_API}${url}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...props,
      params: newParams,
      data,
    });

    return response && response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default API;

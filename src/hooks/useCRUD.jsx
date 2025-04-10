import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useCRUD = initialUrl => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the hook is first called
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(initialUrl);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [initialUrl]);

  useEffect(() => {
    if (initialUrl) fetchData();
  }, [initialUrl, fetchData]);

  // Create or update data
  const saveData = async (url, method, data, headers = {}) => {
    setLoading(true);

    try {
      const config = {
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      const response = await axios(config);

      fetchData();
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async url => {
    setLoading(true);
    try {
      await axios.delete(url);
      fetchData();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const readItem = async url => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    deleteData,
    error,
    fetchData,
    loading,
    readItem,
    saveData
  };
};

export default useCRUD;
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const useCRUD = (initialUrl, initialHeaders = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usar useMemo para que no cambie la referencia de headers en cada render
  const memoizedHeaders = useMemo(() => initialHeaders, []);

  const fetchData = useCallback(async (additionalHeaders = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(initialUrl, {
        headers: {
          ...memoizedHeaders,
          ...additionalHeaders
        }
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [initialUrl, memoizedHeaders]);

  useEffect(() => {
    if (initialUrl) fetchData();
  }, [initialUrl, fetchData]);

  const saveData = async (url, method, data, additionalHeaders = {}) => {
    setLoading(true);
    try {
      const config = {
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          ...memoizedHeaders,
          ...additionalHeaders
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

  const deleteData = async (url, additionalHeaders = {}) => {
    setLoading(true);
    try {
      await axios.delete(url, {
        headers: {
          ...memoizedHeaders,
          ...additionalHeaders
        }
      });
      fetchData();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const readItem = async (url, additionalHeaders = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          ...memoizedHeaders,
          ...additionalHeaders
        }
      });
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

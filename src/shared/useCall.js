import { useState, useEffect } from "react";

class Result {
  constructor(name, defaultValue) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.data = {};
    this.data[name] = {
      isLoading: false,
      error: undefined,
      data: defaultValue,
    };
  }
  setLoading(loading, defaultValue) {
    this.data[this.name].isLoading = loading;
    if (!this.data[this.name].data) {
      this.data[this.name].data = defaultValue;
    }
    return this.data[this.name];
  }
  setData(data) {
    this.data[this.name].isLoading = false;
    this.data[this.name].data = data;
    this.data[this.name].error = undefined;
    return this.data[this.name];
  }
  setError(error) {
    this.data[this.name].isLoading = false;
    this.data[this.name].data = this.defaultValue;
    this.data[this.name].error = {
      errorMessage: "Application Error",
      description: error,
    };
    return this.data[this.name];
  }
  getState() {
    return this.data[this.name];
  }
}

export default function useCall(callBack, param = [], defaultValue) {
  const result = new Result(useCall.name, defaultValue);
  const [data, setData] = useState(null);
  useEffect(() => {
    let isRendered = true;
    (async () => {
      if (callBack && typeof callBack === "function") {
        try {
          data && setData(null);
          const response = await callBack();
          if (response) {
            if (response.json) {
              const data = await response.json();
              isRendered && setData(result.setData(data || defaultValue));
            } else {
              isRendered &&
                setData(result.setData(response.data || defaultValue));
            }
          } else {
            isRendered && setData(result.setLoading(false, defaultValue));
          }
        } catch (error) {
          console.log(error);
          isRendered && setData(result.setError(error));
        }
      } else if (callBack && typeof callBack) {
        isRendered && setData(callBack);
      } else {
        isRendered && setData(defaultValue);
      }
    })();
    return () => {
      isRendered = false;
    };
  }, [...param]);

  return data || result.setLoading(true, defaultValue);
}

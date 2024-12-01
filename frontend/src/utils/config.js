const getconfig = () => {
  const getTokenFromLocalStorage = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  return {
    headers: {
      authorization: `${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
      }`,
      Accept: "application/json",
    },
  };
};

export default getconfig;

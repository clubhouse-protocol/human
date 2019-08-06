import useDB from "./useDB";

const useIdentity = () => {
  const { identity } = useDB();

  return identity;
};

export default useIdentity;

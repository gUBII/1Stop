import { useNavigate, createSearchParams, } from 'react-router-dom';

const useSearch = () => {
    const navigate = useNavigate();
    
    return (pathname, params) =>
      navigate({ pathname, search: `?${createSearchParams(params)}` }, {state: params});
  };

export default useSearch
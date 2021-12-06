import { useLocation } from "react-router-dom";
function useQuery() {
  console.log("in the hook ", useLocation().search);
  return new URLSearchParams(useLocation().search);
}
export default useQuery;

import { useState, useRef } from "react";
import useQuery from "./useQuery";

const useAffId = () => {
  let query = useQuery();
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  const affiliateId = useRef(query.get("aff_id") || parsedHash.get("aff_id"));
  const [affId, setAffId] = useState(affiliateId.current);
  return [affId, setAffId];
};
export { useAffId };

import React from "react";
import { useQuery } from "react-apollo-hooks";
import GET_BILLS_QUERY from "../../graphql/query/getBills.gql";

import Bills from "./Bills";

function BillsContainer() {
  const { data, loading, error } = useQuery(GET_BILLS_QUERY);
  if (loading) {
    return <p>Loading Bills...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  const bills = data.getBills;
  return <Bills bills={bills} />;
}

export default BillsContainer;

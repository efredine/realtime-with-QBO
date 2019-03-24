import { useQuery } from "react-apollo-hooks";
import GET_CURRENT_USER_QUERY from "../graphql/query/getCurrentUser.gql";

export default function useCurrentUser() {
  const queryResult = useQuery(GET_CURRENT_USER_QUERY);
  const { data } = queryResult;
  const currentUser = data && data.currentUser;
  return { ...queryResult, currentUser };
}

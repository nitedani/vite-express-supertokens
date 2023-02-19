import { useQuery } from "@tanstack/react-query";
import { withProtection } from "client/components/withProtection";
import { withSuspense } from "client/components/withSuspense";
import { getPost } from "shared/api.telefunc";

export const ProtectedPage = withProtection(
  "pages:protected",
  withSuspense(() => {
    const { data } = useQuery(["getPost"], () => getPost("some-post-id"));
    return <div>protected page {data}</div>;
  }),
  () => <div>Unauthorized...</div>
);

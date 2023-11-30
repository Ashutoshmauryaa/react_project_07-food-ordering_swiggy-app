import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h1>Oops......</h1>
      {err ? (
        <div>
          <h2>
            {err.status}: {err.statusText}
          </h2>
          <h2>{err.data}</h2>
        </div>
      ) : (
        <div>
          <h2>404: Not Found</h2>
          <h2>There is problem is data fetching</h2>
        </div>
      )}
    </div>
  );
};
export default Error;

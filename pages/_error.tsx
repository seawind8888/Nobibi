import {  NextPageContext } from 'next';
import ErrorPage from '../components/ErrorPage';

interface ErrorProps {
  statusCode: number
}

const Error = (props: ErrorProps) =>  {
    return (
      <ErrorPage statusCode={props.statusCode || 200} />
    );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
}

export default Error
import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../components/ErrorPage';

interface initProps {
  statusCode: number
}

const Error = (props: initProps) =>  {
    return (
      <ErrorPage statusCode={props.statusCode || 200} />
    );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
}

export default Error
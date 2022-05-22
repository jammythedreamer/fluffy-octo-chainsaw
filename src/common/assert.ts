export function error(err) {
  if (err) {
    return {
      error: err
    };
  }
}

export function errorWithErrorCode(err, errorCode) {
  return {
    error: errorCode
  }
}

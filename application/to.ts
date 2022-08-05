export default <T>(promise: Promise<T>) => {
  return promise.then(data => <[null, T]>[null, data]).catch(err => <[Error, null]>[err, null]);
}
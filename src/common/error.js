// * 自定义错误
export default function CustomError(error) {
  const { data } = error.response;

  this.code = data.code;
  this.message = data.message;
  this.details = data.details;
}

const checkBody = (data) => Object.keys(data).length == 0;

const checkName = value => /^[a-zA-Z ]{2,20}$/.test(value);

const checkUserName = value => /^[a-zA-Z0-9._]+$/ .test(value);

const checkDate = value => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value);

const checkEmail = value => /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value);

const checkPhone = value => /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)

const checkpassword = value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(value)

const checkgender = value => ['male','female','other'].some(ele => ele == value)


module.exports = { checkBody ,checkName ,checkDate,checkEmail,checkPhone,checkUserName,checkgender,checkpassword}
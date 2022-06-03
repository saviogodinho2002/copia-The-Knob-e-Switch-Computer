const comandSet = [
    ["add", "sub", "div", "mul", "or", "and"],
    ["move", "load", "store", "not"],
    ["branch", "bzero", "bneg"],
    ["halt","nop"]
];

const regExpSyntaxValidation = [
    "^\\s*([a-zA-Z]{2,3})\\s+(R[0]*[0-3]{1})\\s+(R[0]*[0-3]{1})\\s+(R[0]*[0-3]{1})\\s*$",
    ["([a-zA-Z]{4}\\s+R[0-3]\\s+[0-9]{1,2})", "[a-zA-Z]\\s+([0-9]{1,2}\\s+R[0-3])", "([a-zA-Z]{3,4}\\s+R[0-3]\\s+R[0-3])", "([a-zA-Z]{3}\\s+R[0-3]\\s+[0-9]{1,2})"],
    "^\\s*([a-zA-Z]{3,6})\\s+[0]*(([0-9])|([0-2][0-9])|([3][0-1]))\\s*$",
    "^\\s*([a-zA-Z]{3,5})\\s*$"
];
const regExpCatchComand = [
    "([a-zA-Z]{2,3})",
    "([a-zA-Z]{3,5})",
    "([a-zA-Z]{3,6})",
    "([a-zA-Z]{3,4})"

];

const regExpCatchParamters = [
    "([0]*[0-3]{1})",
    "([0-9]{1,2})",
    "([0-9]{1,2})"

];

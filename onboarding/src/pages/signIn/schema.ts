import * as yup from "yup";
export const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식이 아닙니다.")
    .required("이메일은 필수사항입니다."),
  password: yup
    .string()
    .min(8, "8자 이상 입력하세요")
    .required("비밀번호는 필수사항입니다.")
   
});

import * as s from './signup.style'
import axios from 'axios';
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './schema';
import { useNavigate } from 'react-router-dom';

interface FormValue {
  email: string,
  password: string
}

export default function Signup(){
  const navigate = useNavigate()

  const { register, handleSubmit,  formState } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });


  const createAccount = async (data: any)=>{
   
    const value = {
      email: data.email,
      password: data.password
    }
 
    
    try{
      if (!data) return
      const response = await axios.post(
        'https://pre-onboarding-selection-task.shop/auth/signup', 
        JSON.stringify(value),
        {
          headers:{
            "Content-Type": "application/json"
          }
        })
        if(response){
          alert("회원가입되었습니다.")
          navigate('/');
        }
    }catch(error){console.log(error)}
  }
  
    return(
        <s.Wrapper>
          <s.Main>
            <s.Text>회원가입</s.Text>
            <s.InputWrappers>
            <form onSubmit={handleSubmit(createAccount)}>
              <s.InputWrapper>
                <s.Text>이메일</s.Text>
                <s.Input {...register("email")}/>
                <s.Text>{formState.errors.email?.message}</s.Text>
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Text>비밀번호</s.Text>
                <s.Input {...register("password")}/>
                <s.Text>{formState.errors.password?.message}</s.Text>
              </s.InputWrapper>
              <s.Button onClick={createAccount} disabled={formState.isValid ? false : true}>로그인</s.Button>
            </form>
            </s.InputWrappers>

          </s.Main>

        </s.Wrapper>
    )
}
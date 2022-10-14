import * as s from './signin.style'
import axios from 'axios';
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from '../signup/schema';
import { useNavigate } from 'react-router-dom';
export default function Signin(){

  const navigate = useNavigate()


  interface FormValue {
    email: string,
    password: string
  }

  const { register, handleSubmit,  formState } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });


  const onClickSignin = async (data: any)=>{
   
    const value = {
      email: data.email,
      password: data.password
    }
 
    
    try{
      if (!data) return
      const response = await axios.post(
        'https://pre-onboarding-selection-task.shop/auth/signin', 
        JSON.stringify(value),
        {
          headers:{
            "Content-Type": "application/json"
          }
        })
        console.log(response.data)
        if(response.data){
          localStorage.setItem('accessToken', response.data.access_token);
          navigate('/todo');
        } 
    }catch(error){console.log(error)}
  }
    return(
        <s.Wrapper>
          <s.Main>
            <s.Text>로그인</s.Text>
           
              <s.InputWrappers>
                <form onSubmit={handleSubmit(onClickSignin)}>
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
                  <s.Button  onClick={onClickSignin} disabled={formState.isValid ? false : true}>로그인</s.Button>
                  </form>
              </s.InputWrappers>
            

          </s.Main>

        </s.Wrapper>
    )
}
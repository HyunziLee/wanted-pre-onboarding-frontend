import * as s from './signin.style'
import axios from 'axios';
export default function Signin(){
    return(
        <s.Wrapper>
          <s.Main>
            <s.InputWrappers>
              <s.InputWrapper>
                <s.Text>아이디</s.Text>
                <s.Input/>
              </s.InputWrapper>
              <s.InputWrapper>
                <s.Text>비밀번호</s.Text>
                <s.Input/>
              </s.InputWrapper>
              <s.Button>로그인</s.Button>

            </s.InputWrappers>

          </s.Main>

        </s.Wrapper>
    )
}
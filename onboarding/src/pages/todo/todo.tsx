import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as s from './todo.style'
import { List } from "./todo.types";
export default function Todo(){
  const [list, setList] = useState<List[]>([]);

  const navigate = useNavigate()
  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken) {
      getList(accessToken)
    }
    else if(!accessToken){
      navigate('/')
    } 
  },[])

  const getList = async(accessToken: string)=>{
    try{
      const result = await axios.get(
        'https://pre-onboarding-selection-task.shop/todos', 
        
        {
          headers:{
            "Authorization": `Bearer ${accessToken}` ,
            "Content-Type": "application/json"
          }
        })
        setList(result.data)

      
    }catch(error){

    }
  }

 
  return(
    <s.Wrapper>
      <s.Main>
        <s.Text size="2rem">To do List</s.Text>
        <s.ListWrapper>
          {list && list.map((el, index)=>(
            
              <s.Items key={uuidv4()} >
                <s.Item>{el.todo}</s.Item>
                <s.Item>{el.isCompleted ? "완료" : "진행중"}</s.Item>
                <s.EditBtn>수정</s.EditBtn>
                <s.EditBtn>삭제</s.EditBtn>
              </s.Items>

          ))}
      
        </s.ListWrapper>

        <s.Text size="1.5rem">To do 추가하기</s.Text>
        <s.InputWrapper>
          <s.Input/>
          <s.SubmitBtn>추가</s.SubmitBtn>

        </s.InputWrapper>

      </s.Main>
    </s.Wrapper>
  )
}
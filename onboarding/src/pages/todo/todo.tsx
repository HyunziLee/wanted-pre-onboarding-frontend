import axios from "axios";
import { ChangeEvent,  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as s from './todo.style'
import { List } from "./todo.types";
export default function Todo(){
  const [list, setList] = useState<List[]>([]);
  const [accessToken, setAccessToken] = useState<string>("")
  const [todoItem, setTodoItem] = useState<string>("")
  const [forLender, setForLender] = useState(0)
  const [isEdit, setIsEdit] = useState(Array(list.length).fill(false))

  let todoItemEdit = ""

  const navigate = useNavigate()

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken) {
      getList(accessToken)
      setAccessToken(accessToken)
    }
    else if(!accessToken){
      navigate('/')
    } 
  },[forLender])

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

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>)=>{

    setTodoItem(event.target.value)
  }

  const onChangeEditInput = (event: ChangeEvent<HTMLInputElement>)=>{
   todoItemEdit = event.target.value;
  }

  const onClickCreate = async()=>{
    if(!todoItem) return
    try{
     await axios.post(
        `https://pre-onboarding-selection-task.shop/todos`,
        {
          "todo": todoItem
        },
        {
          headers:{
            "Authorization": `Bearer ${accessToken}` ,
            "Content-Type": "application/json"
          }
        }
        )
        setForLender(forLender+1);

    }catch(error){
      console.log(error)
    }
  }

  const onClickDelete = async(id: number)=>{
    if(!id) return
    try{
      await axios.delete(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        
        {
          headers:{
            "Authorization": `Bearer ${accessToken}` ,
          }
        }
        )
        setForLender(forLender+1);

    }catch(error){
      console.log(error)
    }
  }
  const onClickIsEdit = (index: number)=>{
    const allFalse = Array(list.length).fill(false);
    allFalse[index] = true
    setIsEdit(allFalse);
  }
  const onClickCancel = ()=>{
    const allFalse = Array(list.length).fill(false);
    setIsEdit(allFalse);
  }

  const onClickUpdate = async (id: number)=>{
    try{
       await axios.put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          "todo": todoItemEdit,
          "isCompleted": false
        },
        {
          headers:{
            "Authorization": `Bearer ${accessToken}` ,
            "Content-Type": "application/json"
          }
        }
        )
        setForLender(forLender+1);

    }catch(error){
      console.log(error)
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
                <s.EditBtn onClick={()=>{onClickIsEdit(index)}}>수정</s.EditBtn>
                {
                  isEdit[index] &&
                   (   
                    <s.InputWrapper>
                      <s.Input onChange={onChangeEditInput}/>
                      <s.SubmitBtn onClick={()=>{onClickUpdate(el.id)}}>제출</s.SubmitBtn>
                      <s.SubmitBtn onClick={onClickCancel} >취소</s.SubmitBtn>
                    </s.InputWrapper>
                  )
                  
                }
                <s.EditBtn onClick={()=>{onClickDelete(el.id)}}>삭제</s.EditBtn>
              </s.Items>

          ))}
      
        </s.ListWrapper>

        <s.Text size="1.5rem">To do 추가하기</s.Text>
        <s.InputWrapper>
          <s.Input onChange={onChangeInput}/>
          <s.SubmitBtn onClick={onClickCreate}>추가</s.SubmitBtn>
        </s.InputWrapper>

      </s.Main>
    </s.Wrapper>
  )
}
import styled from "@emotion/styled";
import { Container } from "react-bootstrap";

export const Wrapper = styled(Container)`
    width: 100vw;
    
`

export const Main = styled.main`
    width: 50%;
    height: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: yellow;
    
`

export const ListWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  
`
export const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: orange;
  
`
export const Item = styled.div`
  width: 35%;
 

`
export const EditBtn = styled.button`
  
`

export const Text = styled.div<{size: string}>`
  font-size: ${props=>props.size};
`

export const InputWrapper = styled.section`

  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: orange;
  width: 100%;

`

export const Input = styled.input`
  width: 50%;
  height: 30px;
`
export const SubmitBtn = styled.button`
  width: 10%;

`
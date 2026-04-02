import styled from "styled-components";
import {useAuthStore, UserAuth } from "../index";
import { HomeTemplate } from "../components/templates/HomeTemplate";
export function Home() {
  const{signout} = useAuthStore();
  const {user} = UserAuth();
  return (
    <HomeTemplate/>
   );
 }
const Container =styled.div`
    height:100vh;
`
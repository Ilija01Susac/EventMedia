import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters(){
    return (
        <>
        <Menu vertical size="large" style={{width:'100%' , marginTop:25}}>
            <Header icon='filter' attached color='teal' content='filters' />
            <Menu.Item content='All activities'/>
            <Menu.Item content="I'm going"/> 
            <Menu.Item content="I'm hosting"/> 
        </Menu>
        <Header />
        <Calendar />
        </>
    )
}
import ToDoListPage from '../ToDoListPage.vue'
import {mount} from "@vue/test-utils";
import {describe,expect,test,it,vi} from "vitest";

function mountTodoListPage(){
    const wrapper = mount(ToDoListPage,{
        props:{}
    })
    return wrapper;
}

describe('todoListPage',()=>{
    it('mount properly',()=>{
        expect(mountTodoListPage()).toBeTruthy()
        expect(mountTodoListPage().text()).toContain('Submit')
        expect(mountTodoListPage().text()).toContain('To do list')
        expect(mountTodoListPage().text()).toContain('Nothing to do, add new todo')
    })
    it('Renders the input value', async () => {
        expect(mountTodoListPage().find('a-input'))
        expect(mountTodoListPage().find('a-input').text()).toContain('')

    })
    it('click submit button',async ()=>{

    })
})

import home from "../Home.vue";
// @ts-ignore
import {mount} from '@vue/test-utils';
import {describe,expect,test ,it,vi} from "vitest";

describe("homepage",()=>{
it("mounts properly",async ()=>{
    const wrapper =mount(home)
    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain("Hello World")
})
})

describe("homepage",()=>{
    it("mounts properly",async ()=>{
        const wrapper =mount(home)
        expect(wrapper).toBeTruthy()
        expect(wrapper.text()).toContain("进入待办事项")
    })
})

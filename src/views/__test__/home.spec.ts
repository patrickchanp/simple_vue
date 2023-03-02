import home from "../Home.vue";
// @ts-ignore
import {mount} from '@vue/test-utils';
import {describe,expect,test ,it,vi} from "vitest";
// import {useRouter} from "vue-router";
import router from '../../router/index.js'
// const router =useRouter();
function mountHome() {
    const wrapper = mount(home, {
        global: {
            plugins: [router]
        }
    })
    return wrapper
}

describe("homepage",()=>{
it("mounts properly",async ()=>{
    expect(mountHome().text()).toContain("Hello World")
    expect(mountHome().text()).toContain("进入待办事项")
})
    test("check the router",async ()=>{
  const push = vi.spyOn(router,'push');
  await mountHome().find('a-button').trigger('click');
  expect(push).toHaveBeenCalledOnce();
  expect(push).toHaveBeenCalledWith("/list")
    })
})


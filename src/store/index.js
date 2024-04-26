import {createPinia} from "pinia";



const pinia = createPinia()
// 默认导出给main.js挂载
export default pinia

export * from "./useProfessorStore"
export * from "./useProfessorFruitStore"


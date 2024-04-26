/**
 * @author Santa Antilles
 * @description 教授成果资源表
 * @date 2024/4/25-23:17:04
 */

import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import * as xlsx from "xlsx";

const RESOURCE_PATH = '/xlsx/professorFruitStore.xlsx'

// deprecated
export const useProfessorFruitStore = defineStore(
    'professorFruitStore',
    ()=>{
        const professorsFruit = ref()

        const setProfessorFruit = ()=>{
            axios.get(
                `http://localhost:${process.env.VUE_APP_SERVER_PORT}${RESOURCE_PATH}`,
                { responseType: 'arraybuffer' }
            ).then(res => {
                const workbook = xlsx.read(new Uint8Array(res.data), {type: 'array'})
                const sheets = workbook.Sheets[workbook.SheetNames[0]]
                let rowContent = xlsx.utils.sheet_to_json(sheets, {header: 1})
                // 一维表头
                let tHead;
                // 二维数据
                const tBody = []
                rowContent.forEach((row, index) => {
                    if (index==0){
                        tHead = row.map(item=>item)
                    }else{
                        tBody.push(row)
                    }
                })
                professorsFruit.value = {
                    header: tHead,
                    body: tBody
                }
            })
        }

        return {
            professorsFruit, setProfessorFruit
        }
    }
)


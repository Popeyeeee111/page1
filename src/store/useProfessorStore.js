/**
 * @author Santa Antilles
 * @description 教授个人信息资源表
 * @date 2024/4/25-23:16:38
 */

import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import * as xlsx from "xlsx";

const RESOURCE_PATH = '/xlsx/professorStore.xlsx'
const PROFESSOR_SHEET_NAME = 'professor';
const PROFESSOR_FRUIT_SHEET_NAME = 'professorFruit';

const HOST = process.env.VUE_APP_HOST

export const useProfessorStore = defineStore(
    'professorStore',
    ()=>{
        const professor = ref()
        const professorFruit = ref()

        const setProfessorAndProfessorStore = ()=>{
            axios.get(
                `http://${HOST}:${process.env.VUE_APP_SERVER_PORT}${RESOURCE_PATH}`,
                { responseType: 'arraybuffer' }
            ).then(res => {
                const data = new Uint8Array(res.data);
                const workbook = xlsx.read(data, {type: 'array'})

                function extractStateFromWorkbook(sheetName){
                    const sheets = workbook.Sheets[sheetName]
                    const rowContent = xlsx.utils.sheet_to_json(sheets, {header: 1})
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
                    return {
                        header: tHead,
                        body: tBody
                    }
                }
                professor.value = extractStateFromWorkbook(PROFESSOR_SHEET_NAME)
                professorFruit.value = extractStateFromWorkbook(PROFESSOR_FRUIT_SHEET_NAME)
            })
        }

        return {
            professor, setProfessorAndProfessorStore, professorFruit
        }
    }
)


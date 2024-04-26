/**
 * @author Santa Antilles
 * @description 教授个人信息资源表
 * @date 2024/4/25-23:16:38
 */

import * as xlsx from 'xlsx';
import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";

const RESOURCE_PATH = '/xlsx/professorStore.xlsx'

export const useProfessorStore = defineStore(
    'professorStore',
    ()=>{
        const professors = ref()

        axios.get(
            `http://localhost:${process.env.VUE_APP_SERVER_PORT}${RESOURCE_PATH}`,
            { responseType: 'arraybuffer' }
        ).then(res => {
            const data = new Uint8Array(res.data);
            const workbook = xlsx.read(data, {type: 'array'})
            const sheets = workbook.Sheets[workbook.SheetNames[0]]
            professors.value = xlsx.utils.sheet_to_json(sheets, {header: 1})
        })

        const getProfessorById = (id)=>{

        }

        const getProfessorList = ()=>{}

        return {
            professors
        }
    }
)


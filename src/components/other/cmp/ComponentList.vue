<template>
    <div class="fix">
        <el-scrollbar>
            <div style="width: 100%;">
                <div class="title">常用</div>
                <el-row class="component-list">
                    <div v-for="data in most_components" @click="addComponent(data)" @mousemove="mouseHover(data)"
                         @mouseleave="mouseLeave" class="component">{{ data.title }}
                    </div>
                </el-row>

                <div class="title">文件</div>
                <el-row class="component-list">
                    <div v-for="data in file_components" @click="addComponent(data)" @mousemove="mouseHover(data)"
                         @mouseleave="mouseLeave" class="component">{{ data.title }}
                    </div>
                </el-row>

                <div class="title">输入</div>
                <el-row class="component-list">
                    <div v-for="data in input_components" @click="addComponent(data)" @mousemove="mouseHover(data)"
                         @mouseleave="mouseLeave" class="component">{{ data.title }}
                    </div>
                </el-row>

                <div class="title">其他</div>
                <el-row class="component-list">
                    <div v-for="data in other_components" @click="addComponent(data)" @mousemove="mouseHover(data)"
                         @mouseleave="mouseLeave" class="component">{{ data.title }}
                    </div>
                </el-row>
            </div>
        </el-scrollbar>

        <teleport to="body">
            <div v-show="detailCardView" id="not">
                <el-card style="border-radius: 8px">
                    <component :is="selectData.data.cname" :model="selectData.data"></component>
                </el-card>
            </div>
        </teleport>
    </div>
</template>

<script>
import input_components from '../../../data/input_components.json'
import file_components from '../../../data/file_components.json'
import other_components from '../../../data/other_components.json'
import most_components from '../../../data/most_components.json'
import useMouseMove from "../../../hooks/useMouseMove";
import {reactive, ref} from "vue";
import JhHead from '../../create/JhHead.vue';
import JhUploadFile from "../../create/JhUploadFile.vue";
import JhDownloadFile from '../../create/JhDownloadFile.vue'
import JhDropdownSelect from '../../create/JhDropdownSelect.vue'
import JhTextInput from "../../create/JhTextInput.vue";
import JhMulti from "../../create/JhMulti.vue";
import JhRadio from "../../create/JhRadio.vue";
import JhLocation from '../../create/JhLocation.vue'
import JhDateInput from '../../create/JhDateInput.vue'
import JhRate from "../../create/JhRate.vue";
import {ElMessage} from "element-plus";
import {useSurvey} from "../../../store/survey";
import {refreshComponentIndex} from "../../../api/util";

export default {
    components: {
        JhTextInput,
        JhRate,
        JhDropdownSelect,
        JhLocation,
        JhDateInput,
        JhRadio,
        JhMulti,
        JhDownloadFile,
        JhUploadFile,
        JhHead
    },
    setup: function () {
        let survey = useSurvey();
        let mouse = reactive(useMouseMove());
        let selectData = reactive({
            data: {},
        })

        function addComponent(data) {
            survey["components"].push(data)
            refreshComponentIndex(survey['components']);
            ElMessage.success({
                message: '添加组件成功',
                showClose: true,
            });
        }

        let detailCardView = ref(false);

        function setLocation() {
            let ele = document.getElementById('not');
            ele.style.left = (mouse.x + 50) + 'px'
            // 如果超出底部
            let computedHeight = (mouse.y + ele.scrollHeight / 2)

            if (computedHeight >= document.body.scrollHeight) {
                // 高出底部10px
                ele.style.top = (document.body.scrollHeight - ele.scrollHeight / 2 - 10) + 'px';
            } else if ((computedHeight - ele.scrollHeight) <= 45) {
                ele.style.top = (45 + ele.scrollHeight / 2) + "px";
            } else {
                ele.style.top = (mouse.y) + 'px';
            }
            ele.style.zIndex = '2';
            ele.style.position = 'absolute'
            ele.style.transform = 'translate(0px,-50%)'
        }


        function mouseHover(data) {
            setLocation();
            setTimeout(() => {
                detailCardView.value = true;
            }, 2)
            selectData.data = data;
        }

        function mouseLeave() {
            detailCardView.value = false;
        }

        return {
            detailCardView,
            mouse,
            mouseLeave,
            mouseHover,
            addComponent,
            selectData,
            input_components,
            file_components,
            most_components,
            other_components
        }
    },
};
</script>

<style scoped>
:deep(.el-scrollbar__thumb) {
    max-width: 2px;
}

.fix {
    max-width: 300px;
    min-width: 300px;
    border: 0px solid red;
    box-sizing: border-box;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    background-color: white;
}

.component-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    padding: 8px;
}

.component-list > div {
    /*border: 1px solid red;*/

}

.component {
    width: 100px;
    display: flex;
    align-items: center;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    justify-content: center;
    border-radius: 4px;
    height: 30px;
    margin: 8px auto;
    background-color: rgba(247, 247, 247);
}

.component:hover {
    color: dodgerblue;
    background-color: rgb(245, 249, 255);
}

.title {
    width: 100%;
    text-align: left;
    font-size: 18px;
    height: 20px;
    padding: 16px 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: white;
    z-index: 1;
    margin-left: 8px;
    overflow: hidden
}
</style>
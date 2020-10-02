<template>
    <div class="Learn">
        <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)"/>
        <van-tabs v-model="active" @rendered ="changeHeight" @change="changeHeight">

            <van-tab v-if="select.length > 0" title="选择题">
                <van-list class="select-topic" v-model="selectLoading" :finished="true" finished-text="">
                    <div v-for="(item, num) in select" :key="num" class="topic-items">
                        <p class="question-title">
                            <span>{{ num + 1 }}、{{ item.title }} </span>
                            (<span class="correct">{{ item.answer | formatSelectAnswer }}</span>)
                        </p>
                        <pre v-if="item.case" class="question-case">{{ item.case }}</pre>
                        <ul class="answer-options">
                            <li v-for="(v, k) in item.options" :key="k" v-bind:class="{ correct: item.answer.includes(k + 1) }">
                                <span class="num">{{ String.fromCodePoint(k + 65) }}.</span>
                                <span class="detail">{{ v }}</span>
                            </li>
                        </ul>
                        <div v-if="item.explanation !== ''" class="explanation">
                            <span>解析：</span>
                            <div v-html="item.explanation"></div>
                        </div>
                    </div>
                </van-list>
            </van-tab>

            <van-tab v-if="judgment.length > 0" title="判断题">
                <van-list class="judgment-topic" v-model="judgmentLoading" :finished="true" finished-text="">
                    <div v-for="(item, num) in judgment" :key="num" class="topic-items">
                        <p class="question-title">
                            <span>{{ num + 1 }}、{{ item.title }} </span>
                            <span v-if="item.answer === 1">(<van-icon name="success" />)</span>
                            <span v-if="item.answer === 0">(<van-icon name="cross" />)</span>
                        </p>
                        <ul class="answer-options">
                            <li v-bind:class="{ correct: item.answer === 1 }">正确</li>
                            <li v-bind:class="{ correct: item.answer === 0 }">错误</li>
                        </ul>
                    </div>
                </van-list>
            </van-tab>

            <van-tab v-if="fill.length > 0" title="填空题">
                <van-list class="fill-topic" v-model="fillLoading" :finished="true" finished-text="">
                    <div v-for="(item, num) in fill" :key="num" class="topic-items">
                        <p class="question-title" v-html="formatFillAnswer(num, item)"></p>
                    </div>
                </van-list>
            </van-tab>

            <van-tab v-if="analysis.length > 0" title="分析题">
                <van-list class="analysis-topic" v-model="analysisLoading" :finished="true" finished-text="">
                    <div v-for="(item, num) in analysis" :key="num" class="topic-items">
                        <p class="question-title">{{ num + 1 }}、{{ item.title }}</p>
                        <pre v-if="item.case" class="question-case">{{ item.case }}</pre>
                        <span class="correct">答案：</span>
                        <pre class="question-case">{{ item.answer }}</pre>
                    </div>
                </van-list>
            </van-tab>

            <van-tab v-if="selectFill.length > 0" title="选择填空题">
                <van-list class="selectFill-topic" v-model="selectFillLoading" :finished="true" finished-text="">
                    <div v-for="(item, num) in selectFill" :key="num" class="topic-items">
                        <p class="question-title" v-html="formatSelectFillAnswer(num, item)"></p>
                        <ul class="answer-options">
                            <li class="multi-options van-hairline--bottom" v-for="(v, k) in item.options" :key="k">
                                <span>{{ k + 1 }}、</span>
                                <div>
                                    <p v-for="(vv, kk) in v" :key="kk" v-bind:class="{ correct: item.answer[k] === (kk + 1) }">
                                        <span class="num">{{ String.fromCodePoint(kk + 65) }}.</span>
                                        <span class="detail">{{ vv }}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <span>翻译：</span>
                            <p v-html="item.explanation"></p>
                        </div>
                    </div>
                </van-list>
            </van-tab>

            <van-tab v-if="translate.length != 0" title="翻译题">
                <van-list class="translate-topic" v-model="translateLoading" :finished="true" finished-text="">
                    <div v-for="(item, num) in translate" :key="num" class="topic-items">
                        <p class="question-title">{{ num + 1 }}、{{ item.title }}</p>
                        <span class="correct">答案：</span>
                        <p v-html="item.answer"></p>
                    </div>
                </van-list>
            </van-tab>

        </van-tabs>
    </div>
</template>

<script>
    import { getTopic } from '../api/data'
    import { Tab, Tabs, List, Icon } from 'vant'

    export default {
        name: "Learn",
        filters: {
            formatSelectAnswer(answer) {
                return answer.map(v => String.fromCodePoint(v + 64)).join('')
            }
        },
        data() {
            return {
                title: '',
                select: [],
                judgment: [],
                fill: [],
                analysis: [],
                selectFill: [],
                translate: [],
                listHeight: 0,
                selectLoading: false,
                judgmentLoading: false,
                fillLoading: false,
                analysisLoading: false,
                selectFillLoading: false,
                translateLoading: false,
                active: 0
            }
        },
        created() {
            const { education, subject } = this.$route.params
            if (!education || !subject) {
                this.$router.replace({ name: 'Menu' })
            } else {
                getTopic(education, subject).then(response => {
                    this.title = response.education + '-' + response.subject + '(' + response.semester + ')'
                    this.select = response.select || []
                    this.judgment = response.judgment || []
                    this.fill = response.fill || []
                    this.analysis = response.analysis || []
                    this.selectFill = response.selectFill || []
                    this.translate = response.translate || []
                }).catch(error => {
                    this.$router.replace({ name: 'Menu' })
                    setTimeout(() => this.$toast(error.message), 0)
                })
                // 计算列表高度
                this.listHeight = window.screen.height - 46 - 44
            }
        },
        methods: {
            changeHeight() {
                this.$el.querySelectorAll('.van-list').forEach(el => {
                    el.style.height = this.listHeight + 'px'
                    el.style.overflowY = 'auto'
                })
            },
            formatFillAnswer(num, item) {
                const answer = item.answer.map(v => `<span class="correct-unline">${v}</span>`)
                return `${num + 1}、` + item.title.format(...answer)
            },
            formatSelectFillAnswer(num, item) {
                const answer = item.answer.map((v, k) => {
                    return '<span class="correct-unline">' + String(k + 1) + ', ' + String.fromCodePoint(v + 64) + '</span>'
                })
                return `${num + 1}、` + item.title.format(...answer)
            }
        },
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [List.name]: List,
            [Icon.name]: Icon,
        }
    }
</script>

<style scoped>
    .Learn {
        width: 100%;
        height: 100vh;
    }
    .Learn .topic-items {
        padding: 1rem;
        border-bottom: 1px solid #ebedf0;
    }
    .Learn .question-title {
        padding-bottom: .5rem;
    }
    .Learn .question-case {
        background-color: #eaeaea;
        padding: 1rem;
        margin: .5rem 0;
        border-radius: .5rem;
        border: 1px solid #cccccc;
        box-shadow: 0 0 .3rem .05rem rgba(0,0,0,.4) inset;
        font-size: .9rem;
        overflow: auto;
    }

    /*----------------------------------------------------------*/
    .Learn .answer-options {
        font-size: .9rem;
    }
    .Learn .answer-options .multi-options {
        display: flex;
        justify-content: space-between;
        padding: .3rem 0;
    }
    .Learn .answer-options .multi-options:last-child::after {
        border: none !important;
    }
    .Learn .answer-options .multi-options > span {
        flex-shrink: 0;
        width: 2rem;
    }
    .Learn .answer-options .multi-options > div {
        display: flex;
        flex-wrap: wrap;
        flex: 2;
    }
    .Learn .answer-options .multi-options > div > p {
        width: 50%;
    }
    /*----------------------------------------------------------*/

    .Learn .explanation {
        padding-top: .5rem;
        font-size: .9rem;
    }
    .Learn .explanation > span {
        color: #d7003a;
    }


    .Learn .select-topic .answer-options li {
        display: flex;
        align-items: baseline;
        line-height: 1.3rem;
    }
    .Learn .select-topic .answer-options li .num {
        flex-shrink: 0;
        margin-right: .3rem;
    }

    .Learn .judgment-topic .question-title >>> .van-icon-success {
        top: .2rem;
        color: #82ae46;
    }
    .Learn .judgment-topic .question-title >>> .van-icon-cross {
        top: .2rem;
        color: #d7003a;
    }
    .Learn .judgment-topic .answer-options {
        list-style: disc;
        margin-left: 1rem;
    }
    .Learn .fill-topic .question-title {
        padding-bottom: 0;
        line-height: 1.5rem;
    }
</style>
<template>
  <el-dialog title="新闻订阅" v-model="showSubscribeForm" style="width: 450px" @close="handleClose">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px"
    >

      <el-form-item label="选择类型" prop="type">
        <el-select-v2 v-model="ruleForm.type" placeholder="选择类型" :options="options" style="width: 100%"/>
      </el-form-item>
      <el-form-item label="订阅时长" required>
        <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="Pick a day"
            style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          订阅
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {ElMessage, ElMessageBox} from 'element-plus'
import {getCode} from "@/api/frontend/news";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {subscribeNews} from "@/api/frontend/news";
export default {
  data() {
    return {
      showSubscribeForm: false,
      ruleForm: {
        phone: '',
        type: '',
        date: '',
        code: ''
      },
      code: '',
      rules: {
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择类型', trigger: 'change'}
        ],
        date: [
          {required: true, message: '请选择订阅时长', trigger: 'change'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur'}
        ]
      },
      options: [
        {label: '生活', value: 0},
        {label: '国内', value: 1},
        {label: '国际', value: 2},
        {label: '经济', value: 3},
        {label: '体育', value: 4},
        {label: 'IT', value: 5},
        {label: '科学', value: 6},
        {label: '地域', value: 7}
      ]
    };
  },
  methods: {
    getCode() {
      // 如果手机号码不符合手机号码规则，则提示错误
      const phoneNumber = this.ruleForm.phone;

      // 定义手机号码的正则表达式
      const phoneRegex = /^1[0-9]{10}$/;

      // 判断手机号码是否符合规则
      if (!phoneRegex.test(phoneNumber)) {
        // 手机号码不符合规则，显示错误消息
        ElMessage.error('请输入正确的手机号码');
      } else {
        getCode({phoneNumber}).then(res => {
          if (res.code === 200) {
            ElMessage.success('验证码发送成功');
            this.code = res.data;
            console.log(this.code)
          } else {
            ElMessage.error(res.message);
          }
        }).catch(err => {
          ElMessage.error("验证码发送失败");
        })
      }
    },
    submitForm() {
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          // 验证码是否正确
          if (this.ruleForm.code === this.code) {
            // 验证码正确，提交表单
            // 提交表单
            subscribeNews({
              phone: this.ruleForm.phone,
              type: this.ruleForm.type,
            }).then(res => {
              if (res.code === 200) {
                // 订阅成功
                ElMessage.success('订阅成功');
                // 关闭弹窗
                console.log(this)
                this.showSubscribeForm = false;
              } else {
                // 订阅失败
                ElMessage.error(res.message);
              }
            }).catch(err => {
              ElMessage.error('订阅失败');
            })
          } else {
            // 验证码不正确，提示错误
            ElMessage.error('验证码错误');
          }
        } else {
          // 表单验证失败
          ElMessage.error('请输入正确信息');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleFormRef.resetFields(); // 清空表单字段的值
      this.ruleForm = {
        phone: '',
        type: '',
        date: '',
        code: ''
      };
    },
    handleClose() {
      // 清空表单字段的值
      this.$refs.ruleFormRef.resetFields();
      this.ruleForm = {
        phone: '',
        type: '',
        date: '',
        code: ''
      };
    }
  }
}
</script>

<style>
.phone-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
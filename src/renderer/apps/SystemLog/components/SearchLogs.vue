/**
* Created by OXOYO on 2018/8/30.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .search-panel {

    .search-form {
      /*border-bottom: 1px solid #d7dde4;*/
    }
    .search-form-table {
      width: 100%;
    }
    .search-form-page{
      float:right;
      margin-top:10px;
    }
    .btn-group {
      margin-top: 10px;
    }
    .ivu-form-item-content {
      display: inline-block !important;
    }
  }
</style>

<template>
  <div class="search-panel">
    <UPanel title="Inquire">
      <div slot="header-right" class="panel-header">
        <div class="action-btn" @click.stop="handleAction('refresh')">
          <Tooltip transfer placement="top" content="refresh">
            <Icon class="action-icon" type="refresh"></Icon>
          </Tooltip>
        </div>
      </div>
      <div slot="body" class="panel-body">
        <Form
          class="search-form"
          :model="searchForm"
          :label-width="120"
          inline
          @submit.native.prevent
        >
          <FormItem label="Log Category">
            <Select v-model="searchForm.logType" style="width: 300px;" placeholder="Please select a log category">
              <Option
                v-for="item in logTypeList"
                :value="item.name"
                :key="item.name"
                :label="item.name"
              >
                {{ item.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="date">
            <DatePicker v-model="searchForm.date" type="date" transfer placeholder="please choose a date" style="width: 300px"></DatePicker>
          </FormItem>
          <FormItem label="Interface name ">
            <Input type="text" v-model="searchForm.origin" placeholder="please enter an Interface name " style="width: 300px;"></Input>
          </FormItem>
          <FormItem label="Request method">
            <Select v-model="searchForm.method" multiple transfer style="width: 300px;" placeholder="please choose a Request method">
              <Option
                v-for="item in methodList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="Response status">
            <Input type="text" v-model="searchForm.status" placeholder="please enter an interfaceResponse status，Please separate multiples with commas" style="width: 300px;"></Input>
          </FormItem>
          <FormItem label="Message filtering">
            <Input
              v-model="searchForm.filterKeywords"
              placeholder="please enter Keywords"
              @on-enter.stop.prevent="doSearch"
              style="width: 300px;"
            >
            <Select v-model="searchForm.filterType" slot="prepend" style="width: 120px">
              <Option value="request">request Message</Option>
              <Option value="response">response Message</Option>
            </Select>
            </Input>
          </FormItem>
          <FormItem label="User filtering">
            <Input
              v-model="searchForm.filterUserKeywords"
              :placeholder="searchForm.filterUserType === 'account' ? 'please enter an account number' : 'please enter a Name'"
              @on-enter.stop.prevent="doSearch"
              style="width: 300px;"
            >
            <Select v-model="searchForm.filterUserType" slot="prepend" style="width: 120px">
              <Option value="account">account number</Option>
              <Option value="name">Name</Option>
            </Select>
            </Input>
          </FormItem>
          <!-- FIXME User level filtering is not currently supported -->
          <!--
          <FormItem label="用户级别">
            <CheckboxGroup v-model="searchForm.userType">
              <Checkbox :label="2">
                <Icon :type="userClass[2]['icon']"></Icon>
                <span>普通用户</span>
              </Checkbox>
              <Checkbox :label="1">
                <Icon :type="userClass[1]['icon']"></Icon>
                <span>管理员</span>
              </Checkbox>
              <Checkbox :label="0">
                <Icon :type="userClass[0]['icon']"></Icon>
                <span>超级管理员</span>
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          -->
        </Form>
        <Form
          class="search-form"
          :label-width="120"
          @submit.native.prevent
        >
          <FormItem>
            <Button type="primary" :loading="isLoading" @click="doSearch">Inquire</Button>
          </FormItem>
        </Form>
      </div>
    </UPanel>
    <Table
      class="search-form-table"
      v-if="tableData.length"
      :data="tableData"
      :columns="tableColumns"
    ></Table>
    <NoData :show="!tableData.length"></NoData>
  </div>
</template>

<script>
  // import { mapState } from 'vuex'
  // import utils from '@/global/utils'
  // const moduleName = utils.store.getModuleName('Platform')

  export default {
    name: 'SearchLogs',
    data () {
      let _t = this
      let methodList = [
        {
          label: 'GET',
          value: 'GET'
        },
        {
          label: 'POST',
          value: 'POST'
        },
        {
          label: 'PUT',
          value: 'PUT'
        },
        {
          label: 'DELETE',
          value: 'DELETE'
        },
        {
          label: 'OPTIONS',
          value: 'OPTIONS'
        }
      ]
      return {
        searchForm: {
          filterKeywords: '',
          filterType: 'request',
          filterUserKeywords: '',
          filterUserType: 'account',
          status: '',
          userType: [],
          logType: 'result',
          origin: '',
          method: ['GET'],
          date: new Date()
        },
        tableColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: 'userInfo',
            key: 'userInfo',
            render: (h, params) => {
              let userInfo = params.row['userInfo']
              if (userInfo && Object.keys(userInfo).length) {
                return userInfo.account + ' ' + userInfo.name
              }
              return '-'
            }
          },
          {
            title: 'method',
            key: 'method',
            filters: methodList,
            // filterMultiple: false,
            filterMethod: (value, row) => {
              return row.method === value
            }
          },
          {
            title: 'api',
            key: 'origin',
            render: (h, params) => {
              let method = params.row['method'] || ''
              let origin = params.row['origin'] || '-'
              if (method && ['GET', 'OPTIONS'].includes(method.toUpperCase())) {
                return origin.split('?')[0]
              } else {
                return origin
              }
            }
          },
          /*
          {
            title: 'client_ip',
            key: 'client_ip'
          },
          {
            title: 'Upload parameters',
            key: 'requestQuery',
            render: (h, params) => {
              let method = params.row['method'] || ''
              if (method.toUpperCase() === 'GET') {
                return params.row['requestQuery'] || ''
              }
              return params.row['requestBody'] || ''
            }
          },
          */
          {
            title: 'responseStatus',
            key: 'responseStatus'
          },
          {
            title: 'responseTime',
            key: 'responseTime',
            sortable: true
          },
          {
            title: 'create_at',
            key: 'create_at',
            sortable: true,
            render: (h, params) => {
              return _t.$utils.filters.formatDate((new Date(params.row['create_at'])), 'yyyy-MM-dd hh:mm:ss')
            }
          },
          {
            title: 'operating',
            key: 'action',
            render: (h, params) => {
              let btnArr = [
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    margin: '2px'
                  },
                  on: {
                    click: () => {
                      _t.handleAction('detail', params.row)
                    }
                  }
                }, 'Details')
              ]
              return h('div', btnArr)
            }
          }
        ],
        tableData: [],
        // Selected row information
        selectedRowData: [],
        logTypeList: [
          {
            name: 'error'
          },
          {
            name: 'result'
          }
        ],
        methodList: methodList,
        isLoading: false
      }
    },
    // computed: {
    //   ...mapState(moduleName, {
    //     userClass: state => state.layout.userClass
    //   })
    // },
    methods: {
      // 执行Inquire
      doSearch: function (event) {
        let _t = this
        if (_t.isLoading) {
          return false
        }
        _t.isLoading = true
        // Inquire列表
        _t.initList()
        return false
      },
      // 初始化列表，获取第一页数据
      initList: function (isResetSearchForm) {
        let _t = this
        // 处理Inquire条件
        if (isResetSearchForm) {
          _t.searchForm = {
            filterKeywords: '',
            filterType: 'request',
            filterUserKeywords: '',
            filterUserType: 'account',
            status: '',
            userType: [],
            logType: 'result',
            origin: '',
            method: ['GET'],
            date: new Date()
          }
        }
        // 调interface，初始化数据
        _t.getLogList()
      },
      getLogList: async function () {
        let _t = this
        console.log('xxxx')
        // 分发action，调interface
        let res = await _t.$store.dispatch('Apps/SystemLog/list', {
          ..._t.searchForm,
          date: _t.$utils.filters.formatDate(_t.searchForm.date, 'yyyy-MM-dd')
        })
        _t.isLoading = false
        if (!res || res.status !== 200) {
          return
        }
        // 处理返回数据
        if (res.data && res.data.list && res.data.list.length) {
          _t.$Message.success(res.msg || 'Inquire日志列表成功！')
        } else {
          _t.$Message.info('No data！')
        }
        // 更新表格数据
        _t.tableData = res.data.list || []
      },
      handleAction: function (action, item) {
        let _t = this
        let handleDetail = function () {
          // 广播事件
          _t.$utils.bus.$emit('Apps/SystemLog/detail', {
            action: 'detail',
            info: item
          })
        }
        switch (action) {
          case 'detail':
            handleDetail()
            break
          case 'refresh':
            // 初始化列表
            _t.initList()
            break
        }
      }
    },
    created: async function () {
      let _t = this
      // 监听
      _t.$utils.bus.$on('Apps/SystemLog/list/init', function () {
        // 初始化列表
        _t.initList(true)
      })
      _t.$utils.bus.$on('Apps/SystemLog/list/refresh', function () {
        // 初始化列表
        _t.initList()
      })
    },
    beforeDestroy: function () {
      let _t = this
      // 销毁监听
      _t.$utils.bus.$off('Apps/SystemLog/list/init')
      _t.$utils.bus.$off('Apps/SystemLog/list/refresh')
    }
  }
</script>

<template>
  <div class="container">
    <div class="part_container">
      <div class="part">
        <div class="til">
          Table title
          <div class="btn" @click="showCard('add')">
            新增
          </div>
        </div>
        <div class="cont">
          <el-table
            v-loading="tableloading"
            :data="list"
            border
            height="100%"
            style="width: 100%; height: 100%;">
            <el-table-column
              align="center"
              :width="70"
              fixed="left"
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="date"
              align="left"
              :width="120"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              :width="120"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              align="left"
              label="地址">
            </el-table-column>
            <el-table-column
              align="left"
              :width="120"
              label="操作">
              <template slot-scope="scope">
                <div class="btn_bx">
                  <div class="btn" @click="changeHandle(scope.row)">
                    <!--<img src="../../../assets/img/system/icon1.png" alt="">-->
                    <div class="txt">修改</div>
                  </div>
                  <div class="btn" @click="del(scope.row)">
                    <!--<img src="../../../assets/img/system/icon2.png" alt="">-->
                    <div class="txt">删除</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            @prev-click="getPtev"
            @next-click="getNext"
            @current-change="currentChange"
            :page-size="pageSize"
            :current-page="pageIndex"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增/修改 -->
    <el-dialog
      :title="cardType === 'add' ? '新增' : '修改'"
      :visible.sync="infoDialogVisible"
      width="680px">
      <div class="chang_active">
        <div class="lis clear">
          <div class="i_db">
            <div class="til">日期<i>*</i></div>
            <div class="cont">
              <el-date-picker
                v-model="info.date"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </div>
          <div class="i_db">
            <div class="til">姓名<i>*</i></div>
            <div class="cont">
              <input type="text" placeholder="请输入..." v-model="info.name">
            </div>
          </div>
        </div>
        <!--<div class="lis clear">-->
          <!--<div class="i_db all_c">-->
            <!--<div class="til">地址<i>*</i></div>-->
            <!--<div class="cont">-->
              <!--<input type="text" placeholder="请输入..." v-model="info.address">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="lis clear">
          <div class="i_db all_c has_textarea">
            <div class="til">地址<i>*</i></div>
            <div class="cont">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="info.address">
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="infoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
		  </span>
    </el-dialog>
  </div>
</template>

<script>

  import controller from './index.js';
  export default controller

</script>

<style lang="less" scoped>
  @import "./index.less";
</style>

<template>
  <div class="echart">
    <el-card style="height: 250px;">
      <div style="height:250px" ref="axisEcharts"></div>
    </el-card>
    <div class="graph">
      <el-card style="height:240px">
        <div style="height:240px" ref="userEcharts"></div>
      </el-card>
      <el-card style="height:240px">
        <div style="height:240px" ref="pieEcharts"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echart from 'echarts'
import { getData } from '@/util/data'

export default {
  name: 'HomeEchart',
  mounted() {
    /*getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        const order = data.orderData;
        const xData = order.date;
        // 互殴去data[0]里面所有keys
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        // 遍历orderdata数据给series数组
        keyArray.forEach((key) => {
          series.push({
            name: key,
            // 遍历数据每一项key的值进行返回
            data: order.data.map(item => item[key]),
            type: 'line',
          });
        });
        // 折线图
        const axisOption = {
          //  x轴
          xAxis: {
            data: xData,
          },
          //  y轴
          yAxis:{},
          //  标签
          legend:{
            data: keyArray,
          },
          series
        };
        // 配置
        echart.init(this.$refs.axiosEcharts).setOption(axisOption);

        // 柱状图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        echart.init(this.$refs.userEcharts).setOption(userOption);

        // 饼图
        const pieOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{ data: data.videoData, type: "pie" }],
        };
        echart.init(this.$refs.pieEcharts).setOption(pieOption);
      }
    })*/
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        const order = data.orderData;
        const xDate = order.date;
        //获取data[0]字典里面所有的keys
        const keyArr = Object.keys(order.data[0]);
        const series = [];
        keyArr.map((key) => {
          series.push({
            name: key,
            //把对应key的所有数据作为数组全部赋值给data
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        //折线图
        const axisOption = {
          //x轴显示日期
          xAxis: {
            data: xDate,
          },
          //y轴不用，默认显示对应的data值
          yAxis: {},
          //标签
          legend: {
            data: keyArr,
          },
          // series : series
          series,
        };
        echart.init(this.$refs.axisEcharts).setOption(axisOption);

        //柱状图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        echart.init(this.$refs.userEcharts).setOption(userOption);

        //饼状图
        const pieOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{ data: data.pieData, type: "pie" }],
        };
        echart.init(this.$refs.pieEcharts).setOption(pieOption);
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .echart {
    height: 100%;
    .graph {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
      }
    }
  }
</style>

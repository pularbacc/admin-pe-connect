<template>
  <div class="page-detail">
    <div class="page-header">
      <div class="page-header-name">Reports</div>
    </div>
    <div class="page-body">
      <table class="tableManager">
        <tr class="hidden-sm">
          <th>Type</th>
          <th>Content</th>
          <th>Created at</th>
          <th>Action</th>
        </tr>
        <tr v-for="report of reports" :key="report.id">
          <td data-title="Type">{{ report.action }}</td>
          <td data-title="Content">
            <div class="table-content-long">
              {{ report.content }}
            </div>
          </td>
          <td data-title="Created At">{{ $date.get(report.created_at) }}</td>
          <td data-title="Action">
            <button class="btn btn--light table-btn" @click="toLink(report)">To</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IReportRes } from '~/types/report'

export default Vue.extend({
  data() {
    return {
      reports: [] as Array<IReportRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.report.getReports().then(res => {
        this.reports = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
  methods: {
    toLink(report: IReportRes) {
      let link = ''
      switch (report.action) {
      case 'POST':
        link = `/posts/${report.target_id}`
        break
      case 'ARTICLE':
        link = `/articles/${report.target_id}`
        break
      case 'USER':
        link = `/profiles/${report.target_id}`
        break
     
      }
      this.$router.push(link)
    },
  },
})
</script>

<style scoped></style>

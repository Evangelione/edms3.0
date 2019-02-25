export function downLoad(model) {
  switch (model) {
    case 'client':
      window.location.href = 'http://fh-template.oss-cn-beijing.aliyuncs.com/%E5%AE%A2%E6%88%B7%E5%AF%BC%E5%85%A5.xlsx'
      break
    case 'supplier':
      window.location.href = 'http://fh-template.oss-cn-beijing.aliyuncs.com/%E4%BE%9B%E5%BA%94%E5%95%86%E5%AF%BC%E5%85%A5.xlsx'
      break
    case 'gas':
      window.location.href = 'http://fh-template.oss-cn-beijing.aliyuncs.com/%E6%B0%94%E6%BA%90%E5%AF%BC%E5%85%A5.xlsx'
      break
    case 'site':
      window.location.href = 'http://fh-template.oss-cn-beijing.aliyuncs.com/%E7%AB%99%E7%82%B9%E5%AF%BC%E5%85%A5.xlsx'
      break
    case 'logistics':
      window.location.href = 'http://fh-template.oss-cn-beijing.aliyuncs.com/%E7%89%A9%E6%B5%81%E5%AF%BC%E5%85%A5.xlsx'
      break
    case 'driver_car':
      window.location.href = 'http://fh-template.oss-cn-beijing.aliyuncs.com/%E8%BD%A6%E9%98%9F%E5%AF%BC%E5%85%A5.xlsx'
      break
    default:
      return false
  }
}

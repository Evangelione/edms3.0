import { Layout } from 'antd'
import withRouter from 'umi/withRouter'
import MyHeader from './Header'
import MyContent from './Content'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import styles from './index.less'

moment.locale('zh-cn')

function BasicLayout({children, location}) {
  if (location.pathname === '/login') {
    return (
      <Layout className={styles.layout}>
        <MyContent location={location} children={children} />
      </Layout>
    )
  }

  return (
    <LocaleProvider locale={zh_CN}>
      <Layout className={styles.layout} id='scrollTop' style={{minWidth: 1920}}>
        <MyHeader location={location} />
        <MyContent location={location} children={children} />
      </Layout>
    </LocaleProvider>
  )
}

export default withRouter(BasicLayout)

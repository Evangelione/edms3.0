import React, { Component } from 'react';
import { Input, Button, Modal,Select,Form, DatePicker,} from 'antd';
import { connect } from 'dva';
import styles from '@/pages/trading/order/index.less';
import { IconFont, SiteImg, LogisticsImg, site_type } from '@/common/constants'

const Option = Select.Option;

@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()

 class OrderModify extends Component{

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            id:'',
            status:'1',
            //第一级公司
            companyList:[],
            companyChangeList:[],
            companyAdd:false,
            companySelect:false,
            //第二级加汽站
            fillingList:[],
            fillingChangeList:[],
            fillingAdd:false,
            fillingSelect:false,
            //第三级调度
            logisticsStatus:false,
            //第三级采购
            purchaseStatus:false,

        };
        this.showModal = ()=>{
            if(this.state.visible){return}
            this.setState({visible:true});
        };
        this.hideModal = ()=>{
            this.setState({visible:false});
        };

    }

    componentWillMount(){

        const {id,status} = this.props;
        this.setState({id:id,status:status});

            let companyList = [0];
            let companyChangeList = [];
            companyList.map((ele,index)=>{companyChangeList.push(1)});
            this.setState({companyList:companyList,companyChangeList:companyChangeList});

            let fillingList = [0];
            let fillingChangeList = [];
            fillingList.map((ele,index)=>{fillingChangeList.push(1)});
            this.setState({fillingList:fillingList,fillingChangeList:fillingChangeList});



    }

    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <div onClick={this.showModal} style={{display:'inline-block'}} className={styles['OrderModify']} >
                {this.props.children}
                <Modal
                    title="订单修改"
                    visible={this.state.visible}
                    footer={null}
                    onOk={()=>{}}
                    onCancel={this.hideModal}
                    width={840}
                    maskClosable={false}
                    destroyOnClose={true}
                    bodyStyle={{ padding:0}}
                >
                <Form onSubmit={()=>{}}>
                <div style={{width:'100%',maxHeight:700,overflow:'auto'}} >
                    {/*第一级公司*/}
                    <div className={styles['order_modify']} >
                        {this.state.companyList.map((ele,index)=>{
                            return (
                                <div key={index} style={{
                                    borderTop:index===0 ? 'none' : '1px solid #e0e0e0',
                                    paddingTop:index===0 ? 0 : 20
                                }} >
                                {this.state.companyChangeList[index]===1 ?
                                <div>
                                <div className={styles['order_modify_modal_company']} >
                                    <div className={styles['div_left']} >
                                        <span style={{color:'#FB4E5C',marginTop:'10px'}} >*</span>
                                        <img src={require('@/assets/image/client__order_48_37.png')} />
                                        <div>
                                            <p>昆仑燃气有限公司山东分公司<span onClick={()=>{
                                                let companyChangeList = this.state.companyChangeList;
                                                companyChangeList[index] = 0;
                                                this.setState({companyChangeList:companyChangeList});
                                            }} >更改</span><a style={{display:!(index===0) ? 'inline-block' : 'none'}} onClick={()=>{
                                                let companyList = this.state.companyList;
                                                companyList.splice(index,1);
                                                this.setState({companyList:companyList});
                                            }} >删除</a></p>
                                            <p>张三丰 12312313123</p>
                                        </div>
                                    </div>
                                    <div className={styles['div_center']} >
                                        <p>预付款额<span>32.121000元</span></p>
                                        <p>信用额度<span>32.121000元</span></p>
                                    </div>
                                    <div
                                        className={styles['div_right']}
                                        style={{
                                            opacity:index===0 ? 1 : 0,
                                            borderColor: !this.state.companyAdd ? '#7E96F4' : '#FB4E5C',
                                            color:!this.state.companyAdd ? '#7E96F4' : '#FB4E5C',
                                        }}
                                        onClick={()=>{
                                            if(!(index===0)){return}
                                            this.setState({companyAdd:!this.state.companyAdd,companySelect:false});
                                    }}>
                                        <span>{this.state.companyAdd ? '-' : '+'}</span>
                                    </div>
                                </div>
                                <div className={styles['order_modify_modal_input']} >
                                    <div className={styles['div']} >
                                        <span style={{opacity:0}} className={styles['span']} >*</span>
                                        <p className={styles['p']} >收款方式</p>
                                        <Form.Item>
                                            <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                                 <Option value="jack">Jack</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className={styles['div']} style={{marginLeft:100}} >
                                        <span className={styles['span']} >*</span>
                                        <p className={styles['p']} >配送方式</p>
                                        <Form.Item>
                                            <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                                 <Option value="jack">Jack</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className={styles['div']} >
                                        <span className={styles['span']} >*</span>
                                        <p className={styles['p']} >销售价格</p>
                                        <Form.Item>
                                            <Input style={{width:200}} addonAfter={'元/吨'} />
                                        </Form.Item>
                                    </div>
                                    <div className={styles['div']} style={{marginLeft:100}} >
                                        <span className={styles['span']} >*</span>
                                        <p className={styles['p']} >额外费用</p>
                                        <Form.Item>
                                            <Input style={{width:200}} addonAfter={'元'} />
                                        </Form.Item>
                                    </div>
                                </div>
                                </div> :
                                <div className={styles['order_modify_modal_logistics']} style={{
                                    marginBottom:10                                }} >
                                    <span className={styles['span']} >*</span>
                                    <img className={styles['img']} src={require('@/assets/image/client__order_48_37.png')} />
                                    <Select
                                        autoFocus={true}
                                        defaultOpen={true}
                                        style={{width:756,marginLeft:28}}
                                        onChange={(value)=>{
                                            let companyChangeList = this.state.companyChangeList;
                                            companyChangeList[index] = 1;
                                            this.setState({companyChangeList:companyChangeList});
                                    }}>
                                        <Option value="jack">Jack</Option>
                                    </Select>
                                </div>}
                                </div>
                            )
                        })}
                        <div className={styles['order_modify_modal_logistics']} style={{
                            marginBottom:10,
                            display:this.state.companyAdd ? 'flex' : 'none',
                        }} >
                            <span className={styles['span']} >*</span>
                            <img className={styles['img']} src={require('@/assets/image/client__order_48_37.png')} />
                            {!this.state.companySelect ? <p className={styles['p']} onClick={()=>{
                                this.setState({companySelect:true},()=>{

                                });
                            }} >请选择承运物流商</p> :
                            <Select
                                autoFocus={true}
                                defaultOpen={true}
                                style={{width:756,marginLeft:28}}
                                onChange={(value)=>{
                                    let companyList = this.state.companyList;
                                    companyList.push(1);
                                    let companyChangeList = this.state.companyChangeList;
                                    companyChangeList.push(1);
                                    this.setState({campanyList:companyList,companyChangeList:companyChangeList,companyAdd:false,companySelect:false,});
                            }}>
                                <Option value="jack">Jack</Option>
                            </Select>}
                        </div>
                    </div>
                    {/*第二级加气站*/}
                    <div className={styles['order_modify']} >
                        {this.state.fillingList.map((ele,index)=>{
                            return (
                                <div key={index} style={{
                                    borderTop:index===0 ? 'none' : '1px solid #e0e0e0',
                                    paddingTop:index===0 ? 0 : 20
                                }} >
                                {this.state.fillingChangeList[index]===1 ?
                                <div>
                                <div className={styles['order_modify_modal_company']} >
                                    <div className={styles['div_left']} >
                                        <span style={{color:'#FB4E5C',marginTop:'10px'}} >*</span>
                                        <img src={require('@/assets/image/site_order_48_37.png')} />
                                        <div>
                                            <p>昆仑燃气有限公司山东分公司<span onClick={()=>{
                                                let fillingChangeList = this.state.fillingChangeList;
                                                fillingChangeList[index] = 0;
                                                this.setState({fillingChangeList:fillingChangeList});
                                            }} >更改</span><a style={{display:!(index===0) ? 'inline-block' : 'none'}} onClick={()=>{
                                                let fillingList = this.state.fillingList;
                                                fillingList.splice(index,1);
                                                this.setState({fillingList:fillingList});
                                            }} >删除</a></p>
                                            <p>张三丰 12312313123</p>
                                        </div>
                                    </div>
                                    <div
                                        className={styles['div_right']}
                                        style={{
                                            opacity:index===0 ? 1 : 0,
                                            borderColor: !this.state.fillingAdd ? '#7E96F4' : '#FB4E5C',
                                            color:!this.state.fillingAdd ? '#7E96F4' : '#FB4E5C',
                                        }}
                                        onClick={()=>{
                                            if(!(index===0)){return}
                                            this.setState({fillingAdd:!this.state.fillingAdd,fillingSelect:false});
                                    }}>
                                        <span>{this.state.fillingAdd ? '-' : '+'}</span>
                                    </div>
                                </div>
                                <div className={styles['order_modify_modal_filling']} >
                                    <p>加气站</p>
                                    <span>大家打算我殴打佛is的范德萨发山东</span>
                                </div>
                                <div className={styles['order_modify_modal_input']} >
                                    <div className={styles['div']} >
                                        <span className={styles['span']} >*</span>
                                        <p className={styles['p']} >计划数量</p>
                                        <Form.Item>
                                            <Input style={{width:200}} addonAfter={'吨'} />
                                        </Form.Item>
                                    </div>
                                    <div className={styles['div']} style={{marginLeft:100}} >
                                        <span style={{opacity:0}} className={styles['span']} >*</span>
                                        <p className={styles['p']} >卸货时间</p>
                                        <Form.Item>
                                             <DatePicker
                                                style={{width:200}}
                                                onChange={()=>{}}
                                                suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                             />
                                        </Form.Item>
                                    </div>
                                </div>
                                </div> :
                                <div className={styles['order_modify_modal_logistics']} style={{
                                    marginBottom:10}} >
                                    <span className={styles['span']} >*</span>
                                    <img className={styles['img']} src={require('@/assets/image/site_order_48_37.png')} />
                                    <Select
                                        autoFocus={true}
                                        defaultOpen={true}
                                        style={{width:756,marginLeft:28}}
                                        onChange={(value)=>{
                                            let fillingChangeList = this.state.fillingChangeList;
                                            fillingChangeList[index] = 1;
                                            this.setState({fillingChangeList:fillingChangeList});
                                    }}>
                                        <Option value="jack">Jack</Option>
                                    </Select>
                                </div>}
                                </div>
                            )
                        })}
                        <div className={styles['order_modify_modal_logistics']} style={{
                            marginBottom:10,
                            display:this.state.fillingAdd ? 'flex' : 'none',
                        }} >
                            <span className={styles['span']} >*</span>
                            <img className={styles['img']} src={require('@/assets/image/site_order_48_37.png')} />
                            {!this.state.fillingSelect ? <p className={styles['p']} onClick={()=>{
                                this.setState({fillingSelect:true},()=>{

                                });
                            }} >请选择承运物流商</p> :
                            <Select
                                autoFocus={true}
                                defaultOpen={true}
                                style={{width:756,marginLeft:28}}
                                onChange={(value)=>{
                                    let fillingList = this.state.fillingList;
                                    fillingList.push(1);
                                    let fillingChangeList = this.state.fillingChangeList;
                                    fillingChangeList.push(1);
                                    this.setState({campanyList:fillingList,fillingChangeList:fillingChangeList,fillingAdd:false,fillingSelect:false,});
                            }}>
                                <Option value="jack">Jack</Option>
                            </Select>}
                        </div>
                    </div>
                    {/*第三级调度*/}
                    <div className={styles['order_modify']} >
                        <div className={styles['order_modify_modal_logistics']} >
                            <span className={styles['span']} >*</span>
                            <img className={styles['img']} src={require('@/assets/image/Logistics_order_48_37.png')} />
                            {!this.state.logisticsStatus ?
                                <p className={styles['p']} onClick={()=>{
                                    this.setState({logisticsStatus:true});
                                }} >承运物流商：阿瓦达所</p> :
                                <Select
                                    style={{width:756,marginLeft:28}}
                                    autoFocus={true}
                                    defaultOpen={true}
                                    onChange={()=>{
                                    this.setState({logisticsStatus:false});
                                }}>
                                     <Option value="jack">Jack</Option>
                                </Select>}
                        </div>
                        {this.state.logisticsStatus ? <div style={{width:828,marginTop:25,height:326}} ></div> :
                        <div className={styles['order_modify_modal_input']} >
                            <div className={styles['div']} >
                                <span style={{opacity:0}} className={styles['span']} >*</span>
                                <p className={styles['p']} >计价方式</p>
                                <Form.Item>
                                    <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                         <Option value="jack">Jack</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className={styles['div']} style={{marginLeft:100}} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >付款方式</p>
                                <Form.Item>
                                    <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                         <Option value="jack">Jack</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className={styles['div']} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >运输距离</p>
                                <Form.Item>
                                    <Input style={{width:200}} addonAfter={'公里'} />
                                </Form.Item>
                            </div>
                            <div className={styles['div']} style={{marginLeft:100}} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >运输价格</p>
                                <Form.Item>
                                    <Input style={{width:200}} addonAfter={'元/吨'} />
                                </Form.Item>
                            </div>
                            <div className={styles['div']} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >额外费用</p>
                                <Form.Item>
                                    <Input style={{width:200}} addonAfter={'元'} />
                                </Form.Item>
                            </div>
                            <div className={styles['div']} style={{marginLeft:100}} >
                                <span style={{opacity:0}} className={styles['span']} >*</span>
                                <p className={styles['p']} >装货时间</p>
                                <Form.Item>
                                     <DatePicker
                                        showTime
                                        style={{width:200}}
                                        onChange={()=>{}}
                                        suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                     />
                                </Form.Item>
                            </div>
                            <div className={styles['div']} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >司机选择</p>
                                <Form.Item>
                                    <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                         <Option value="jack">Jack</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className={styles['div']} style={{marginLeft:100}} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >押运选择</p>
                                <Form.Item>
                                    <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                         <Option value="jack">Jack</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className={styles['div']} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >车头选择</p>
                                <Form.Item>
                                    <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                         <Option value="jack">Jack</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className={styles['div']} style={{marginLeft:100}} >
                                <span className={styles['span']} >*</span>
                                <p className={styles['p']} >车挂选择</p>
                                <Form.Item>
                                    <Select defaultValue="lucy" style={{width:200}} onChange={()=>{}}>
                                         <Option value="jack">Jack</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>}
                    </div>
                    {/*第四级采购*/}
                    <div className={styles['order_modify']} >
                                <div>
                                {!this.state.purchaseStatus ?
                                <div>
                                <div className={styles['order_modify_modal_company']} >
                                    <div className={styles['div_left']} >
                                        <span style={{color:'#FB4E5C',marginTop:'10px'}} >*</span>
                                        <img src={require('@/assets/image/gas_order_48_37.png')} />
                                        <div>
                                            <p>昆仑燃气有限公司山东分公司<span onClick={()=>{
                                                this.setState({purchaseStatus:true});
                                            }} >更改</span></p>
                                            <p>张三丰 12312313123</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['order_modify_modal_filling']} >
                                    <p>加气站</p>
                                    <span>大家打算我殴打佛is的范德萨发山东</span>
                                </div>
                                <div className={styles['order_modify_modal_input']} >
                                    <div className={styles['div']} >
                                        <span className={styles['span']} >*</span>
                                        <p className={styles['p']} >计划数量</p>
                                        <Form.Item>
                                            <Input style={{width:200}} addonAfter={'吨'} />
                                        </Form.Item>
                                    </div>
                                    <div className={styles['div']} style={{marginLeft:100}} >
                                        <span style={{opacity:0}} className={styles['span']} >*</span>
                                        <p className={styles['p']} >装货时间</p>
                                        <Form.Item>
                                             <DatePicker
                                                style={{width:200}}
                                                onChange={()=>{

                                                }}
                                                suffixIcon={<IconFont className='time-icon' type='icon-icon-test8' />}
                                             />
                                        </Form.Item>
                                    </div>
                                </div>
                                </div> :
                                <div className={styles['order_modify_modal_logistics']} style={{
                                    marginBottom:10}} >
                                    <span className={styles['span']} >*</span>
                                    <img className={styles['img']} src={require('@/assets/image/gas_order_48_37.png')} />
                                    <Select
                                        autoFocus={true}
                                        defaultOpen={true}
                                        style={{width:756,marginLeft:28}}
                                        onChange={(value)=>{
                                            this.setState({purchaseStatus:false});
                                    }}>
                                        <Option value="jack">Jack</Option>
                                    </Select>
                                </div>}
                                </div>
                    </div>
                    {/*最后级底部*/}
                    <div className={styles['order_modify_modal_foot']}>
                        <div className={styles['div_left']} >
                            <div>
                                <p>销售总量<span>20.00000吨</span></p>
                                <p style={{display:this.state.status===1 ? 'none' : 'inline-block'}} >采购总额<span>20.000吨</span></p>
                                <p style={{display:this.state.status===1 ? 'none' : 'inline-block'}} >利润总额<span>20.000吨</span></p>
                            </div>
                            <div style={{marginLeft:'50px'}} >
                                <p >销售总额<span>20.000吨</span></p>
                                <p style={{display:this.state.status===1 ? 'none' : 'inline-block'}} >运输费用<span>20.000吨</span></p>
                                <p style={{display:this.state.status===1 ? 'none' : 'inline-block'}} ><span></span></p>
                            </div>
                        </div>
                        <div className={styles['div_right']}>
                          <Button type='primary' style={{ marginRight: 10 }} loading={this.props.loading}
                                  onClick={this.scheduling}>确认修改</Button>
                          <Button className='red-btn' onClick={this.hideModal.bind(this)}>取消</Button>
                        </div>
                    </div>
                </div>
                </Form>
                </Modal>
            </div>
        )
    }






}
export default OrderModify;

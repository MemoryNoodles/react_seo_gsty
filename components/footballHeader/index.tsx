import React, { Component } from 'react';
import { Radio,Dropdown,Button,Select,Input,Carousel,Modal,Calendar,Popover,Checkbox } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { NextPage } from 'next';
import Link from 'next/link'
import { withRouter} from 'next/router'
import './index.less'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import apiFun from '../../api/apiFun';
import { handleBackData } from '../../utils/common';
import moment from 'moment';
import 'moment/locale/zh-cn';

interface HeadProps {
    isInstant:boolean,
    timeTabIndex:number|string,
    visible:boolean,
    isAll:boolean,
    gameStatusTabIndex:string,
    companyList:Array<any>,
    visibleEvent:boolean,
    eventList:Array<any>,
    leagueList:object,
    visibleTrend:boolean,
    presentCompany:number,
    leagueListSc:object,
    hiddenNumber:number,
    finishMatch:any,
    inputVal:string,
    resultMatch:Array<any>,
    calendarVal:any,
}
const { Option } = Select;

function  GetGamestate (props) {
    const {isInstant,gameStatusTabIndex,isAll,letComplete,hiddenNumber,leagueList,changeEventCheck,changeVisibleEvent,visibleEvent,changeInput} = props
    return <div className="left-screening">
        {getTab(gameStatusTabIndex=='0'?false:true,'即时','/footballScore')}
        {getTab(gameStatusTabIndex=='1'?false:true,'完场','/footballScoreEnd')}
        {getTab(gameStatusTabIndex=='2'?false:true,'赛程','/footballSchedule')}
        <Button type={isAll?'primary':'default'} shape="round" onClick={()=>letComplete()}>
            完整
            {hiddenNumber?<span>（隐藏{hiddenNumber}场）</span>:''}
        </Button>
        {!isInstant?
            <Popover
                content={<a>{hide(leagueList,'league',changeEventCheck,changeVisibleEvent,changeInput)}</a>}
                trigger="click"
                visible={visibleEvent}
                onVisibleChange={()=>changeVisibleEvent(1,'league')}
            >
                <Button className="select-btn">请选择赛事<DownOutlined /></Button>
            </Popover>: ''}
    </div>
}
function getTab(type,name,address) {
    if(type) {
        return <Button type={'default'} shape="round">
            <Link href={address} prefetch>
                <a target="_blank" rel="noopener noreferrer">
                    {name}
                </a>
            </Link>
        </Button>
    } else {
        return <Button type={'primary'} shape="round">{name}</Button>
    }
}

function GetGameScreen(props) {
    const {isInstant,companyList,visibleEvent,changeVisibleEvent,leagueList,visibleTrend,getTrend,changeEventCheck,changeInput,inputVal} = props
    return (
        isInstant?<div className="screen-style">
        <Select defaultValue={companyList?companyList[0].companyId:''} style={{ width: 120 }} onChange={(e)=>getTrend(e)}>
            {companyList?companyList.map((item,index)=>{
                return <Option key={index} value={item.companyId}>{item.companyName}</Option>
            }):''}
        </Select>
        <Popover
            content={<a>{hide(leagueList,'league',changeEventCheck,changeVisibleEvent,changeInput)}</a>}
            trigger="click"
            visible={visibleEvent}
            onVisibleChange={()=>changeVisibleEvent(1,'league')}
        >
            <Button className="select-btn">请选择赛事<DownOutlined /></Button>
        </Popover>
        
        {/* <Select defaultValue="请选择赛事" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select> */}
        {/* <Popover
            content={<a>{hide(leagueList,'trend')}</a>}
            trigger="click"
            visible={visibleTrend}
            onVisibleChange={()=>changeVisibleEvent(1,'trend')}
        >
            <Button type="primary">请选择走势</Button>
        </Popover> */}
        </div>:<div className="screen-style">
            <Input value={inputVal} placeholder="搜索赛事名称或球队名称" onChange={(e)=>changeInput(e.target.value,false)}/>
            <Button type="primary" ghost shape="round" onClick={()=>changeInput('',true)}>
                搜索
            </Button>
        </div>
    )
}
function hide(params,val,changeEventCheck,changeVisibleEvent,changeInput) {
    if(val === 'league') {
        return <div className="event-style">
            <div className="event-style-h">
                {
                    Object.keys(params).map((item,index)=>{
                        return <div>
                        <div className="event-title">{item}</div>
                        <div className="event-content">
                            {params[item].map((item2,index2)=>{
                                return <Checkbox checked={item2.isChecked} onChange={()=>onChange(params,item,index2,changeEventCheck)}>{item2.name}（{item2.number}）</Checkbox>
                            })}
                        </div>
                    </div>
                    })
                }
            </div>
            <div className="event-foot">
                <div onClick={()=>changeChecked(params,changeEventCheck,true)}>全选</div>
                <div onClick={()=>changeChecked(params,changeEventCheck,false)}>反选</div>
                <div onClick={()=>(changeEventCheck(params,false),changeVisibleEvent(1,'league'),changeInput('',false),changeInput('1',true))}>确定</div>
                <div onClick={()=>(changeEventCheck(params,true),changeVisibleEvent(1,'league'))}>取消</div>
            </div>
        </div>
    } else {
        return <div>123</div>
    }
}

function changeChecked(params,changeEventCheck,val) {
    Object.keys(params).map((item,index)=>{
            params[item].map((item2,index2)=>{
                if(val) {
                    item2.isChecked = true
                } else {
                    item2.isChecked = !item2.isChecked
                }
            })
    })
    changeEventCheck(params,true)
}
function onChange(params,item,index,changeEventCheck) {
    params[item][index].isChecked = !params[item][index].isChecked
    changeEventCheck(params,true)
}

function GetBanner(props) {
    return <div></div>
    // return <Carousel>
    //     <div>
    //         <h3>1</h3>
    //     </div>
    //     <div>
    //         <h3>2</h3>
    //     </div>
    // </Carousel>
}
function GetTimeScreen(props) {
    const {resultMatch,timeTabIndex,onChangeIndex,showModal,router } = props
    return <div className="time-screen-type">
            {resultMatch.map((item,index)=>{
                return  <a className={`time-details ${timeTabIndex===fun_date(item)?'on-checked':''}`}  href={`${router.pathname}?date=${moment(fun_time(item)).format('YYYYMMDD')}`}>
                    <div>
                        {fun_date(item)}
                    </div>
                    <div>
                        {fun_week(item)}
                    </div>
                </a>
            })}
            <div className="calendar">
                <img src="../../static/image/calendar.png" alt="" onClick={()=>showModal()}/>
            </div>
    </div>
}
function fun_time(num) {
    var date1 = new Date();
    //今天时间
    var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
    //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    var time2 = date2.getFullYear() + "-" +  (date2.getMonth() + 1<10?('0'+(date2.getMonth() + 1)):(date2.getMonth() + 1)) + "-" + (date2.getDate()<10?('0'+date2.getDate()):date2.getDate()); 
    return time2;
}
function fun_date(num) { 
    var date1 = new Date();
    //今天时间
    var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
    //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    var time2 = (date2.getMonth() + 1<10?('0'+(date2.getMonth() + 1)):(date2.getMonth() + 1)) + "-" + (date2.getDate()<10?('0'+date2.getDate()):date2.getDate()); 
    return time2;
}
function fun_week(num){
    var date1 = new Date();
    //今天时间
    var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
    //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1<10?('0'+(date2.getMonth() + 1)):(date2.getMonth() + 1)) + "-" + (date2.getDate()<10?('0'+date2.getDate()):date2.getDate()); 
    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    var week = weekArray[new Date(time2).getDay()];
    return week;
}
class HeaderScreening extends Component<any, HeadProps> {
  constructor(props) {
    super(props);
    this.state = {
        isInstant: true,
        isAll:false,
        gameStatusTabIndex:'0',
        timeTabIndex:'',
        visibleTrend:false,
        visibleEvent:false,
        visible:false,
        eventList:[],
        companyList:[],
        presentCompany:0,
        leagueList:{},
        leagueListSc:{},
        hiddenNumber:0,
        finishMatch:'',
        inputVal:'',
        resultMatch:[],
        calendarVal:'',
    };
  }
    componentDidMount () {
        const {companyList,eventList,finishMatch,futureMatchList} = this.props
        const route = this.props.router.pathname
        let nowTime = moment(new Date()).format('MM-DD');
        if(this.props.router.query.date) {
            nowTime = moment(this.props.router.query.date).format('MM-DD')
        }
        if(route.indexOf('footballScoreEnd') == 1) {
            const  resultMatch= [-6,-5,-4,-3,-2,-1,0]
            this.setState({isInstant:false,gameStatusTabIndex:'1',companyList:companyList,eventList:finishMatch,resultMatch,timeTabIndex:String(nowTime)},()=>{
                this.filterLeague()
            });
        } else if (route.indexOf('footballSchedule') == 1) {
            const  resultMatch= [0,1,2,3,4,5,6]
            this.setState({isInstant:false,gameStatusTabIndex:'2',companyList:companyList,eventList:futureMatchList,resultMatch,timeTabIndex:String(nowTime)},()=>{
                this.filterLeague()
            });
        } else {
            this.setState({companyList:companyList,eventList:eventList},()=>{
                this.filterLeague()
                this.getTrend(companyList?companyList[0].companyId:'')
            })
        }
    }
    async filterLeague () {
        const {eventList,finishMatch} = this.state
        const filterLeagueRes = await apiFun.filterLeague({type:1});
        const filterLeague = handleBackData(filterLeagueRes);
            
        Object.keys(filterLeague).map((d,i)=>{
            filterLeague[d].map((item2,index2)=>{
                item2.number = 0
                eventList.map((item,index)=>{
                    item2.isChecked = true
                    if(item2.id == item.leagueId) {
                        item2.number ++
                    }
                })
            })
        })
        this.setState({leagueList:filterLeague,leagueListSc:JSON.parse(JSON.stringify(filterLeague))});
    }
    changeEventCheck(params,val) {
        const {changeShowEvent} = this.props
        params = JSON.parse(JSON.stringify(params))
        if(val) {
            this.setState({leagueList:params});
        } else {
            let eventArr = []
            let hiddenNumber = 0
            // if(params.length) {
                Object.keys(params).map((item,index)=>{
                    params[item].map((item2,index2)=>{
                        if(item2.isChecked) {
                            eventArr.push(item2.id)
                        } else {
                            hiddenNumber = hiddenNumber + item2.number
                        }
                    })
                })
                this.setState({leagueList:params,leagueListSc:params,hiddenNumber});
                changeShowEvent(eventArr)
            // }
        }
    }
    changeInput(e,i) {
        const {inputVal} = this.state
        const {changeSearchContent} = this.props
        if (i) {
            if(e) {
                changeSearchContent('')
            } else {
                changeSearchContent(inputVal)
            }
        } else {
            this.setState({inputVal:e});
        }
    }
    getTrend(id) {
        const {changeCompany} = this.props
        const {eventList} = this.state
        changeCompany(id)
    }
    onChangeIndex (index) {
        this.setState({timeTabIndex:index})
    }
    // 完整
    letComplete () {
        const {changeShowEvent} = this.props
        const {leagueList} = this.state


        
        Object.keys(leagueList).map((item,index)=>{
            leagueList[item].map((item2,index2)=>{
                item2.isChecked = true
            })
        })
        this.setState({isAll:true,inputVal:''},()=>{
            this.changeInput('',true)
        })
        this.changeEventCheck(leagueList,false)
    }
    handleOk = e => {
        console.log()
        const {calendarVal} = this.state
        const router = this.props.router.pathname
        if(calendarVal) {
            let time = String(moment(calendarVal).format('YYYYMMDD'))
            window.location.href = `${router}?date=${time}`
        } else {
            let nowTime = String(moment(new Date()).format('YYYYMMDD'));
            window.location.href = `${router}?date=${nowTime}`
        }
        this.setState({
            visible: false,
            calendarVal:''
        });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            calendarVal:''
        });
    };
    changeVisibleEvent = (e,i) => {
        const {visibleEvent,visibleTrend,leagueListSc} = this.state
        if(e===1){
            if(i === 'league') {
                this.setState({
                    visibleEvent: !visibleEvent,
                    leagueList:JSON.parse(JSON.stringify(leagueListSc))
                });
            } else {
                this.setState({
                    visibleTrend: !visibleTrend,
                });
            }
        } else if (e===2) {
            if(i === 'league') {
                this.setState({
                    visibleEvent:false,
                    leagueList:JSON.parse(JSON.stringify(leagueListSc))
                });
            } else {
                this.setState({
                    visibleTrend:false,
                });
            }
        }
    };
    onSelect(value) {
        this.setState({calendarVal:String(value.format('YYYY-MM-DD'))});
    }
    public render() {
        const {isInstant,timeTabIndex,gameStatusTabIndex,isAll,visibleEvent,leagueList,visibleTrend,hiddenNumber,inputVal,resultMatch} = this.state
        const {companyList} = this.props
        return  <div className="header-content content-screening-header">
                    <div className="header-screening">
                        <GetGamestate 
                            hiddenNumber={hiddenNumber} 
                            isInstant={isInstant} 
                            gameStatusTabIndex={gameStatusTabIndex} 
                            isAll={isAll} 
                            letComplete={()=>this.letComplete()}
                            changeVisibleEvent={(e,i)=>this.changeVisibleEvent(e,i)} 
                            visibleEvent={visibleEvent} 
                            leagueList={leagueList}
                            changeEventCheck={(e,i)=>this.changeEventCheck(e,i)}
                            changeInput={(e,i)=>this.changeInput(e,i)}
                        />
                        <GetGameScreen 
                            visibleTrend={visibleTrend} 
                            isInstant={isInstant} 
                            companyList={companyList} 
                            visibleEvent={visibleEvent} 
                            changeVisibleEvent={(e,i)=>this.changeVisibleEvent(e,i)} 
                            getTrend={(e)=>this.getTrend(e)}
                            changeEventCheck={(e,i)=>this.changeEventCheck(e,i)}
                            changeInput={(e,i)=>this.changeInput(e,i)}
                            inputVal={inputVal}
                            leagueList={leagueList}
                        />
                    </div>
                    {isInstant?<GetBanner/>:<GetTimeScreen router={this.props.router} resultMatch={resultMatch} timeTabIndex={timeTabIndex} onChangeIndex={(index)=>this.onChangeIndex(index)} showModal={()=>this.showModal()}/>}
                    <Modal
                        title="日期"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={600}
                        >
                    <Calendar onSelect={(value)=> this.onSelect(value)} locale={locale} fullscreen={false}/>
                    </Modal>
        </div>
    }
}

export default withRouter(HeaderScreening)

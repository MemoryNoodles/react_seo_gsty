import { AxiosResponse } from 'axios';
import fetch from '../utils/fetch';
import * as C from './interface';
import config from '../constants/config';
import hex_md5 from '../utils/md5.js';
const handleFetch = (
  url: string, //请求路径
  params: object = {}, //请求参数
  method: string = 'GET', //请求方式  GET or POST
  useToken: boolean = false, //是否需要token
) => {
  let encryt = {
    appid: config.appid, //appid
    ...params,
  };
  let val = 'a4eb1fb1002c40fea06950c0107411f9'; //私钥
  var keys = Object.keys(encryt).sort();
  let encrytionStr = '';
  for (var i = 0; i < keys.length; i++) {
    encrytionStr += `${keys[i]}=${encryt[keys[i]]}${
      i == keys.length - 1 ? '@' + val : '&'
      }`;
  }
  const newParams = {
    ...params,
    k: hex_md5(encrytionStr),
    appid: config.appid,
  };
  // console.log(newParams, "12313123")
  return fetch({
    method,
    useToken,
    url: url,
    data: newParams,
  });
};

const apiFun: any = {
  testApi: (params: object = {}) => handleFetch(C.TEST_API, params), //示例接口调用函数
  goalsList: (params: object = {}) => handleFetch(C.GOALS, params), //获取进球数列表
  battleLetBallList: (params: object = {}) => handleFetch(C.BATTLE_LET_BALL, params),  //让球
  historyBout: (params) => handleFetch(C.HISTORY_BOUT, params),//历史交锋
  lateFight: (params) => handleFetch(C.LATE_FIGHT, params),//近期战绩
  matchRankList: (params) => handleFetch(C.MATCH_RANKLIST, params),//联赛积分
  matchFuture: (params) => handleFetch(C.MATCH_FUTURE, params),//未来赛事
  oddInTime: (params) => handleFetch(C.ODDS_INTIME, params),//赛中及时赔率
  matchDetail: (params) => handleFetch(C.MATCH_DETAIL, params),//获取比赛基础信息
  matchBattle: (params) => handleFetch(C.MATCH_BATTLE, params),//比赛阵容

  leagueAll: (params: object = {}) => handleFetch(C.LEAGUE_ALL, params),//资料库获取所有联赛
  homeMatchList: (params: object = {}) => handleFetch(C.HOME_MATCH_LIST, params),//(首页比赛接口数据)
  homeLeagueRank: (params: object = {}) => handleFetch(C.HOME_LEAGUE_RANK, params),//(首页联赛积分排行)
  europeanOddsList: (params: object = {}) => handleFetch(C.EUROPEAN_ODDS, params),  //欧赔
  bannerList: (params: object = {}) => handleFetch(C.BANNER_LIST, params),//((获取banner列表))


  leagueQuarter: (params: object = {}) => handleFetch(C.LEAGUE_QUARTER, params),//((联赛下的季度))
  quarterBase: (params: object = {}) => handleFetch(C.QUARTER_BASE, params),//((赛季基本信息))
  quarterMatch: (params: object = {}) => handleFetch(C.QUARTER_MATCH, params),//获取季度下的比赛
  matchRank: (params: object = {}) => handleFetch(C.MATCH_RANK, params),//获取季度下的比赛
  statTeam: (params: object = {}) => handleFetch(C.STAT_TEAM, params),//球队统计查询
  statMember: (params: object = {}) => handleFetch(C.STAT_MEMBER, params),//球员统计查询
  quarterAsia: (params: object = {}) => handleFetch(C.QUARTER_ASIA, params),//赛季让球统计
  quarterBig: (params: object = {}) => handleFetch(C.QUARTER_BIG, params),//赛季大小球统计
  quarterBQ: (params: object = {}) => handleFetch(C.QUARTER_BQ, params),//赛季半全场统计
  teamBase: (params: object = {}) => handleFetch(C.TEAM_BASE, params),//球队明细
  teamMatch: (params: object = {}) => handleFetch(C.TEAM_MATCHE, params),//球队赛程
  teamBattle: (params: object = {}) => handleFetch(C.TEAM_BATTLE, params),//球队阵容



  quarterInTime: (params: object = {}) => handleFetch(C.QUARTER_INTIME, params),//((足球即时比分))
  matchFast: (params: object = {}) => handleFetch("http://www.lttiandi.com/"+C.MATCH_FAST, params),//((即时获取足球即时比分))
  getCompanyList: (params: object = {}) => handleFetch(C.GET_COMPANYLIST, params),//((获取赔率公司列表))
  finishMatch: (params: object = {}) => handleFetch(C.MATCH_FINISHMATCH, params),//((获取完场比赛))

  futureMatchList: (params: object = {}) => handleFetch(C.FUTURE_MATCHLIST, params),//((获取比赛赛程))
  filterLeague: (params: object = {}) => handleFetch(C.FILTER_LEAGUE, params),//((获取联赛))
  european_detail: (params: object = {}) => handleFetch(C.EUROPE_DETAIL, params),//((SEO官网欧赔详情))
  asia_detail: (params: object = {}) => handleFetch(C.ASIA_DETAIL, params),//((SEO官网赔率详情))
  size_detail: (params: object = {}) => handleFetch(C.SIZE_DETAIL, params),//((SEO官网大小球赔率明细))
};
export default apiFun;

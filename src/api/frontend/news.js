import axios from "@/axios"
import config from "@/config"
// 获取分页的新闻列表
export function getNewsByType(data) {
    const requestData = {
        page: parseInt(data.page),
        size: parseInt(data.size),
        type: data.type
    };
    return axios.get("/api/news/getPage", { params: requestData })
}

// 获取新闻热搜
export function getHotNews(data) {
    const requestData = {
        type: data.type
    };
    return axios.get("/api/news/getHotList", { params: requestData })
}

export function  getMoreNews(data) {
    return axios.get("/api/news/moreRelated", data)
}

export function getNewsDetail(data) {
    const requestData = {
        id: data.id,
        type: data.type,
        date: data.date
    }
    return axios.get("/api/news/getDetail", { params: requestData })
}

export function getMoreLike(data) {
    const requestData = {
        type: data.type,
    }
    return axios.get("/api/news/moreRelated", { params: requestData })
}

export function getAI(data) {
    const requestData = {
        id: data.id,
        type: data.type,
        date: data.date,
        q: data.q
    }
    return axios.get("/api/news/ai", { params: requestData })
}

export function searchNews(data) {
    const requestData = {
        keyword: data.keyword,
        type: data.type,
    }
    return axios.get("/api/news/search", { params: requestData })
}

export function getCode(data) {
    return axios.get("/api/news/getCode", data)
}

export function subscribeNews(data) {
    return axios.post("/api/news/subscribe", data)
}

export function getNewsCount() {
    return axios.get("/api/news/getNewsCount")
}
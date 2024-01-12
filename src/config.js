export default {
    url: "http://172.16.3.4:8104",
    getIndex: function (type) {
        const chineseTypes = ["生活", "国内", "国际", "经济", "体育", "IT", "科学", "地域"];
        const japaneseTypes = ["生活", "国内", "国際", "経済", "スポーツ", "IT", "科学", "地域"];
        if (chineseTypes.includes(type)) {
            return chineseTypes.indexOf(type);
        } else if (japaneseTypes.includes(type)) {
            return japaneseTypes.indexOf(type);
        } else {
            return -1;
        }
    },

    getType: function (index) {
        const chineseTypes = ["生活", "国内", "国际", "经济", "体育", "IT", "科学", "地域"];
        const japaneseTypes = ["生活", "国内", "国際", "経済", "スポーツ", "IT", "科学", "地域"];
        if (index >= 0 && index < chineseTypes.length) {
            return {
                CN: chineseTypes[index],
                JP: japaneseTypes[index]
            }
        }
    }
}
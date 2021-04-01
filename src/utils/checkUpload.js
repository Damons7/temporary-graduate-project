//传数据校验
export const checkUpload = (data) => {
    let msg = "";
    if (data.name.length < 1) {
        msg = "商品名称不为空";
        return msg
    }
    if (data.num < 0) {
        msg = "商品数量不能小于1";
        return msg
    }
    if (!(parseInt(data.num, 10) == data.num)) {
        msg = "商品数量格式错误";
        return msg
    }
    if (data.price < 0.01 || data.selling_price < 0.01) {
        msg = "商品价格不能小于0.01";
        return msg
    }
    if (data.title.length < 1) {
        msg = "商品标题不能为空";
        return msg
    }
    if (data.intro.length < 1) {
        msg = "商品介绍不能为空";
        return msg
    }
    const imgArr = this.$refs.upload.uploadFiles;
    if (imgArr.length < 1) {
        msg = "请上传商品图片";
        return msg
    }
    return msg;
}


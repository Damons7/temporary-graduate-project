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

//传图片前对图片进行格式校验
export const beforeAvatarUpload = (file) => {
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    let msg = '';
    if (!isJPG && !isPNG) {
        msg = "仅支持 JPG, PNG 格式!";
    }
    if (!isLt2M) {
        msg = "图片大小必须小于2MB";
    }
    return msg;
}

//转base64
export const getBase64Image = (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    const dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

//Base64字符串转二进制
export const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime,
    });
}
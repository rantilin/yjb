// 公共的toast弹窗
function toast(msg, txts) {
    var types;
    if (txts == undefined) {
        types = 'txt'
    } else {
        types = txts
    }
    return this.$createToast({
        txt: msg,
        type: types
    }).show();
}
export { toast }
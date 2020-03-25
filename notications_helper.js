function notifyPendingFn(billConfig, daysLeft) {
    console.log("Bill payment is pending for ", billConfig.name, " ", daysLeft, " days left to pay");
}

function notifyUpcomingFn(billConfig, daysLeft) {
    console.log("Bill payment is upcoming for ", billConfig.name, " ", daysLeft, " days left to pay");
}

function notifyGoneFn(billConfig, daysGone) {
    console.log("Bill payment is gone :( for ", billConfig.name, " ", daysGone, " days ago");
}
module.exports = {notifyPending:notifyPendingFn,notifyUpcoming:notifyUpcomingFn,notifyGone:notifyGoneFn}

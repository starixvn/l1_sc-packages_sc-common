import { formatNumberWithComma } from "./number-helper";

export default {
    cannotPlaceBet: "Không thể đặt cược vào lúc này.",
    placeBetNextRound: "Vui lòng đặt cược ở phiên sau.",
    minBet: (min) => `Tiền cược tối thiểu là ${formatNumberWithComma(min)}`,
    maxBet: (max) => `Tổng tiền cược tối đa ở phiên này là ${formatNumberWithComma(max)}`,
    notEnoughMoney: "Bạn hiện không có đủ tiền để cược.",
    maxBetForChoice: (maxBetForChoice) => `Tiền cược tối đa ở cửa này là ${formatNumberWithComma(maxBetForChoice)}`,
    invalidBet: "Cược không hợp lệ.",
    notice: "Thông báo",
    youOrOtherLoggedInToThisAccount: (game) => `Bạn hoặc ai đó đang chơi ${game} bằng tài khoản này.`,
    closeAccount: "Tài khoản đã bị đóng. Phiên đăng nhập sẽ hết hạn sau 10 giây. Vui lòng liên hệ với cấp trên để biết thêm chi tiết.",
    unauthorized: "Đăng nhập thất bại!",
    underMaintenance: "Game đang được bảo trì, vui lòng quay lại sau 10 phút.",
    notEnoughScoin: "Bạn hiện không có đủ Scoin để cược.",
};

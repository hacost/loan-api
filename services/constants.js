const DOMINGO = 0;
const STATUS = {
  cancelled: 1,
  pending: 2,
  requested: 3,
  passed: 4,
  normal: 5,
  late: 6,
  paidOut: 7,
  paymentReceivedByCollector: 10,
  paymentReceivedByCoordinator: 11
};

const LOAN_CONDITIONS = {
  profitPercentage: 15,
  paydays: 23,
  profitPercentageForTotalDebt: 1.15
}

module.exports = {DOMINGO, STATUS, LOAN_CONDITIONS};
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
  profitPercentageForTotalDebt: 1.15,
  daysOfGrace: 1
}

const ROLES = {
  customer: 1,
  coordinator: 2,
  debtCollector: 3,
  admin: 4
}

const TEMPLATES = {
  main: 'main.html',
  header: 'header.html',
  footer: 'footer.html',
};


module.exports = {DOMINGO, STATUS, LOAN_CONDITIONS, ROLES, TEMPLATES};
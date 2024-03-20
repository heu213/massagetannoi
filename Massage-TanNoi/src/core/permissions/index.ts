import { PERMISSION_CORE_ACTIONS , RESOURCES_NAME } from './constants';

export const CORE_RESOURCES = {
  branch: 'branch',
  companyInfo: 'companyInfo',
  employee: 'employee',
  user: 'user',
  userGroup: 'userGroup',
  customer: 'customer',
  notificationBotManager: 'notificationBotManager',
  potentialCustomer: 'potentialCustomer',
  patient: 'patient',
  quotations: 'quotations',
  banner: 'banner',
  potentialPartner: "potentialPartner",
  managerAppointment: "managerAppointment",
  giveCoupon: 'giveCoupon',
  affiliatedAppointment: "affiliatedAppointment",
  referral:'referral',
  serviceBranch:'serviceBranch',
  medicalClinic: 'medicalClinic',
  announcement: 'announcement',
  configuration: 'configuration',
  leadingPartner: 'leadingPartner',
  discountCode: 'discountCode',
  policy: 'policy',
  shippingCompany: 'shippingCompany',
  highlight: 'highlight',
  productDelivery:'productDelivery',
  managerClinic: 'managerClinic',
  acceptService: 'acceptService',
  todoList: 'todoList',
  system: 'system',
  userGroupService: 'userGroupService',

}

export const PHARMACY_RESOURCES = {
  ...CORE_RESOURCES,
  order: 'order',
  pharmacy: 'pharmacy'
};

export const CLINIC_RESOURCES = {
  ...CORE_RESOURCES,
  // order: 'order',
  appointment: 'appointment',
  chartClinic: 'chartClinic'
};

export const WORLD_HEALTH_RESOURCES = {
  ...CORE_RESOURCES,
  whBill: 'whBill',
  whAppointment: 'whAppointment',
  whPartner: 'whPartner',
  whPackageLevel: 'whPackageLevel',
  // whService: 'whService',
  // whSessionOfDay: 'whSessionOfDay',
  // whCategory: 'whCategory',
  whSetting: 'whSetting',
  whUpdateBillStatus: 'whUpdateBillStatus',
  whUpdateReceiptAndPaymentVoucherStatus: 'whUpdateReceiptAndPaymentVoucherStatus',
  whHistoryLog: 'whHistoryLog',
  quotations: 'quotations',
  banner:'banner',
  whCourseTraining:'whCourseTraining',
  whRevenuePartner:'whRevenuePartner',
  whRevenueCustomer:'whRevenueCustomer',
  whRevenueSystem:'whRevenueSystem',
  whTransaction:'whTransaction',
  whMedicalEquipment:'whMedicalEquipment',
  whTips:'whTips',
  whVouchers:'whVouchers',
  whbeginninFund:'whbeginninFund',
  whHealthcareFacility:'whHealthcareFacility',
  warehouse:'warehouse',
  whRequestVoucher : 'whRequestVoucher',
  whappointmentCancelPartner:'whappointmentCancelPartner',
  keywordSearch:'keywordSearch',
  whServiceGroup: 'whServiceGroup',
  whService: 'whService',
  whTimeRegulation: 'whTimeRegulation',
  whCredential: 'whCredential',
  whPosition: 'whPosition',
  whExperience: 'whExperience',
  whProfessionalStaff: 'whProfessionalStaff',
  whJobStandard: 'whJobStandard',
  whCustomerEvaluation: 'whCustomerEvaluation',
  whServiceBookingInstructionsSetup: 'whServiceBookingInstructionsSetup',
  whChartDashboardHealthCare: 'whChartDashboardHealthCare',
  whErrorOfPharmacy: 'whErrorOfPharmacy',
  whHistoryLogVoucher: 'whHistoryLogVoucher',
  todoConfigStatus: 'todoConfigStatus',
  history:'history',
};

export const ROOT_RESOURCES = {
  ...CORE_RESOURCES,
  ...CLINIC_RESOURCES,
  ...WORLD_HEALTH_RESOURCES,
  partner: 'partner',
  cms: 'cms',
}

export const CORE_ACTIONS = {
  read: 'read',
  write: 'write',
  delete: 'delete',
  update: 'update',
  download: 'download'
}

export const ROOT_ACTIONS = {
  ...CORE_ACTIONS,
  admin: 'admin',
}

export const ACTIONS = [
  {
    key: CORE_ACTIONS.read,
    name: PERMISSION_CORE_ACTIONS.read,
  },
  {
    key: CORE_ACTIONS.write,
    name: PERMISSION_CORE_ACTIONS.write,
  },
  {
    key: CORE_ACTIONS.delete,
    name: PERMISSION_CORE_ACTIONS.delete,
  },
  {
    key: CORE_ACTIONS.update,
    name: PERMISSION_CORE_ACTIONS.update,
  },
  {
    key: CORE_ACTIONS.download,
    name: PERMISSION_CORE_ACTIONS.download,
  },
  {
    key: ROOT_ACTIONS.admin,
    name: PERMISSION_CORE_ACTIONS.admin,
  },
];

export const RESOURCES = [
  {
    key: ROOT_RESOURCES.notificationBotManager,
    name: RESOURCES_NAME.notificationBotManager
  },
  {
    key: CORE_RESOURCES.branch,
    name: RESOURCES_NAME.branch,
  },
  {
    key: CORE_RESOURCES.userGroup,
    name: RESOURCES_NAME.userGroup,
  },
  {
    key: CORE_RESOURCES.user,
    name: RESOURCES_NAME.user,
  },
  {
    key: CORE_RESOURCES.employee,
    name: RESOURCES_NAME.employee,
  },
  {
    key: CORE_RESOURCES.giveCoupon, 
    name: RESOURCES_NAME.giveCoupon  
  },
  {
    key: CORE_RESOURCES.customer,
    name: RESOURCES_NAME.customer,
  },
  {
    key: CORE_RESOURCES.medicalClinic,
    name: RESOURCES_NAME.medicalClinic,
  },
  {
    key: CORE_RESOURCES.announcement,
    name: RESOURCES_NAME.announcement,
  },
  {
    key: CORE_RESOURCES.configuration,
    name: RESOURCES_NAME.configuration,
  },
  {
    key: CORE_RESOURCES.leadingPartner,
    name: RESOURCES_NAME.leadingPartner,
  },
  {
    key: CORE_RESOURCES.discountCode,
    name: RESOURCES_NAME.discountCode,
  },
  {
    key: CORE_RESOURCES.policy,
    name: RESOURCES_NAME.policy,
  },
  {
    key: CORE_RESOURCES.shippingCompany,
    name: RESOURCES_NAME.shippingCompany,
  },
  {
    key: CORE_RESOURCES.highlight,
    name: RESOURCES_NAME.highlight,
  },
  {
    key: WORLD_HEALTH_RESOURCES.serviceBranch,
    name: RESOURCES_NAME.whServiceBranch
  },
  {
    key: WORLD_HEALTH_RESOURCES.acceptService,
    name: RESOURCES_NAME.acceptService
  },
  {
    key: WORLD_HEALTH_RESOURCES.todoList,
    name: RESOURCES_NAME.todoList
  },
  {
    key: CORE_RESOURCES.system,
    name: RESOURCES_NAME.system,
  },
  {
    key: CORE_RESOURCES.userGroupService,
    name: RESOURCES_NAME.userGroupService,
  },
  {
    key: CLINIC_RESOURCES.chartClinic,
    name: RESOURCES_NAME.chartClinic,
  },
  {
    key: ROOT_RESOURCES.partner,
    name: RESOURCES_NAME.partner,
  },
  {
    key: CLINIC_RESOURCES.appointment,
    name: RESOURCES_NAME.appointment,
  },
  {
    key: CORE_RESOURCES.affiliatedAppointment, 
    name: RESOURCES_NAME.affiliatedAppointment
  },
  {
    key: PHARMACY_RESOURCES.order,
    name: RESOURCES_NAME.order,
  },
  {
    key: PHARMACY_RESOURCES.pharmacy,
    name: RESOURCES_NAME.pharmacy,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whChartDashboardHealthCare,
    name: RESOURCES_NAME.whChartDashboardHealthCare
  },
  {
    key: WORLD_HEALTH_RESOURCES.whBill,
    name: RESOURCES_NAME.whBill,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whAppointment,
    name: RESOURCES_NAME.whAppointment,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whUpdateBillStatus,
    name: RESOURCES_NAME.whUpdateBillStatus,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whUpdateReceiptAndPaymentVoucherStatus,
    name: RESOURCES_NAME.whUpdateReceiptAndPaymentVoucherStatus,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whHistoryLog,
    name: RESOURCES_NAME.whHistoryLog,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whPartner,
    name: RESOURCES_NAME.whPartner,
  },
  {
    key: WORLD_HEALTH_RESOURCES.quotations,
    name: RESOURCES_NAME.quotations
  },
  {
    key: WORLD_HEALTH_RESOURCES.whPackageLevel,
    name: RESOURCES_NAME.whPackageLevel
  },
  {
    key: WORLD_HEALTH_RESOURCES.banner,
    name: RESOURCES_NAME.banner,
  }, 
  {
    key: WORLD_HEALTH_RESOURCES.potentialPartner, 
    name: RESOURCES_NAME.potentialPartner
  },
  {
    key: WORLD_HEALTH_RESOURCES.whCourseTraining, 
    name: RESOURCES_NAME.whCourseTraining
  },
  {
    key: WORLD_HEALTH_RESOURCES.whRevenuePartner, 
    name: RESOURCES_NAME.whRevenuePartner
  },
  {
    key: WORLD_HEALTH_RESOURCES.whRevenueCustomer, 
    name: RESOURCES_NAME.whRevenueCustomer
  },
  {
    key: WORLD_HEALTH_RESOURCES.whRevenueSystem, 
    name: RESOURCES_NAME.whRevenueSystem
  },
  {
    key: WORLD_HEALTH_RESOURCES.whVouchers, 
    name: RESOURCES_NAME.whVouchers
  },
  {
    key: WORLD_HEALTH_RESOURCES.whbeginninFund, 
    name: RESOURCES_NAME.whbeginninFund
  },
  {
    key: WORLD_HEALTH_RESOURCES.whTransaction, 
    name: RESOURCES_NAME.whTransaction
  },
  {
    key: WORLD_HEALTH_RESOURCES.whMedicalEquipment, 
    name: RESOURCES_NAME.whMedicalEquipment
  },
  {
    key: WORLD_HEALTH_RESOURCES.whTips, 
    name: RESOURCES_NAME.whTips
  },
  {
    key: WORLD_HEALTH_RESOURCES.whHealthcareFacility,
    name: RESOURCES_NAME.whHealthcareFacility
  },
  {
    key: WORLD_HEALTH_RESOURCES.whRequestVoucher,
    name: RESOURCES_NAME.whRequestVoucher
  },
  {
    key: WORLD_HEALTH_RESOURCES.whappointmentCancelPartner,
    name: RESOURCES_NAME.whappointmentCancelPartner
  },
  {
    key: WORLD_HEALTH_RESOURCES.warehouse,
    name: RESOURCES_NAME.warehouse
  },
  {
    key: WORLD_HEALTH_RESOURCES.keywordSearch,
    name: RESOURCES_NAME.keywordSearch,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whServiceGroup,
    name: RESOURCES_NAME.whServiceGroup,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whService,
    name: RESOURCES_NAME.whService,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whTimeRegulation,
    name: RESOURCES_NAME.whTimeRegulation,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whCredential,
    name: RESOURCES_NAME.whCredential,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whPosition,
    name: RESOURCES_NAME.whPosition,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whExperience,
    name: RESOURCES_NAME.whExperience,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whProfessionalStaff,
    name: RESOURCES_NAME.whProfessionalStaff,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whJobStandard,
    name: RESOURCES_NAME.whJobStandard,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whCustomerEvaluation,
    name: RESOURCES_NAME.whCustomerEvaluation,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whServiceBookingInstructionsSetup,
    name: RESOURCES_NAME.whServiceBookingInstructionsSetup,
  },
  {
    key: WORLD_HEALTH_RESOURCES.productDelivery,
    name: RESOURCES_NAME.productDelivery,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whErrorOfPharmacy,
    name: RESOURCES_NAME.whErrorOfPharmacy,
  },
  {
    key: CORE_RESOURCES.potentialCustomer,
    name: RESOURCES_NAME.potentialCustomer,
  },
  {
    key: CORE_RESOURCES.referral,
    name: RESOURCES_NAME.referral,
  },
  {
    key: WORLD_HEALTH_RESOURCES.whHistoryLogVoucher,
    name: RESOURCES_NAME.whHistoryLogVoucher,
  },
  {
    key: WORLD_HEALTH_RESOURCES.todoConfigStatus,
    name: RESOURCES_NAME.todoConfigStatus,
  },
  {
    key: WORLD_HEALTH_RESOURCES.history,
    name: RESOURCES_NAME.history,
  },
  
  // {
  //   key: WORLD_HEALTH_RESOURCES.whService,
  // {
  //   key: WORLD_HEALTH_RESOURCES.whCategory,
  //   name: 'Quản lý loại dịch vụ world health',
  // },
  // {
  //   key: WORLD_HEALTH_RESOURCES.whSessionOfDay,
  //   name: 'Quản lý quy định thời gian world health',
  // }, 
]
export const RULE_ACTIONS = {
  admin: 'admin',
  user: 'user'
}

export const ACTIONS_GROUP = [
  {
    key: CORE_ACTIONS.read,
    name: PERMISSION_CORE_ACTIONS.admin,
  },
];
export const TOKEN_EXPIRES_IN_SECONDS = 8640000;

export const MEDICAL_SERVICE = {
  'DOCTOR_AT_HOME': 'DOCTOR_AT_HOME',
  'CLINIC_APPOINTMENT': 'CLINIC_APPOINTMENT',
  'MEDICAL_TEST': 'MEDICAL_TEST'
}


export const ENTITY_TYPE = {
  'PHARMACY': 'PHARMACY',
  'CLINIC': 'CLINIC',
  'HOSPITAL': 'HOSPITAL',
  'LAB': 'LAB'
}

export const DEFAULT_LANGUAGE = 'vi';

export const STATUS_TYPE = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
}

export const enum TIME_UNIT {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
}
export const rateType = [
  'CERTIFICATE', 'POSITION', 'EXPERIENCE', 'DEGREE'
]

export const ROOT_COMPANY_ID = +process.env.ROOT_COMPANY_ID || 99999;
export const WH_PARTNER_COMPANY_ID = +process.env.WH_PARTNER_COMPANY_ID || 66666;


//default message for log time course training
export const MESSAGE_LOG_COURSE_TRAINING ={
  PARTNER_CREATE_COURSE : ' vừa tạo khoá đào tạo ',
  PARTNER_UPDATE_COURSE : ' vừa cập nhật khoá đào tạo ',
  PARTNER_DELETE_COURSE : ' vừa xoá khoá đào tạo ',
  PARTNER_SUBMITTED_COURSE : ' vừa submitted khoá đào tạo ',
  ADMIN_APPROVED_COURSE : ' vừa duyệt khoá đào tạo ',
  ADMIN_DENIED_COURSE : ' vừa từ chối khoá đào tạo ',
} 

export const MESSAGE_LOG_TIPS = {
  TIPS_CREATE_REWARD : ' Đã thêm mức thưởng ',
  TIPS_CREATE_PUNISH : ' Đã thêm mức phạt',
  TIPS_UPDATE_REWARD : ' Đã cập nhật mức thưởng ',
  TIPS_UPDATE_PUNISH : ' Đã cập nhật mức phạt ',
  TIPS_DELETE_REWARD : ' Đã xoá mức thưởng ',
  TIPS_DELETE_PUNISH : ' Đã xoá mức phạt '
}
